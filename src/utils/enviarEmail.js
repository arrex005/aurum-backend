async function enviarCodigoVerificacion(email, nombre, codigo) {
  const respuesta = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: process.env.NOMBRE_REMITENTE,
        email: process.env.EMAIL_REMITENTE,
      },
      to: [{ email: email, name: nombre }],
      subject: 'Verifica tu cuenta - Golden Heights Group',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #18181b; padding: 40px; color: #ffffff;">
          <h1 style="color: #f59e0b; text-align: center; letter-spacing: 3px; text-transform: uppercase;">Golden Heights Group</h1>
          <div style="width: 50px; height: 2px; background: #f59e0b; margin: 20px auto;"></div>
          <p style="color: #d4d4d8; font-size: 15px;">Hola ${nombre},</p>
          <p style="color: #d4d4d8; font-size: 15px;">Gracias por registrarte. Para completar tu registro, introduce este código en la web:</p>
          <div style="background: #000000; border: 1px solid #f59e0b; padding: 20px; text-align: center; margin: 30px 0;">
            <span style="color: #f59e0b; font-size: 36px; font-weight: bold; letter-spacing: 8px;">${codigo}</span>
          </div>
          <p style="color: #71717a; font-size: 13px;">Este código caduca en 15 minutos. Si no has solicitado este registro, ignora este correo.</p>
        </div>
      `,
    }),
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.message || 'Error al enviar email con Brevo')
  }

  return await respuesta.json()
}
async function enviarAvisoAprobacion(email, nombre) {
  const respuesta = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: process.env.NOMBRE_REMITENTE,
        email: process.env.EMAIL_REMITENTE,
      },
      to: [{ email: email, name: nombre }],
      subject: 'Tu cuenta ha sido aprobada - Golden Heights Group',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #18181b; padding: 40px; color: #ffffff;">
          <h1 style="color: #f59e0b; text-align: center; letter-spacing: 3px; text-transform: uppercase;">Golden Heights Group</h1>
          <div style="width: 50px; height: 2px; background: #f59e0b; margin: 20px auto;"></div>
          <p style="color: #d4d4d8; font-size: 15px;">Hola ${nombre},</p>
          <p style="color: #d4d4d8; font-size: 15px;">Buenas noticias: tu cuenta ha sido <strong style="color: #f59e0b;">aprobada</strong>. Ya puedes iniciar sesión y consultar los precios actualizados de todos nuestros productos.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://goldenheightsgroup.com/acceso" style="background: #f59e0b; color: #000000; padding: 14px 30px; text-decoration: none; font-weight: bold; display: inline-block;">Iniciar sesión</a>
          </div>
          <p style="color: #71717a; font-size: 13px;">Gracias por confiar en nosotros.</p>
        </div>
      `,
    }),
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.message || 'Error al enviar email de aprobación')
  }

  return await respuesta.json()
}
module.exports = { enviarCodigoVerificacion, enviarAvisoAprobacion  }