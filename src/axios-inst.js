import axios from 'axios';

const instance = axios.create({
    //change this to the required ip
    baseURL: 'http://0.0.0.0:5000'
});

export default instance;