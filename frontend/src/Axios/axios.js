import axios from 'axios'

const axoisInstance = axios.create({
    // baseURL:'http://ec2-65-2-5-95.ap-south-1.compute.amazonaws.com:9000/api'
    baseURL:'http://localhost:8080/api'
});

export default axoisInstance;