import { MailAdapter } from "../adapters/mail_adapters"
import { FeedbacksRepository } from "../repositories/feedbacks_repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async submit(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error("Type is required.");

        }

        if (!comment) {
            throw new Error("Comment is required.");

        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format.")
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: orange">`,
                `<h1>Feedback-Feedget</h1>`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Cometário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" style="max-width: 800px" />` : 'Não enviou captura de tela',
                `</div>`
            ].join('')
        })
    }
}