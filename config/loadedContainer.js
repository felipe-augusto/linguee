const container = require('../utils/container');

container.register(
  [
    // external modules
    { id: 'iconv', path: 'iconv-lite' },
    { id: 'cheerio', path: 'cheerio' },
    { id: 'request', path: 'request' },
    { id: 'querystring', path: 'querystring' },

    // internal functions
    { id: 'config', path: './config' },
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
        'wordTranslationsTransformer',
        'wordLessCommonTranslationsTransformer'
      ]
    },
    {
      id: 'examplesTransformer',
      path: './src/responseTransformer/examples',
      dependencies: ['cheerio', 'urlBuilder']
    },
    {
      id: 'wordTranslationsTransformer',
      path: './src/responseTransformer/word/translations',
      dependencies: ['cheerio', 'urlBuilder']
    },
    {
      id: 'wordLessCommonTranslationsTransformer',
      path: './src/responseTransformer/word/lessCommonTranslations',
      dependencies: ['cheerio']
    }
  ],
  `${__dirname}/../`
);

module.exports = container;
