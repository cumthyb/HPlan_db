import nodemailer from 'nodemailer'
import { serverConf, mailOptions } from '../config/email.conf'

const transporter = nodemailer.createTransport(serverConf)

export default function sendEmail(subject, text) {
    let option = Object.assign({}, mailOptions, {
        subject: subject,
        html: `<p>${text}</p><br/>` + mailOptions.html
    })
    transporter.sendMail(option, function(error, info) {
        if (!error) {
            console.log('邮件发送成功，请注意查收！')
        } else {
            console.error('邮件发送失败', error)
        }
    })
}
