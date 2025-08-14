import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Timer, Keyboard, CircleX, Percent } from "lucide-react";
import texts from './texts.json';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

// TODO: migration semi-auto à nettoyer!

type Result = {
    cpm: number;
    accuracy: number;
    charsTyped: number;
    errors: number;
    time: number;
    timestamp: number;
};

// --- Sample French words (common + accent coverage). You can replace with your own list.
const WORD_BANK = texts[0].sentences[0]
    .split(/\s+/)
    .filter(Boolean);

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function formatPct(n: number) {
    return `${(Math.round(n * 10) / 10).toFixed(1)}%`;
}

function format1(n: number) {
    return (Math.round(n * 10) / 10).toFixed(1);
}

// --- Main Component
export default function DactyloTrainer() {
    const { auth } = usePage<SharedData>().props;
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [words, setWords] = useState<string[]>(WORD_BANK);
    const [cursor, setCursor] = useState(0); // char index in joined text
    const [errors, setErrors] = useState<number>(0);
    const [typed, setTyped] = useState<string>("");
    const [history, setHistory] = useState<Result[]>([]);
    const [focus, setFocus] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const text = useMemo(() => words.join(" "), [words]);

    // Derive metrics
    const charsTyped = typed.length;
    const correctChars = (() => {
        let c = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === text[i]) c++;
        }
        return c;
    })();
    const acc = text.length > 0 ? (correctChars / Math.max(1, charsTyped)) * 100 : 0;
    const timeUsed = length - timeLeft;
    const cpm = timeUsed > 0 ? correctChars / (timeUsed / 60) : 0;

    // Timer
    useEffect(() => {
        if (!isRunning) return;
        if (timeLeft <= 0) {
            finish();
            return;
        }
        const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(id);
    }, [isRunning, timeLeft]);

    // Handle typing
    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!isRunning && timeLeft === 0) return; // finished
            if (e.key === "Tab") {
                e.preventDefault();
                return;
            }
            if (e.key === "Escape") {
                e.preventDefault();
                restart();
                return;
            }
            if (e.key.length === 1) {
                const nextChar = e.key;
                const expected = text[cursor] ?? "";
                const newTyped = typed + nextChar;
                setTyped(newTyped);
                setCursor(cursor + 1);
                if (nextChar !== expected) setErrors((n) => n + 1);
            } else if (e.key === "Backspace") {
                if (typed.length > 0 && timeLeft > 0) {
                    setTyped(typed.slice(0, -1));
                    setCursor(Math.max(0, cursor - 1));
                }
            } else if (e.key === "Enter") {
                // treat as space
                const expected = text[cursor] ?? "";
                const newTyped = typed + " ";
                setTyped(newTyped);
                setCursor(cursor + 1);
                if (" " !== expected) setErrors((n) => n + 1);
            }
        },
        [cursor, text, typed, isRunning, timeLeft]
    );

    const restart = useCallback(() => {
        setIsRunning(false);
        setWords(WORD_BANK);
        setCursor(0);
        setErrors(0);
        setTyped("");
        setFocus(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    }, []);

    const finish = useCallback(() => {
        setIsRunning(false);
        const result: Result = {
            cpm: cpm || 0,
            accuracy: clamp(acc, 0, 100),
            charsTyped,
            errors,
            time: length,
            timestamp: Date.now(),
        };
        setHistory((h) => [result, ...h].slice(0, 10));
    }, [cpm, acc, charsTyped, errors, length]);

    // Focus handler
    const grabFocus = useCallback(() => {
        setFocus(true);
        inputRef.current?.focus();
    }, []);

    // Derived rendering helpers
    const rendered = useMemo(() => {
        const items: React.ReactNode[] = [];
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const isTyped = i < typed.length;
            const isCurrent = i === typed.length;
            let cls = "";
            if (isTyped) {
                cls = typed[i] === ch ? "text-zinc-900 dark:text-zinc-100" : "text-rose-600 dark:text-rose-400";
            } else {
                cls = "text-zinc-400 dark:text-zinc-500";
            }
            items.push(
                <span key={i} className={`${cls} ${ch === " " ? "inline-block w-2" : ""}`}>
                    {ch === " " ? "\u00A0" : ch}
                    {isCurrent && isRunning && (
                        <motion.span
                            aria-hidden
                            className="inline-block w-[2px] h-5 align-middle bg-emerald-500 ml-[-2px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </span>
            );
        }
        return items;
    }, [text, typed, isRunning]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* Stats */}
                <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <StatCard icon={<CircleX className="w-4 h-4" />} label="Nombre d’erreurs" value={`0`} />
                    <StatCard icon={<Timer className="w-4 h-4" />} label="Vitesse" value={format1(cpm)} />
                    <StatCard icon={<Percent className="w-4 h-4" />} label="Précision" value={formatPct(acc)} />
                </section>

                {/* Texte à remplacer par version Angular migrée */}
                <main className="mt-6">
                    <div
                        className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 backdrop-blur p-5 min-h-[200px] shadow-sm"
                        onClick={grabFocus}
                    >
                        {!focus && (
                            <button
                                onClick={grabFocus}
                                className="absolute inset-0 m-auto h-12 w-40 rounded-full bg-emerald-600 text-white font-medium shadow flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" /> Commencer
                            </button>
                        )}
                        <p className="text-xl leading-8 font-mono break-words selection:bg-emerald-200/70 dark:selection:bg-emerald-800/70">
                            {rendered}
                        </p>
                        {/* Hidden input to capture keystrokes */}
                        <input
                            ref={inputRef}
                            value={""}
                            onChange={() => { }}
                            onKeyDown={onKeyDown}
                            className="absolute opacity-0 pointer-events-none"
                            aria-hidden
                        />
                    </div>
                    {/* TODO inserer le clavier migré depuis angular */}
                </main>

                <section className="mt-8">
                    {!auth.user && <p className="text-sm text-zinc-500 dark:text-zinc-400">Connectez-vous pour enregistrer votre progression et générer des textes personnalisés, adaptés aux enchaînements de lettres où vous perdez en précision ou en vitesse.</p>}
                </section>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {icon}
                <span>{label}</span>
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
        </div>
    );
}