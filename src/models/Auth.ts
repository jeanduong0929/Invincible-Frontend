class Auth {
  id: string;
  username: string;
  email: string;
  role: string;
  token: string;

  constructor(
    id: string,
    username: string,
    email: string,
    role: string,
    token: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}

export default Auth;
