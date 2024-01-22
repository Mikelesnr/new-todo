import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activationTemplate } from "./emailTemplates/activation";
import { resetPasswordTemplate } from "./emailTemplates/resetPass";
import { taskCreateTemplate } from "./emailTemplates/taskCreate";

export async function sendMail({
  to,
  subject,
  body,
  attachments,
}: {
  to: string;
  subject: string;
  body: string;
  attachments: [];
}) {
  const { SMPT_EMAIL, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;
  //
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Test Result Of Transport", testResult);
  } catch (e) {
    console.log(e);
  }
  try {
    const sendResult = await transport.sendMail({
      from: SMPT_EMAIL,
      to,
      subject,
      html: body,
      attachments: attachments,
    });
    console.log({ sendResult });
    return sendResult;
  } catch (e) {
    console.log(e);
  }
}

export function compileActivationTemplate(name: string, url: string) {
  const template = Handlebars.compile(activationTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}
export function compileResetPassTemplate(name: string, url: string) {
  const template = Handlebars.compile(resetPasswordTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}

export function compileTaskCreateTemplate(
  name: string,
  tittle: string,
  description: string
) {
  const template = Handlebars.compile(taskCreateTemplate);
  const htmlBody = template({
    name,
    tittle,
    description,
  });
  return htmlBody;
}
