"use server";

import { generateVerificationToken } from "@/lib/tokens";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values) => {
  const { email, password } = values;

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }
};
