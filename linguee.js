const request = require('request');
const cheerio = require('cheerio');
const config = require('./config');

module.exports = {
  translate: function(received, opts, cb) {
    request(
      'http://www.linguee.com.br/' +
        config.langs[opts.from] +
        '-' +
        config.langs[opts.to] +
        '/search?source=auto&query=' +
        received +
        '&ajax=1',
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(body);

          // get translations

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

          // get the audios

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

          // prepare the object to be send

          const resp = {
            word: received,
            audio:
              typeof audios[0] === 'undefined'
                ? null
                : 'http://www.linguee.com.br/mp3/' + audios[0],
            pos: translation
          };

          cb(resp);
        }
      }
    );
  }
};
