module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://embeddable-sandbox.cdn.apollographql.com",
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://apollo-server-landing-page.cdn.apollographql.com",
          ],
          "connect-src": [
            "'self'",
            "https://embeddable-sandbox.cdn.apollographql.com",
          ],
          "manifest-src": [
            "'self'",
            "https://apollo-server-landing-page.cdn.apollographql.com",
          ],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];