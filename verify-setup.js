import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

console.log('🔍 OTP System Verification Checklist\n');
console.log('='.repeat(50));

let allGood = true;

// Check 1: Environment Variables
console.log('\n1️⃣ Environment Variables:');
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS', 'PORT'];
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✅ ${varName}: configured`);
  } else {
    console.log(`   ❌ ${varName}: MISSING`);
    allGood = false;
  }
});

// Check 2: Required Files
console.log('\n2️⃣ Backend Files:');
const backendFiles = [
  'src/models/OTP.js',
  'src/models/User.js',
  'src/services/emailService.js',
  'src/routes/auth.js',
  'src/index.js'
];

backendFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file}: NOT FOUND`);
    allGood = false;
  }
});

// Check 3: Frontend Files
console.log('\n3️⃣ Frontend Files:');
const frontendFiles = [
  '../frontend/register.html',
  '../frontend/js/auth-system.js',
  '../frontend/login.html'
];

frontendFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file}: NOT FOUND`);
    allGood = false;
  }
});

// Check 4: Dependencies
console.log('\n4️⃣ Dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['nodemailer', 'mongoose', 'express', 'bcryptjs', 'jsonwebtoken', 'dotenv'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`   ✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`   ❌ ${dep}: NOT INSTALLED`);
    allGood = false;
  }
});

// Check 5: Email Configuration
console.log('\n5️⃣ Email Configuration:');
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailUser.includes('@gmail.com')) {
  console.log(`   ✅ Email User: ${emailUser}`);
} else {
  console.log(`   ❌ Email User: Invalid or missing`);
  allGood = false;
}

if (emailPass && emailPass !== 'your_gmail_app_password_here') {
  console.log(`   ✅ Email Pass: Configured`);
  if (emailPass.length === 16 && !emailPass.includes(' ')) {
    console.log(`   ✅ Format: Valid App Password format`);
  } else {
    console.log(`   ⚠️  Warning: Password format may be incorrect`);
    console.log(`   💡 Gmail App Passwords are 16 characters without spaces`);
  }
} else {
  console.log(`   ❌ Email Pass: NOT CONFIGURED`);
  console.log(`   💡 Get App Password: https://myaccount.google.com/apppasswords`);
  allGood = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✅ All checks passed! System is ready.\n');
  console.log('📝 Next Steps:');
  console.log('   1. Run: npm start');
  console.log('   2. Open: frontend/register.html');
  console.log('   3. Test registration with OTP\n');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.\n');
  console.log('📖 See OTP_SETUP_GUIDE.md for detailed instructions\n');
}
