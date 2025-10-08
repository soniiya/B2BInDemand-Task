import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', 
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response: any) => response, 
    (error: any) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                if (data.code === 'TOKEN_EXPIRED') {
                    alert(data.message); 
                    window.location.href = '/login'; 
                } else {
                    alert(data.message);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 