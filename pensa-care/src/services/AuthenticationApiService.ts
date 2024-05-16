import ApiService, { LOGGED_USER, TOKEN, TOKEN_EXPIRES } from './ApiService'
import StorageService from './StorageService'

export default class AuthenticationApiService extends ApiService {
  constructor() {
    super('/api/v1/auth/login')
    this.storageService = new StorageService()
  }

  async login(username: string, password: string) {
    this.logout();    

    try {
        const response = await this.post('', {
          username,
          password
      });
        
      if (response.status !== 200) {
        throw new Error('Falha na autenticação.');
      }
  
      const data = response.data;
      const token = data.access_token;
      
      // Store the access_token and expires_at in localStorage
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(TOKEN_EXPIRES, data.expires_at);
      localStorage.setItem(LOGGED_USER, username);

      this.registerToken(token)
    } catch (error) {
      return null
    }
  }

  logout() {
    this.storageService.removeItem(TOKEN)
    this.storageService.removeItem(TOKEN_EXPIRES)
    this.storageService.removeItem(LOGGED_USER)
    this.unregisterToken()
  }

  getToken(): string | null {
    return this.storageService.getItem(TOKEN)
  }

}
