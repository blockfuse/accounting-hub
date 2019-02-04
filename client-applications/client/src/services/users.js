import {HttpWrapper} from './http-wrapper';
import {User} from 'models/user';

export class UsersService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  login(username, password) {
    const payload = { username, password };

    return this.http.post('/users/authenticate', payload).then(user => {
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.setHeader(user.token);

      return new User(user);
    });
  }
  register(user) {
    return this.http.post('/users/register', user).then(result => {
      return new User({ user: result.result });
    });
  }
  logout() {
    localStorage.removeItem('user');

    window.location.reload(true);
  }
  getUsers() {
    return this.http.get('/users').then(result => {
      return result.map(user => {
        return new User(user);
      })
    });
  }
  getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }
  approve(user) {
    user.isApproved = true;
    return this.update(user);
  }
  update(user) {
    return this.http.put(`/users/${user.id}`, user).then(result => {
      return result;
    });
  }
  setHeader(token) {
    this.http.setHeader('Authorization', `Bearer ${token}`);
  }
}
