export default class UserInfo {
  constructor({ username, description }) {
    this._username = username;
    this._description = description;
  }

  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      description: this._description.textContent
    }

    return userInfo;
  }

  setUserInfo(userdata) {
    this._username.textContent = userdata.name;
    this._description.textContent = userdata.description;
  }
}