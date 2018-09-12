const container = require('@einenlum/jic');

container.register(
  [
    // external modules
    { id: 'iconv', path: 'iconv-lite' },
    { id: 'cheerio', path: 'cheerio' },
    { id: 'request', path: 'request' },
    { id: 'querystring', path: 'querystring' },

    // internal functions
    { id: 'config', path: './config' },
    { id: 'sanitizer', path: './utils/stringSanitizer' },
    {
      id: 'linguee',
      path: './src/linguee',
      dependencies: [
        'cheerio',
        'request',
        'iconv',
        'config',
        'urlBuilder',
        'responseTransformer'
      ]
    },
    {
      id: 'responseTransformer',
      path: './src/responseTransformer',
      dependencies: [
        'wordTransformer',
        'examplesTransformer',
        'config',
        'urlBuilder',
        'cheerio'
      ]
    },
    {
      id: 'urlBuilder',
      path: './src/urlBuilder',
      dependencies: ['config', 'querystring']
    },
    {
      id: 'wordTransformer',
      path: './src/responseTransformer/word',
      dependencies: [
        'urlBuilder',
        'sanitizer',
        'wordTranslationsTransformer',
        'wordLessCommonTranslationsTransformer'
      ]
    },
    {
      id: 'examplesTransformer',
      path: './src/responseTransformer/examples',
      dependencies: ['cheerio', 'urlBuilder', 'sanitizer']
    },
    {
      id: 'wordTranslationsTransformer',
      path: './src/responseTransformer/word/translations',
      dependencies: ['cheerio', 'urlBuilder', 'sanitizer']
    },
    {
      id: 'wordLessCommonTranslationsTransformer',
      path: './src/responseTransformer/word/lessCommonTranslations',
      dependencies: ['cheerio', 'sanitizer']
    }
  ],
  `${__dirname}/../`
);

module.exports = container;
