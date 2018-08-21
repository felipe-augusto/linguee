const test = require('tape');
const cheerio = require('cheerio');
const fs = require('fs');
const sanitizer = require('../utils/stringSanitizer')();
const config = {};
const urlBuilder = {
  buildAudioUrl: function(path) {
    return `http://somedomain.com/mp3/${path}`;
  }
};
const translationsTransformer = require('../src/responseTransformer/word/translations')(
  cheerio,
  urlBuilder,
  sanitizer
);
const lessCommonTranslationsTransformer = require('../src/responseTransformer/word/lessCommonTranslations')(
  cheerio,
  sanitizer
);
const wordTransformer = require('../src/responseTransformer/word')(
  urlBuilder,
  sanitizer,
  translationsTransformer,
  lessCommonTranslationsTransformer
);
const examplesTransformer = require('../src/responseTransformer/examples')(
  cheerio,
  urlBuilder,
  sanitizer
);

const responseTransformer = require('../src/responseTransformer')(
  wordTransformer,
  examplesTransformer,
  config,
  urlBuilder,
  cheerio
);

test('it returns a translation object from an html response', function(assert) {
  const examples = [
    {
      query: 'buy',
      dir: 'buy-eng-rus'
    },
    {
      query: 'dictionnaire',
      dir: 'dictionnaire-fra-por'
    },
    {
      query: '历',
      dir: 'history-chi-eng'
    },
    {
      query: 'verstehe',
      dir: 'verstehe-ger-fra'
    }
  ];

  const getInputPath = function(dir) {
    return `${__dirname}/examples/${dir}/input.html`;
  };
  const getExpectedPath = function(dir) {
    return `${__dirname}/examples/${dir}/expected.js`;
  };
  for (let example of examples) {
    const input = fs.readFileSync(getInputPath(example.dir));
    const expected = require(getExpectedPath(example.dir));

    assert.deepEquals(
      responseTransformer.transform(input, example.query),
      expected
    );
  }
  assert.end();
});

test('it throws a not found exception if the word was not found', function(assert) {
  const input = fs.readFileSync(`${__dirname}/examples/404.html`);
  try {
    const output = responseTransformer.transform(input, 'anriuste');
  } catch (error) {
    assert.equals(error.type, 'Not Found');
    assert.end();

    return;
  }

  assert.fail();
});
