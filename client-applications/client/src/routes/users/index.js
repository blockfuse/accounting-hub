import {UsersService} from 'services/users';

export class Index {
  users = [];

  static inject = [UsersService];
  constructor(usersService) {
    this.usersService = usersService;
  }

  attached() {
    return this.usersService.getUsers().then(result => {
      this.users = result;
    });
  }
  approve(user) {
    return this.usersService.approve(user).then(result => {
      user.isApproved = true;
    });
  }
}
