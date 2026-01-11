import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendRegistrationOTP(email, otp) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account - Concept Foods',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #EDD2A1 0%, #272727 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Concept Foods</h1>
            <p style="color: white; margin: 5px 0;">Premium Catering Services</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #272727;">Welcome to Concept Foods!</h2>
            <p>Thank you for registering with us. Please use the following OTP to verify your account:</p>
            <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #272727; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div style="background: #272727; padding: 15px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">© 2023 Concept Foods. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetOTP(email, otp) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - Concept Foods',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #EDD2A1 0%, #272727 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Concept Foods</h1>
            <p style="color: white; margin: 5px 0;">Premium Catering Services</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #272727;">Password Reset Request</h2>
            <p>You requested to reset your password. Please use the following OTP:</p>
            <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #272727; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
          </div>
          <div style="background: #272727; padding: 15px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">© 2023 Concept Foods. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
