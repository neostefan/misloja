import axios from 'axios';

const instance = axios.create({
    //change this to the required ip
    baseURL: 'http://34.67.85.12:5000'
});

export default instance;