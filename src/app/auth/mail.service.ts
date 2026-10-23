import * as nodemailer from 'nodemailer'

import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name)
  private transporter: nodemailer.Transporter | null = null

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST')
    const port = this.configService.get<string>('SMTP_PORT')
    const user = this.configService.get<string>('SMTP_USER')
    const pass = this.configService.get<string>('SMTP_PASS')

    if (host && port && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(port),
        secure: Number(port) === 465,
        auth: { user, pass }
      })
    }
  }

  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const from = this.configService.get<string>(
      'MAIL_FROM',
      'no-reply@ironhand.local'
    )
    const subject = 'Recuperación de contraseña - Iron Hand'
    const html = `<p>Has solicitado restablecer tu contraseña.</p>
<p><a href="${resetUrl}">Haz clic aquí para elegir una nueva contraseña</a></p>
<p>Si no has sido tú, ignora este correo. El enlace caduca en 1 hora.</p>`

    if (!this.transporter) {
      this.logger.warn(
        `SMTP no configurado. Enlace de recuperación para ${to}: ${resetUrl}`
      )
      return
    }

    await this.transporter.sendMail({ from, to, subject, html })
  }
}
