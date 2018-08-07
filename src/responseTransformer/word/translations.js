module.exports = function(cheerio, urlBuilder) {
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
          return $translationDescription
            .children('.tag_trans')
            .children('.tag_type')
            .text();
        };

        const getAudio = function() {
          const $audio = $translationDescription.find('.tag_trans a.audio');
          const audioPath = $audio ? $audio.attr('id') || null : null;

          return audioPath ? urlBuilder.buildAudioUrl(audioPath) : null;
        };

        const getAlternatives = function() {
          const getAlternative = function($altTag) {
            return {
              term: $altTag.find('.formLink').text(),
              type: $altTag.find('.tag_type').text()
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
