import axios from 'axios';

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'aabus@example.com', // wait, I don't know the email. I'll just query the DB for the token.
    });
  } catch (e) {
    console.error(e);
  }
}
test();
