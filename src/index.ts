
import nodemailer, { Transporter, SentMessageInfo, TransportOptions } from 'nodemailer';

interface MailAuth {
  user: string;
  pass: string;
}
interface MySentMessageInfo extends SentMessageInfo {
  // 扩展 MailOptions 接口中的属性
  // 这样 MySentMessageInfo 就包含了 MailTransporter 中的所有必需属性
  // 例如：host: string;
  host: string;
  port: number;
  secure: boolean;
  auth: MailAuth;
}
interface MailTransporter extends Transporter<MySentMessageInfo> {
  host: string;
  port: number;
  secure: boolean;
  auth: MailAuth;
}

// 邮件传输选项
interface MyTransportOptions extends TransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: MailAuth;
}
interface MyTransportOptionsWithParam extends TransportOptions {
  host?: string;
  port?: number;
  secure?: boolean;
  auth: MailAuth;
}
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: { filename: string, content: string }[];
}
interface MailOptionsWithParam {
  from?: string;
  to?: string;
  subject?: string;
  text: string;
  html?: string;
  attachments?: { filename: string, content: string }[];
}

// // 创建邮件传输对象
// const transporter: Transporter<MySentMessageInfo> = nodemailer.createTransport({
//   host: 'smtp.163.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'freelover19notify@163.com',
//     pass: 'SOFBUFKLOWRHEREB',
//   },
// } as MyTransportOptions);

let transporter: Transporter<MySentMessageInfo>
// 邮件选项
const mailOptions: MailOptions = {
  from: 'freelover19notify@163.com',
  to: 'xd_ldx@163.com',
  subject: '邮件通知',
  text: 'Hello World!',
  html: '<p>Hello World!</p>',
  attachments: [
    { filename: 'file1.txt', content: 'Attachment 1' },
    { filename: 'file2.txt', content: 'Attachment 2' },
  ],
};
const defaultTransportOptions: MyTransportOptions = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: ''
  },
}
const createTransport = (param: MyTransportOptionsWithParam) => {
  // 创建邮件传输对象
  transporter = nodemailer.createTransport({ ...defaultTransportOptions as MyTransportOptions, ...param as MyTransportOptionsWithParam });
}

const sendMail = (options: MailOptionsWithParam) => {
  // 发送邮件
  options.html = options.html ? options.html : `<p>${options.text}</p>`
  transporter.sendMail({ ...mailOptions as MailOptions, ...options as MailOptionsWithParam }).then((info: MySentMessageInfo) => {
    console.log('Message sent: %s', info.messageId);
  }).catch((err: any) => {
    console.error(err);
  });
}

export {
  MailAuth,
  MailOptionsWithParam,
  MyTransportOptionsWithParam,
  createTransport,
  sendMail
}