const test = require('tape');
const cheerio = require('cheerio');
const fs = require('fs');
const htmlDocument = fs.readFileSync(`${__dirname}/fixtures/response.html`);
const config = {
  domain: 'http://somedomain.com'
};
const transformResponse = require('../src/responseTransformer')(
  config,
  cheerio
);

test('it returns a translation object from an html response', function(assert) {
  const translation = transformResponse(htmlDocument, 'dictionnaire');
  assert.deepEqual(translation, {
    word: 'dictionnaire',
    audio:
      'http://somedomain.com/mp3/FR/24/2419c7c48458b67d9ebc669f675a774e-106',
    pos: {
      m: ['dicionário']
    }
  });

  assert.end();
});
