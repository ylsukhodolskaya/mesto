export default class UserInfo {
constructor(data, config) {
    this._data = data;
    this._username = document.querySelector('.profile__name');
    this._about = document.querySelector('.profile__description');
    this._avatar = document.querySelector('.profile__avatar');
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