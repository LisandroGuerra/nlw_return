import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from "./prisma"
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { SubmitFeedbackUseCase } from './use_cases/submit_feedback_use_case';

export const routes = express.Router()


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6833031d3c9335",
        pass: "4d3e73efaf91d9"
    }
});


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

    await submitFeedbackUseCase.submit({
        type,
        comment,
        screenshot,
    })

    // await transport.sendMail({
    //     from: 'Equipe Feedget <hi@feedget.io>',
    //     to: 'Lisandro Guerra <lix@spartanix.com>',
    //     subject: 'New feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: orange">`,
    //         `<h1>Feedback-Feedget</h1>`,
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Cometário: ${comment}</p>`,
    //         `</div>`
    //     ].join('')
    // })

    return res.status(201).send()
})