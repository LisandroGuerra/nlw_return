import { ArrowLeft, Camera } from "phosphor-react"
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
}

export function FeedbackContentStep(
    { feedbackType, onFeedbackRestartRequested }: FeedbackContentStepProps) {

    const feedbackTypeInfo = feedbackTypes[feedbackType]

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

            <form className="my-4 w-full">
                <textarea
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

                    <button
                        type="button"
                        className="p-2 bg-zinc-800 rounded-md border-transparent
                        hover:bg-zinc-700 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500"
                    >
                        <Camera className="w-6 h-6" />
                    </button>

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent
                        flex-1 flex justify-center items-center 
                        text-sm hover:bg-brand-300 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500"
                    >
                        Enviar feedback
                    </button>

                </footer>
            </form>
        </>
    )
}