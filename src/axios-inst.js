import axios from 'axios';

const instance = axios.create({
    //change this to the required ip
    baseURL: 'http://localhost:5000'
});

export default instance;