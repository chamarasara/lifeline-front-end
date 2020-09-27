import axios from 'axios';

export default axios.create({
    baseURL: 'https://lifeguardmfg-api.herokuapp.com/'
});