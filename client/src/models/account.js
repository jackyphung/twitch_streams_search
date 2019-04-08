export class Account {
  _id = null;
  username = "";
  role = "";
  authToken = null;
  
  constructor(_id, username = "guest", role = "user", authToken = null) {
      this._id = _id;
      this.username = username;
      this.role = role;
      this.authToken = authToken;
  }
}