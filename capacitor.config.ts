import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'HotExchange',
  webDir: 'www',
  plugins: {
    Geolocation: {
      androidAccuracy: 'high',
    },
  },
};

export default config;
