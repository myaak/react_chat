export default class UserErrors  extends Error {

  existedUser(): string {
    return "User with this email is already exists.";
  }

  wrongEmailOrPassword(): string {
    return "Wrong email or password.";
  }

  notExistedUser(): string {
    return "User with this email does not exist.";
  }
}
