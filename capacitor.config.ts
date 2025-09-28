import type {CapacitorConfig} from '@capacitor/cli';

// @ts-ignore
const config: CapacitorConfig = {
  appId: 'io.ionic.omni',
  appName: 'ABC Omni',
  webDir: 'www',
  allowMixedContent: true,
  server: {
    androidScheme: 'https',
  },
  LiveUpdates: {
    appId: '268550e4',
    channel: 'Production',
    autoUpdateMethod: 'background',
    maxVersions: 2
  },
  ios: {
    handleApplicationNotifications: false,
  }
};

export default config;
