// api.js
import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Your Django server's URL
  timeout: 5000,  // Timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need here
  },
});

export default backend;
