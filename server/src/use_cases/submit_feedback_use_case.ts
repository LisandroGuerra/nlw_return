import { FeedbacksRepository } from "../repositories/feedbacks_repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository
    ) {
        this.feedbacksRepository = feedbacksRepository
    }

    async submit(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
    }
}