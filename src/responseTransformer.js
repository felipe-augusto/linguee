const cheerio = require('cheerio');
const config = require('../config');

module.exports = function(responseBody, query) {
  const $ = cheerio.load(responseBody);

  const translation = {};

  const pos = $('.exact')
    .find('.translation_desc')
    .map(function() {
      const trans = $(this).find('.tag_trans');
      const text = trans.find('.dictLink').text();
      const type = trans.find('.tag_type').text();
      const obj = {};
      // obj[type] = text;
      try {
        translation[type].push(text);
      } catch (err) {
        translation[type] = [];
        translation[type].push(text);
      }
      obj.type = type;
      obj.translation = text;
      return obj;
    })
    .get();

  const audios = $('.exact')
    .find('.lemma_desc')
    .map(function() {
      return JSON.parse(
        $(this)
          .find('.audio')
          .attr('onclick')
          .replace('playSound(this,', '[')
          .replace(');', ']')
      );
    })
    .get();

  const resp = {
    word: query,
    audio:
      typeof audios[0] === 'undefined'
        ? null
        : `${config.domain}/mp3/` + audios[0],
    pos: translation
  };

  return resp;
};
