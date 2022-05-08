import { FormEvent, useState } from "react"
import { ArrowLeft, Camera } from "phosphor-react"
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton"
import { api } from "../../../lib/api"
import { Loading } from "../../Loading"

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep(
    { feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState<string>('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        setIsSendingFeedback(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })

        onFeedbackSent()
    }

    return (
        <>
            <header>
                <button
                    onClick={onFeedbackRestartRequested}
                    type="button"
                    className="
                    top-5 left-5 absolute
                    text-zinc-400 hover:text-zinc-100"
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    onChange={event => setComment(event.target.value)}
                    className="
                        min-w-[304px] min-h-[112px] w-full text-sm
                        placeholder-zinc-400 text-zinc-100
                        border-zinc-600 bg-transparent rounded-md
                        focus:border-brand-500 focus:ring-brand-500 
                        focus:ring-1 focus:outline-none resize-none 
                        scrollbar scrollbar-thin scrollbar-thumb-zinc-700
                        scrollbar-track-transparent"
                    placeholder="Conte detalhadamente o que acontece."
                />

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment.length < 5 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent
                        flex-1 flex justify-center items-center 
                        text-sm hover:bg-brand-300 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500
                        disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>

                </footer>
            </form>
        </>
    )
}