module.exports = function(cheerio, urlBuilder, sanitizer) {
  const $ = cheerio.load('');

  return {
    getTranslations: function($translationLines) {
      const $mainTranslations = $translationLines.children('.translation');
      const mainTranslations = [];

      const getTranslation = function($translation) {
        const $translationDescription = $translation.find('.translation_desc');
        const getTerm = function() {
          return $translationDescription.find('.tag_trans a.dictLink').text();
        };

        const getType = function() {
          const type = $translationDescription
            .children('.tag_trans')
            .children('.tag_type')
            .attr('title');

          return sanitizer.removeNonBreakableSpace(type);
        };

        const getAudio = function() {
          const $audio = $translationDescription.find('.tag_trans a.audio');
          const audioPath = $audio ? $audio.attr('id') || null : null;

          return audioPath ? urlBuilder.buildAudioUrl(audioPath) : null;
        };

        const getAlternatives = function() {
          const getAlternative = function($altTag) {
            const getType = function() {
              let shortenedType = $altTag.find('.tag_type').text() || null;
              if (shortenedType) {
                shortenedType = sanitizer.removeNonBreakableSpace(
                  shortenedType
                );
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
                return shortenedType;
              }

              return typesDictionary[shortenedType];
            };

            return {
              term: $altTag.find('.formLink').text(),
              type: getType()
            };
          };

          const alternatives = [];
          const $altTags = $translationDescription.find('.tag_forms .tag_t');
          $altTags.each(function(index, altTag) {
            alternatives.push(getAlternative($(altTag)));
          });

          return alternatives;
        };

        const getExamples = function() {
          const getExample = function($exampleLine) {
            const $container = $exampleLine.find('.tag_e');

            return {
              from: $container.children('.tag_s').text(),
              to: $container.children('.tag_t').text()
            };
          };
          const examples = [];
          const $exampleLines = $translation.find('.example_lines .line');
          $exampleLines.each(function(index, exampleLine) {
            examples.push(getExample($(exampleLine)));
          });

          return examples;
        };

        return {
          term: getTerm(),
          audio: getAudio(),
          type: getType(),
          alternatives: getAlternatives(),
          examples: getExamples()
        };
      };

      const translations = [];
      $mainTranslations.each(function(index, translation) {
        const $translation = $(translation);

        translations.push(getTranslation($translation));
      });

      return translations;
    }
  };
};
