export const environment = {
    production: false,

    supportedLanguages: [ 'en', 'fr', 'tr' ],
    identityHost: 'http://localhost/identity',

    resetUrl: '/registration/reset',
    forgotUrl: '/registration/forgot',
    registerUrl: '/registration/register',

    tokenUrl: '/connect/token',
    revokeUrl: '/connect/revocation',

    client_id: 'ro.client',
    client_secret: 'secret',

    grant_type: 'password',
    refresh_type: 'refresh_token',
    scope: 'openid email user offline_access'

};
