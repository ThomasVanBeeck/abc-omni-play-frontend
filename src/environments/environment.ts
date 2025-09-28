// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  onesignal: {
    appId: 'c91a61cd-14aa-4a38-98c9-f7ea20bb0d08',
    restApiKey: 'OTVmODc2MjAtOGFkMS00YjY3LTg2OTYtOGExOTA5MzUyYjM4',
    android_channel_id: ''
  },
  tenant_id: '972847c0-3e8e-430c-b42d-c8ca486e17d0',
  client_id: '971e9db1-6697-4146-8600-113aa7ff65b7',
  client_secret: 'uNW8Q~GkNV-wftoL-6FoQRjF5y4EZY2BCmntRaDn',
  native_redirect_uri: 'https://localhost:4200/auth',
  web_redirect_uri: 'http://localhost:4200/home',
  api_scope: 'api://971e9db1-6697-4146-8600-113aa7ff65b7/omni',
  omni_profile: {
    baseUrl: 'http://192.168.20.102:8080',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_fleet: {
    baseUrl: 'http://192.168.20.102:8081',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_intranet: {
    baseUrl: 'http://192.168.20.102:8082',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
  omni_play: {
    baseUrl: 'http://localhost:8083',
    apiVersion: '/v1',
    apiBasePath: '/api'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.