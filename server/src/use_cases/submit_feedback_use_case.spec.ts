import { SubmitFeedbackUseCase } from "./submit_feedback_use_case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.submit({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,bmx3IHJldHVybiBiYXNlNjQ=',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
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