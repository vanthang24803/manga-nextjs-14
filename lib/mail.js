import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email, token) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: 'Arial', sans-serif;">
    
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
            <h2>Password Reset</h2>
            <p>We received a request to reset your password. If you didn't make this request, you can ignore this email. No changes will be made to your account.</p>
            
            <p>
                To reset your password, click on the link below:
            </p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 3px;">Reset Password</a>
    
            <p>This link is valid for a limited time for security reasons. If you continue to have trouble, please contact our support.</p>
            
            <p>Thank you!</p>
        </div>
    
    </body>
    </html>
    `,
  });
};

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `  
      <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>Email Verification</title>
    </head>
    <body style="font-family: 'Inter', sans-serif">
      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        "
      >
        <h2>Email Verification</h2>
        <p>
          Welcome to Manga. To complete the registration process, please
          verify your email address by clicking on the link below:
        </p>

        <p>
          <a
          href="${confirmLink}"
            style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 3px;
            "
            >Verify Email</a
          >
        </p>

        <p>If you did not make this request, please ignore this email.</p>

        <p>Thank you!</p>
      </div>
    </body>
  </html>
    `,
  });
};
