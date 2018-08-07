module.exports = function(cheerio, urlBuilder) {
  return {
    getExamples: function($examples) {
      const $ = cheerio.load('');
      const getExample = function($example) {
        const getFrom = function() {
          const $from = $example.find('.lemma_desc .tag_lemma');

          const getAudio = function() {
            const $audio = $from.find('a.audio');
            const audioPath = $audio ? $audio.attr('id') || null : null;

            return audioPath ? urlBuilder.buildAudioUrl(audioPath) : null;
          };

          return {
            content: $from.children('a').text(),
            type: $from.children('.tag_type').text() || null,
            audio: getAudio()
          };
        };

        const getTos = function() {
          const $tos = $example.find('.lemma_content .line .translation');
          const getTo = function($to) {
            return {
              content: $to.find('a.dictLink').text(),
              type: $to.find('.tag_type').text()
            };
          };

          const tos = [];
          $tos.each(function(index, to) {
            tos.push(getTo($(to)));
          });

          return tos;
        };

        return {
          from: getFrom(),
          to: getTos()
        };
      };

      const examples = [];
      $examples.children('.lemma').each(function(index, example) {
        examples.push(getExample($(example)));
      });

      return examples;
    }
  };
};
