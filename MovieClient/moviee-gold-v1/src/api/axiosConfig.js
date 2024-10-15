import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:9095/',
    headers: { "ngrok-skip-browser-warning": "true" }
});
