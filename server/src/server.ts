import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6833031d3c9335",
        pass: "4d3e73efaf91d9"
    }
});

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <hi@feedget.io>',
        to: 'Lisandro Guerra <lix@spartanix.com>',
        subject: 'New feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: orange">`,
            `<h1>Feedback-Feedget</h1>`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Cometário: ${comment}</p>`,
            `</div>`
        ].join('')
    })

    return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log('HTTP server running !')
})