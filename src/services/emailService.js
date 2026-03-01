import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transporter = null;
  }

  getTransporter() {
    if (!this.transporter) {
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
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000
      });
    }
    return this.transporter;
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
            <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await this.getTransporter().sendMail(mailOptions);
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
            <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await this.getTransporter().sendMail(mailOptions);
  }

  async sendOrderConfirmation(order) {
    console.log('Sending order confirmation for order type:', order.orderType);
    console.log('Order data:', JSON.stringify(order, null, 2));
    
    let itemsList = '';
    
    // Build items list based on order type
    if (order.items && order.items.length > 0) {
      // For curate boxes - show items with quantity in table format
      const rows = order.items.map(item => 
        `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity || 1}</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td></tr>`
      ).join('');
      itemsList = `<table style="width: 100%; margin-top: 15px;"><thead><tr><th style="text-align: left; padding: 8px; border-bottom: 2px solid #272727;">Item</th><th style="text-align: center; padding: 8px; border-bottom: 2px solid #272727;">Qty</th><th style="text-align: right; padding: 8px; border-bottom: 2px solid #272727;">Price</th></tr></thead><tbody>${rows}</tbody></table>`;
    } else if (order.cheeseBoard?.selections) {
      // For cheese boards - group by category
      console.log('Processing cheese board selections:', order.cheeseBoard.selections);
      const selections = order.cheeseBoard.selections;
      itemsList = Object.keys(selections).map(category => 
        `<div style="margin-bottom: 15px;"><h4 style="color: #272727; margin: 10px 0 5px 0; font-size: 14px; text-transform: capitalize;">${category}</h4><ul style="margin: 0; padding-left: 20px;">${selections[category].map(item => `<li style="padding: 3px 0;">${item}</li>`).join('')}</ul></div>`
      ).join('');
    } else if (order.grazingTable?.selections) {
      // For grazing tables - group by category
      console.log('Processing grazing table selections:', order.grazingTable.selections);
      const selections = order.grazingTable.selections;
      itemsList = Object.keys(selections).map(category => 
        `<div style="margin-bottom: 15px;"><h4 style="color: #272727; margin: 10px 0 5px 0; font-size: 14px; text-transform: capitalize;">${category.replace(/-/g, ' ')}</h4><ul style="margin: 0; padding-left: 20px;">${selections[category].map(item => `<li style="padding: 3px 0;">${item.name || item}</li>`).join('')}</ul></div>`
      ).join('');
    } else if (order.catering?.selections) {
      // For catering - group by category
      console.log('Processing catering selections:', order.catering.selections);
      const selections = order.catering.selections;
      itemsList = Object.keys(selections).map(category => 
        `<div style="margin-bottom: 15px;"><h4 style="color: #272727; margin: 10px 0 5px 0; font-size: 14px; text-transform: capitalize;">${category.replace(/-/g, ' ')}</h4><ul style="margin: 0; padding-left: 20px;">${selections[category].map(item => `<li style="padding: 3px 0;">${item.name || item}</li>`).join('')}</ul></div>`
      ).join('');
    }
    
    console.log('Generated itemsList HTML length:', itemsList.length);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.customerInfo.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #EDD2A1 0%, #272727 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Concept Foods</h1>
            <p style="color: white; margin: 5px 0;">Premium Catering Services</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #272727;">Order Confirmed!</h2>
            <p>Thank you for your order, ${order.customerInfo.name}!</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #272727; margin-top: 0;">Order Details</h3>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Order Type:</strong> ${order.orderType}</p>
              ${order.cheeseBoard?.boardName ? `<p><strong>Board:</strong> ${order.cheeseBoard.boardName}</p>` : ''}
              ${order.grazingTable?.tableName ? `<p><strong>Table:</strong> ${order.grazingTable.tableName}</p>` : ''}
              ${order.catering?.menuName ? `<p><strong>Menu:</strong> ${order.catering.menuName}</p>` : ''}
              ${order.orderDetails?.readyTime ? `<p><strong>Ready Time:</strong> ${new Date(order.orderDetails.readyTime).toLocaleString()}</p>` : ''}
              ${itemsList ? `<div style="margin-top: 15px;">${itemsList}</div>` : ''}
              <p style="margin-top: 20px; font-size: 18px;"><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
            </div>
            <p>We'll contact you shortly to confirm your order details.</p>
            <p>If you have any questions, feel free to reach out to us.</p>
          </div>
          <div style="background: #272727; padding: 15px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">© 2026 Concept Foods. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await this.getTransporter().sendMail(mailOptions);
  }
}

export default new EmailService();
