import decode from "jwt-decode";

interface myToken {
  exp: number;
  username: string;
  email: string;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return decode<myToken>(token);
    }
    return null;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = decode<myToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken: string, username?: string): void {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign(`/profile/${username}`);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
