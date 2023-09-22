import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'https://dev-97585389.okta.com/oauth2/default',
    clientId: '0oabd58b7kk1cTrd85d7',
    scope: 'openid profile email api',
    redirectUri: window.location.origin,
    sessionChecksEnabled: true,
    clearHashAfterLogin: false
}