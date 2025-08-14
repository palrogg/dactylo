import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/layouts/app-layout";
import { Calendar, FileText } from "lucide-react";

export const TextList = ({ items }: { items: TextItem[] }) => {
    if (!items?.length) {
        return <div >Aucun texte trouvé.</div>;
    }

    return (
        <>
            <h4>Un peu de blabla et les textes devraient être cliquables, triables, etc.</h4>
            <div className="grid gap-4">
                {items.map((a, idx) => (
                    <article
                        key={idx}
                        className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 backdrop-blur p-5 shadow-sm"
                    >
                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            {a.title}
                        </h2>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            <div className="flex items-center gap-1">
                                {a.author}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={toISODate(a.display_date)}>{a.display_date}</time>
                            </div>
                            <span className="text-xs">({a.publication_year})</span>
                        </div>

                        {/* Description */}
                        <p className="mb-2 text-zinc-700 dark:text-zinc-300">{a.description}</p>

                        {/* Content */}
                        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                            {a.content}
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
};

function toISODate(human: string): string {
    const maybe = Date.parse(human);
    return isNaN(maybe) ? new Date().toISOString() : new Date(maybe).toISOString();
}