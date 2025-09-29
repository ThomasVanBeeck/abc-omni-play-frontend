export const environment = {
  production: true,
  onesignal: {
    appId: 'secret',
    restApiKey: 'secret',
    android_channel_id: ''
  },
  tenant_id: 'secret',
  client_id: 'secret',
  client_secret: 'secret',
  native_redirect_uri: 'https://localhost:4200/auth',
  web_redirect_uri: 'http://localhost:4200/home',
  api_scope: 'secret',
  omni_profile: {
    baseUrl: 'secret',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_fleet: {
    baseUrl: 'secret',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_intranet: {
    baseUrl: 'secret',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_play: {
    baseUrl: 'secret',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
};