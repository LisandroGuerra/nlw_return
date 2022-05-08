import express from 'express'
import { NodemailerMailAdaptor } from './adapters/nodemailer/nodemailer_mail_adapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository'
import { SubmitFeedbackUseCase } from './use_cases/submit_feedback_use_case'

export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdaptor = new NodemailerMailAdaptor()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdaptor
    )

    await submitFeedbackUseCase.submit({
        type,
        comment,
        screenshot,
    })


    return res.status(201).send()
})