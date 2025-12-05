const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ConfigService {
  private config: any = null;
  
  async getConfig() {
    if (!this.config) {
      const response = await fetch(`${API_BASE_URL}/api/config`);
      this.config = await response.json();
    }
    return this.config;
  }
}

export const configService = new ConfigService();