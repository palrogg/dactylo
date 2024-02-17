type ErrorRecord = {
    character: string
    word: string
    indexInWord: number
    sentence: string
    indexInSentence: number
    speed: number
    latestErrorDistance: number | null
}