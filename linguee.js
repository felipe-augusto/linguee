var request = require('request');
var cheerio = require('cheerio');

module.exports = {
	translate : function (received, opts, cb) {
    request('http://www.linguee.com.br/' + lang[opts.from] + '-' + lang[opts.to] + '/search?source=auto&query=' + received + '&ajax=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
       var $ = cheerio.load(body);

      // get translations

      var translation = {};

      var pos = $('.exact').find('.translation_desc').map(function() {
        var trans = $(this).find('.tag_trans'); 
        var text = trans.find('.dictLink').text();
        var type = trans.find('.tag_type').text();
        var obj = {};
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
        
      }).get();

      // get the audios

       var audios = $('.exact').find('.lemma_desc').map(function () { return JSON.parse($(this)
        .find('.audio')
        .attr('onclick')
        .replace('playSound(this,', '[')
        .replace(');', ']'));
       }).get();

       // prepare the object to be send

      var resp = {
        word: received,
        audio: (typeof audios[0] === 'undefined') ? null : 'http://www.linguee.com.br/mp3/' + audios[0],
        pos: translation
       }

      cb(resp);

      }
    })
	}
}

var lang = {
  'eng' : 'english',
  'ger' : 'german',
  'fra' : 'french',
  'spa' : 'spanish',
  'chi' : 'chinese',
  'rus' : 'russian',
  'jpn' : 'japanese',
  'por' : 'portuguese',
  'ita' : 'italian',
  'dut' : 'dutch',
  'pol' : 'polish',
  'swe' : 'swedish',
  'dan' : 'danish',
  'fin' : 'finnish',
  'gre' : 'greek',
  'cze' : 'czech',
  'rum' : 'romanian',
  'hun' : 'hungarian',
  'slo' : 'slovak',
  'bul' : 'bulgarian',
  'slv' : 'slovene',
  'lit' : 'lithuanian',
  'lav' : 'latvian',
  'est' : 'estonian',
  'mlt' : 'maltese'
}