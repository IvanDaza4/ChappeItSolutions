import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type Payload = {
    name: string
    email: string
    message: string
    company?: string // honeypot
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(str: string) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")
}

function formatDateAR(date = new Date()) {
    // America/Argentina/Buenos_Aires
    return new Intl.DateTimeFormat("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        dateStyle: "full",
        timeStyle: "short",
    }).format(date)
}

function prettyTextMail(params: {
    name: string
    email: string
    message: string
    receivedAt: string
    ip?: string | null
    userAgent?: string | null
}) {
    const { name, email, message, receivedAt, ip, userAgent } = params
    return [
        "NUEVA CONSULTA DESDE LA WEB",
        "--------------------------",
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Recibido: ${receivedAt}`,
        ip ? `IP: ${ip}` : null,
        userAgent ? `User-Agent: ${userAgent}` : null,
        "",
        "Mensaje:",
        message,
        "",
    ]
        .filter(Boolean)
        .join("\n")
}

function prettyHtmlMail(params: {
    brand: string
    name: string
    email: string
    message: string
    receivedAt: string
    ip?: string | null
    userAgent?: string | null
    siteName?: string
}) {
    const { brand, name, email, message, receivedAt, ip, userAgent, siteName } = params

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)
    const safeReceivedAt = escapeHtml(receivedAt)

    return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>Nueva consulta</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Nueva consulta desde ${siteName || "tu sitio"} — ${safeName}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f4f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="padding:18px 22px;background:linear-gradient(90deg,#0f172a,#111827);color:#ffffff;">
                <div style="font-family:Arial,Helvetica,sans-serif;">
                  <div style="font-size:13px;opacity:.9;letter-spacing:.3px;">${escapeHtml(brand)}</div>
                  <div style="font-size:20px;font-weight:700;line-height:1.25;margin-top:6px;">
                    Nueva consulta desde la web
                  </div>
                  <div style="font-size:12px;opacity:.85;margin-top:6px;">
                    Recibido: ${safeReceivedAt}
                  </div>
                </div>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:22px;">
                <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
                  
                  <!-- Meta card -->
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e7eb;border-radius:12px;">
                    <tr>
                      <td style="padding:14px 14px 10px;">
                        <div style="font-size:12px;color:#6b7280;letter-spacing:.2px;text-transform:uppercase;">
                          Datos del contacto
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 14px 14px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                          <tr>
                            <td style="padding:8px 0;border-top:1px solid #e5e7eb;font-size:14px;width:140px;color:#374151;">
                              Nombre
                            </td>
                            <td style="padding:8px 0;border-top:1px solid #e5e7eb;font-size:14px;font-weight:600;">
                              ${safeName}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;border-top:1px solid #e5e7eb;font-size:14px;width:140px;color:#374151;">
                              Email
                            </td>
                            <td style="padding:8px 0;border-top:1px solid #e5e7eb;font-size:14px;">
                              <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;font-weight:600;">
                                ${safeEmail}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Message -->
                  <div style="margin-top:16px;">
                    <div style="font-size:12px;color:#6b7280;letter-spacing:.2px;text-transform:uppercase;margin:0 0 8px;">
                      Mensaje
                    </div>
                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:14px;">
                      <div style="white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.55;color:#111827;">${safeMessage}</div>
                    </div>
                  </div>

                  <!-- Quick actions -->
                  <div style="margin-top:18px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent("Re: Consulta desde la web")}"
                       style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:10px 14px;border-radius:10px;">
                      Responder
                    </a>
                    <span style="display:inline-block;width:10px;"></span>
                    <a href="mailto:${safeEmail}"
                       style="display:inline-block;background:#ffffff;color:#111827;text-decoration:none;font-weight:700;font-size:13px;padding:10px 14px;border-radius:10px;border:1px solid #e5e7eb;">
                      Abrir email
                    </a>
                  </div>

                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:14px 22px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;line-height:1.45;">
                  ${siteName ? `Origen: ${escapeHtml(siteName)}<br/>` : ""}
                  ${ip ? `IP: ${escapeHtml(ip)}<br/>` : ""}
                  ${userAgent ? `User-Agent: ${escapeHtml(userAgent)}<br/>` : ""}
                  <span style="color:#9ca3af;">Este mensaje fue generado automáticamente desde el formulario web.</span>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Payload

        const name = (body.name || "").trim()
        const email = (body.email || "").trim()
        const message = (body.message || "").trim()
        const company = (body.company || "").trim()

        // Honeypot anti-bots
        if (company) return NextResponse.json({ ok: true })

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Faltan campos requeridos." }, { status: 400 })
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 })
        }

        const host = process.env.SMTP_HOST
        const user = process.env.SMTP_USER
        const pass = process.env.SMTP_PASS
        const port = Number(process.env.SMTP_PORT || "465")
        const secure = (process.env.SMTP_SECURE || "true") === "true"

        if (!host || !user || !pass) {
            console.log("ENV CHECK", {
                SMTP_HOST: process.env.SMTP_HOST,
                SMTP_USER: process.env.SMTP_USER,
                HAS_PASS: !!process.env.SMTP_PASS,
            })
            return NextResponse.json({ ok: false, error: "SMTP no configurado (.env.local)." }, { status: 500 })
        }

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        })

        const to = process.env.MAIL_TO || user
        const fromName = process.env.MAIL_FROM_NAME || "Chappe IT Solutions"
        const siteName = process.env.SITE_NAME || "Chappe IT Solutions (Web)"

        const receivedAt = formatDateAR(new Date())
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")?.[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            null
        const userAgent = req.headers.get("user-agent")

        const subject = `📩 Nueva consulta — ${name} (${email})`

        await transporter.sendMail({
            from: `${fromName} <${user}>`,
            to,
            replyTo: email,
            subject,
            text: prettyTextMail({ name, email, message, receivedAt, ip, userAgent }),
            html: prettyHtmlMail({
                brand: fromName,
                name,
                email,
                message,
                receivedAt,
                ip,
                userAgent,
                siteName,
            }),
        })

        return NextResponse.json({ ok: true })
    } catch (err: any) {
        console.error("Contact API error:", err)
        return NextResponse.json(
            { ok: false, error: err?.message || String(err) || "Unknown error" },
            { status: 500 }
        )
    }
}
