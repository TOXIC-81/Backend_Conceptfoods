import dotenv from 'dotenv';
import mongoose from 'mongoose';
import emailService from './src/services/emailService.js';
import OTP from './src/models/OTP.js';

dotenv.config();

async function testOTPSystem() {
  try {
    console.log('🔍 Testing OTP System...\n');

    // Test 1: MongoDB Connection
    console.log('1️⃣ Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    // Test 2: Generate OTP
    console.log('2️⃣ Testing OTP generation...');
    const testOTP = emailService.generateOTP();
    console.log(`✅ Generated OTP: ${testOTP}\n`);

    // Test 3: Save OTP to Database
    console.log('3️⃣ Testing OTP storage...');
    const testEmail = 'test@example.com';
    await OTP.deleteMany({ email: testEmail }); // Clean up
    await OTP.create({ email: testEmail, otp: testOTP, type: 'registration' });
    console.log('✅ OTP saved to database\n');

    // Test 4: Verify OTP from Database
    console.log('4️⃣ Testing OTP retrieval...');
    const otpRecord = await OTP.findOne({ email: testEmail, otp: testOTP });
    if (otpRecord) {
      console.log('✅ OTP retrieved successfully\n');
    } else {
      console.log('❌ Failed to retrieve OTP\n');
    }

    // Test 5: Email Configuration
    console.log('5️⃣ Testing email configuration...');
    console.log(`   Email User: ${process.env.EMAIL_USER}`);
    console.log(`   Email Pass: ${process.env.EMAIL_PASS ? '***configured***' : '❌ NOT SET'}\n`);

    // Test 6: Send Test Email (Optional - uncomment to test)
    // console.log('6️⃣ Sending test email...');
    // const testEmailAddress = 'your-email@example.com'; // Change this
    // await emailService.sendRegistrationOTP(testEmailAddress, testOTP);
    // console.log(`✅ Test email sent to ${testEmailAddress}\n`);

    // Cleanup
    await OTP.deleteMany({ email: testEmail });
    console.log('✅ All tests passed!\n');
    console.log('📝 Next steps:');
    console.log('   1. Update EMAIL_PASS in .env with Gmail App Password');
    console.log('   2. Uncomment Test 6 and add your email to test email sending');
    console.log('   3. Start the server: npm start');
    console.log('   4. Test registration at frontend/register.html\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

testOTPSystem();
