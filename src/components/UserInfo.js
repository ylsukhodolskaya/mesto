export default class UserInfo {
constructor(data, config) {
    this._data = data;
    this._config = config;
    this._username = document.querySelector(this._config.userNameSelector);
    this._about = document.querySelector(this._config.userAboutSelector);
    this._avatar = document.querySelector(this._config.userAvatarSelector);
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(userdata) {
    this._data = userdata;
    this._username.textContent = userdata.name;
    this._about.textContent = userdata.about;
  }

  setAvatar(userdata){
    this._data.avatar = userdata.avatar;
    this._avatar.src = userdata.avatar;
  }
}