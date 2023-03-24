declare module 'nodemailer' {
  import { TransportOptions } from 'nodemailer';
  // 这里放置其他类型声明
  export function createTransport(options: TransportOptions): any;
}