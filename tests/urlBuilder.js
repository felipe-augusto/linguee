const test = require('tape');
const querystring = require('querystring');
const config = {
  domain: 'http://somedomain.com',
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
const buildUrl = require('../src/urlBuilder')(config, querystring);

test('it throws an error if from parameter is not valid', function(assert) {
  try {
    const url = buildUrl('test', 'por', 'somequery');
  } catch (error) {
    assert.pass();
    assert.end();

    return;
  }

  assert.fail();
});

test('it throws an error if to parameter is not valid', function(assert) {
  try {
    const url = buildUrl('fra', 'test', 'somequery');
  } catch (error) {
    assert.pass();
    assert.end();

    return;
  }

  assert.fail();
});

test('it returns a correct url', function(assert) {
  assert.equal(
    buildUrl('fra', 'por', 'lorem'),
    'http://somedomain.com/french/portuguese/something?lorem=ipsum&testencode=aeiouy%C3%AF%C3%BC%C3%A9~%C3%AE%C4%99&query=lorem'
  );
  assert.pass();
  assert.end();
});
