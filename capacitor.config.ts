
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.3fc9eaf9a27e4af4b5f1e9de84d29e12',
  appName: 'CasaGil Calculator',
  webDir: 'dist',
  server: {
    url: 'https://3fc9eaf9-a27e-4af4-b5f1-e9de84d29e12.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
