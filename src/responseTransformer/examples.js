module.exports = function(cheerio, urlBuilder, sanitizer) {
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

          const getType = function() {
            const shortenedType = $from.children('.tag_type').text() || null;

            if (!shortenedType) {
              return null;
            }

            const typesDictionary = {
              v: 'verb',
              n: 'noun',
              pl: 'noun, plural',
              nt: 'noun, neuter',
              f: 'noun, feminine',
              m: 'noun, masculine'
            };

            if (!(shortenedType in typesDictionary)) {
              return sanitizer.removeNonBreakableSpace(shortenedType);
            }

            return typesDictionary[shortenedType];
          };

          return {
            content: $from.children('a').text(),
            type: getType(),
            audio: getAudio()
          };
        };

        const getTos = function() {
          const $tos = $example.find('.lemma_content .line .translation');
          const getTo = function($to) {
            return {
              content: $to.find('a.dictLink').text(),
              type: sanitizer.removeNonBreakableSpace(
                $to.find('.tag_type').attr('title')
              )
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
