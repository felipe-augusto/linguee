var request = require('request');
var cheerio = require('cheerio');

module.exports = {
	translate : function (received, opts, cb) {
    request('http://www.linguee.com.br/' + from[opts.from].to[opts.to] + '/search?source=auto&query=' + received + '&ajax=1', function (error, response, body) {
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

var from = {
	'por' : { to : {
		ita : 'portugues-italiano',
		eng: 'portugues-ingles' }},
	'eng' : { to : {
		por : 'english-portuguese',
		ita: 'english-italian' }}
}


/*
objeto final
wordpor
audio
pos
  type
  text
*/

