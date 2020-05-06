import axios from 'axios';
import authHeader from './auth-token';

const API_URL = 'http://localhost:3000/api/';

class RainbowService {
  getRainbows() {
    return axios.get(API_URL + 'rainbows', {
      headers: authHeader()
     })
     .then(response => {
       return response.data.rainbows;
    });
  }
}

export default new RainbowService();
