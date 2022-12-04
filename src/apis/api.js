import axios from 'axios';

export default axios.create({    
    baseURL: 'https://lifeline-serverback.herokuapp.com/'
    //baseURL: 'http://localhost:5000/'    
});
