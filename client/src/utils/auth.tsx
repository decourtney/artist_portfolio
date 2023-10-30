import decode, { JwtPayload } from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return;

    return decode<JwtPayload>(token);
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    // Decode the token to get its expiration time that was set by the server
    const decoded: JwtPayload = decode(token);

    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    const exp = decoded.exp
    if (exp && exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken: string, username: string) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign(`/profile/${username}`);
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
