import { SubmitFeedbackUseCase } from "./submit_feedback_use_case"

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => { } },
    { sendMail: async () => { } },
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.submit({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,bmx3IHJldHVybiBiYXNlNjQ=',
        })).resolves.not.toThrow()
    })

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.submit({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,bmx3IHJldHVybiBiYXNlNjQ=',
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.submit({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,bmx3IHJldHVybiBiYXNlNjQ=',
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback with wrong screenshot extension', async () => {
        await expect(submitFeedback.submit({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'image.jpg',
        })).rejects.toThrow()
    })
})