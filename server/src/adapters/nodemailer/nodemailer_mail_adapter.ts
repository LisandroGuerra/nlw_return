import nodemailer from 'nodemailer'
import { MailAdapter, sendMailData } from "../mail_adapters"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6833031d3c9335",
        pass: "4d3e73efaf91d9"
    }
})

export class NodemailerMailAdaptor implements MailAdapter {
    async sendMail({ subject, body }: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <hi@feedget.io>',
            to: 'Lisandro Guerra <lix@spartanix.com>',
            subject: subject,
            html: body,
        })
    }
}