import decode from "jwt-decode";

class AuthService {
  getProfile(): any {
    const token = this.getToken();
    if(token){
      return decode(token)
    }
    return null;
    // return decode(this.getToken());
  }

  loggedIn(): boolean {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string): boolean {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token) as { exp: number } | null;

    // Check if `decoded` is not null and has an 'exp' property
    if (decoded && typeof decoded.exp === "number") {
      // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      }
    }

    // If token hasn't passed its expiration time or `decoded` is `null`, return `false`
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem("id_token");
  }

  login(idToken: string): void {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout(): void {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
