export default class UserInfo {
constructor({ username, about, avatar }) {
    this._username = username;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }

    return userInfo;
  }

  setUserInfo(userdata) {
    this._username.textContent = userdata.name;
    this._about.textContent = userdata.about;
  }

  setAvatar(userdata){
    this._avatar.src = userdata.avatar;
  }
}