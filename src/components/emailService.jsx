import axios from 'axios';

export function sendEmail(emailData) {
  return axios.post('http://localhost:3001/send-email', emailData);
}
