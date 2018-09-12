const test = require('tape');
const querystring = require('querystring');
const config = {
  placeholderUrl: '/{from}/{to}/something',
  queryParameters: {
    lorem: 'ipsum',
    testencode: 'aeiouyïüé~îę',
    query: ''
  },
  langs: {
    fra: 'french',
    por: 'portuguese'
  }
};
const urlBuilder = require('../src/urlBuilder')(config, querystring);

test('it throws an error if from parameter is not valid', function(assert) {
  try {
    const url = urlBuilder.buildUrl('test', 'por', 'somequery');
  } catch (error) {
    assert.pass();
    assert.end();

    return;
  }

  assert.fail();
});

test('it throws an error if to parameter is not valid', function(assert) {
  try {
    const url = urlBuilder.buildUrl('fra', 'test', 'somequery');
  } catch (error) {
    assert.pass();
    assert.end();

    return;
  }

  assert.fail();
});

test('it returns a correct url', function(assert) {
  assert.equal(
    urlBuilder.buildUrl('fra', 'por', 'lorem'),
    'https://www.linguee.com/french/portuguese/something?lorem=ipsum&testencode=aeiouy%C3%AF%C3%BC%C3%A9~%C3%AE%C4%99&query=lorem'
  );
  assert.pass();
  assert.end();
});

test('it builds audio url', function(assert) {
  assert.equal(
    urlBuilder.buildAudioUrl('EN_US/b9/b9ef165b255673dde47bff07f4390fb1-101'),
    'https://www.linguee.com/mp3/EN_US/b9/b9ef165b255673dde47bff07f4390fb1-101'
  );

  assert.end();
});
