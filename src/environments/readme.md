# Environment Configuration Explanation

The `environment` object contains configuration settings used by the application. Below is an explanation of each key:

1. **production**:

   - Description: A boolean flag indicating whether the application is running in production mode (`true`) or development mode (`false`).
   - Usage: Enables additional logging and debugging features in development mode.
2. **onesignal**:

   - Description: Configuration settings for the OneSignal push notification service, including the app ID and api key.
   - Usage: Used to send push notifications to users of the application.
3. **tenant_id**:

   - Description: The unique identifier (UUID) of the Azure Active Directory (AAD) tenant associated with the application.
   - Usage: Used for authentication and authorization purposes when interacting with Azure services.
3. **client_id**:

   - Description: The client identifier (UUID) assigned to the application when registered in Azure Active Directory.
   - Usage: Used as part of the OAuth 2.0 authorization flow for authentication and obtaining access tokens.
4. **client_secret**:

   - Description: The client secret associated with the application, used for authentication and obtaining access tokens via the OAuth 2.0 client credentials grant flow.
   - Usage: Should be kept confidential and not exposed publicly.
5. **native_redirect_uri**:

   - Description: The redirect URI configured for native platforms (such as mobile applications) to handle authentication callbacks.
   - Usage: Redirects the user back to the application after authentication.
6. **web_redirect_uri**:

   - Description: The redirect URI configured for web platforms (such as web applications) to handle authentication callbacks.
   - Usage: Similar to `native_redirect_uri`, redirects the user back to the application after authentication.
7. **api_scope**:

   - Description: The scope or resource identifier representing the API that the application intends to access.
   - Usage: Used in OAuth 2.0 authentication to specify the scope of access requested by the application.
8. **omni_profile**:

   - Description: Configuration settings for accessing the Omni Profile API, including the base URL, API version, and base path.
   - Usage: Specifies the endpoint and version of the Omni Profile API.
9. **omni_fleet**:

   - Description: Configuration settings for accessing the Omni Fleet API, including the base URL, API version, and base path.
   - Usage: Specifies the endpoint and version of the Omni Fleet API.
