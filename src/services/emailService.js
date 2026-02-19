import nodemailer from "nodemailer";
import https from "https";

class EmailService {
  constructor() {
    this.transporter = null;
    this.useResend = false;
  }

  init() {
    if (this.transporter) return; // Already initialized
    
    this.useResend = process.env.RESEND_API_KEY ? true : false;
    
    console.log('Email config:', {
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_PASS?.length,
      useResend: this.useResend
    });
    
    if (!this.useResend) {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendWithResend(to, subject, html) {
    const data = JSON.stringify({
      from: 'Concept Foods <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html
    });

    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Resend API error: ${body}`));
          }
        });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  async sendRegistrationOTP(email, otp) {
    this.init(); // Initialize on first use
    
    const html = `
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
          <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
        </div>
      </div>
    `;

    if (this.useResend) {
      return await this.sendWithResend(email, 'Verify Your Account - Concept Foods', html);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account - Concept Foods',
      html: html
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetOTP(email, otp) {
    this.init();
    
    const html = `
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
          <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
        </div>
      </div>
    `;

    if (this.useResend) {
      return await this.sendWithResend(email, 'Password Reset - Concept Foods', html);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - Concept Foods',
      html: html
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendOrderConfirmation(email, orderData) {
    this.init();
    
    const itemsList = orderData.items?.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      </tr>`
    ).join('') || '';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #EDD2A1 0%, #272727 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Concept Foods</h1>
          <p style="color: white; margin: 5px 0;">Premium Catering Services</p>
        </div>
        <div style="padding: 30px; background: #f9f9fa;">
          <h2 style="color: #272727;">Order Confirmation</h2>
          <p>Thank you for your order! We've received your request and will process it shortly.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #272727; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Order Type:</strong> ${orderData.orderType?.replace('-', ' ').toUpperCase()}</p>
            ${orderData.eventDate ? `<p><strong>Event Date:</strong> ${new Date(orderData.eventDate).toLocaleDateString()}</p>` : ''}
            ${orderData.guestCount ? `<p><strong>Guest Count:</strong> ${orderData.guestCount}</p>` : ''}
          </div>
          
          ${itemsList ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #272727; margin-top: 0;">Items Ordered</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
          </div>` : ''}
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #272727; margin-top: 0;">Total Amount</h3>
            <p style="font-size: 24px; color: #272727; font-weight: bold; margin: 0;">₹${orderData.totalPrice}</p>
          </div>
          
          ${orderData.notes ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #272727; margin-top: 0;">Special Instructions</h3>
            <p>${orderData.notes}</p>
          </div>` : ''}
          
          <p style="margin-top: 20px;">We'll contact you shortly to confirm the details. If you have any questions, feel free to reach out to us.</p>
          <p><strong>Contact:</strong> +91-9884100405</p>
        </div>
        <div style="background: #272727; padding: 15px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
        </div>
      </div>
    `;

    if (this.useResend) {
      return await this.sendWithResend(email, `Order Confirmation - ${orderData.orderNumber}`, html);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: html
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
