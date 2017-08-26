// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

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
