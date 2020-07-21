import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://40.123.224.135:5000'
});

export default instance;