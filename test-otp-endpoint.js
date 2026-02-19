import fetch from 'node-fetch';

const testOTP = async () => {
  try {
    console.log('Testing OTP endpoint...');
    const response = await fetch('http://localhost:5000/api/auth/send-registration-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testOTP();
