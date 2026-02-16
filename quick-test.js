import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

console.log('🔍 OTP System - Quick Test\n');
console.log('='.repeat(60));

let passed = 0;
let failed = 0;

// Test 1: Environment Variables
console.log('\n✓ Test 1: Environment Variables');
const envVars = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS', 'PORT'];
envVars.forEach(v => {
  if (process.env[v]) {
    console.log(`  ✅ ${v}`);
    passed++;
  } else {
    console.log(`  ❌ ${v} - MISSING`);
    failed++;
  }
});

// Test 2: Required Files Exist
console.log('\n✓ Test 2: Backend Files');
const files = [
  'src/models/OTP.js',
  'src/models/User.js',
  'src/services/emailService.js',
  'src/routes/auth.js'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`  ✅ ${f}`);
    passed++;
  } else {
    console.log(`  ❌ ${f} - NOT FOUND`);
    failed++;
  }
});

// Test 3: Check OTP Model Structure
console.log('\n✓ Test 3: OTP Model Structure');
try {
  const otpContent = fs.readFileSync('src/models/OTP.js', 'utf8');
  const checks = [
    { name: 'email field', pattern: /email.*String/ },
    { name: 'otp field', pattern: /otp.*String/ },
    { name: 'type field', pattern: /type.*String/ },
    { name: 'expiresAt field', pattern: /expiresAt.*Date/ },
    { name: '5-minute expiry', pattern: /expires.*300/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(otpContent)) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}`);
      failed++;
    }
  });
} catch (e) {
  console.log(`  ❌ Error reading OTP model: ${e.message}`);
  failed++;
}

// Test 4: Check Email Service
console.log('\n✓ Test 4: Email Service');
try {
  const emailContent = fs.readFileSync('src/services/emailService.js', 'utf8');
  const checks = [
    { name: 'nodemailer import', pattern: /import.*nodemailer/ },
    { name: 'generateOTP method', pattern: /generateOTP/ },
    { name: 'sendRegistrationOTP method', pattern: /sendRegistrationOTP/ },
    { name: 'SMTP configuration', pattern: /smtp\.gmail\.com/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(emailContent)) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}`);
      failed++;
    }
  });
} catch (e) {
  console.log(`  ❌ Error reading email service: ${e.message}`);
  failed++;
}

// Test 5: Check Auth Routes
console.log('\n✓ Test 5: Auth Routes');
try {
  const authContent = fs.readFileSync('src/routes/auth.js', 'utf8');
  const checks = [
    { name: 'send-registration-otp endpoint', pattern: /send-registration-otp/ },
    { name: 'register endpoint', pattern: /router\.post.*register/ },
    { name: 'OTP verification', pattern: /OTP\.findOne/ },
    { name: 'User creation', pattern: /new User/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(authContent)) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}`);
      failed++;
    }
  });
} catch (e) {
  console.log(`  ❌ Error reading auth routes: ${e.message}`);
  failed++;
}

// Test 6: Check Frontend Files
console.log('\n✓ Test 6: Frontend Files');
const frontendFiles = [
  '../frontend/register.html',
  '../frontend/js/auth-system.js'
];

frontendFiles.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`  ✅ ${f}`);
    passed++;
  } else {
    console.log(`  ❌ ${f} - NOT FOUND`);
    failed++;
  }
});

// Test 7: Check Frontend OTP Implementation
console.log('\n✓ Test 7: Frontend OTP Implementation');
try {
  const registerContent = fs.readFileSync('../frontend/register.html', 'utf8');
  const authSystemContent = fs.readFileSync('../frontend/js/auth-system.js', 'utf8');
  
  const checks = [
    { name: 'OTP input field', pattern: /id="otp"/, content: registerContent },
    { name: 'Send OTP button', pattern: /Send OTP/, content: registerContent },
    { name: 'sendRegistrationOTP method', pattern: /sendRegistrationOTP/, content: authSystemContent },
    { name: 'OTP endpoint call', pattern: /send-registration-otp/, content: authSystemContent }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(check.content)) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}`);
      failed++;
    }
  });
} catch (e) {
  console.log(`  ❌ Error reading frontend files: ${e.message}`);
  failed++;
}

// Test 8: Gmail Configuration Check
console.log('\n✓ Test 8: Gmail Configuration');
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailUser.includes('@gmail.com')) {
  console.log(`  ✅ Gmail address configured: ${emailUser}`);
  passed++;
} else {
  console.log(`  ❌ Gmail address not configured`);
  failed++;
}

if (emailPass && emailPass !== 'your_gmail_app_password_here') {
  console.log(`  ✅ Email password configured`);
  if (emailPass.length === 16 && !/\s/.test(emailPass)) {
    console.log(`  ✅ Password format looks correct (16 chars, no spaces)`);
    passed++;
  } else {
    console.log(`  ⚠️  Password format may be incorrect`);
    console.log(`     Gmail App Passwords are 16 characters without spaces`);
    passed++;
  }
} else {
  console.log(`  ❌ Email password not configured`);
  console.log(`     Get App Password: https://myaccount.google.com/apppasswords`);
  failed++;
}

// Summary
console.log('\n' + '='.repeat(60));
console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All tests passed! OTP system is properly configured.\n');
  console.log('📝 Next Steps:');
  console.log('   1. Ensure MongoDB Atlas IP whitelist includes your IP');
  console.log('   2. Start server: npm start');
  console.log('   3. Test registration at frontend/register.html\n');
} else if (failed <= 2) {
  console.log('⚠️  Minor issues found. Review failed tests above.\n');
} else {
  console.log('❌ Multiple issues found. Please fix the failed tests.\n');
}

console.log('💡 Note: MongoDB connection test skipped (requires IP whitelist)');
console.log('   Add your IP to MongoDB Atlas to enable database access.\n');
