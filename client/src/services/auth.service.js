import axios from 'axios';

const API_URL = 'https://vue-nest.herokuapp.com/api/';

class AuthService {
  makeRequest(path, user) {
    return axios
      .post(API_URL + path, {
        login: user.login,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  login(user) {
    return this.makeRequest('login', user);
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return this.makeRequest('register', user);
  }
}

export default new AuthService();
