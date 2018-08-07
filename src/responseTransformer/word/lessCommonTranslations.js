module.exports = function(cheerio) {
  const $ = cheerio.load('');
  return {
    getTranslations: function($translationGroup) {
      const $linesContainer = $translationGroup.children(
        '.translation_group_line'
      );
      const $lines = $linesContainer.children('.translation');

      const getTranslation = function($line) {
        const $description = $line.find('.translation_desc');
        const getTerm = function() {
          return $description.find('.tag_trans a.dictLink').text();
        };
        const getType = function() {
          return $description.find('.tag_trans .tag_type').text() || null;
        };
        const getUsage = function() {
          return $description.find('.tag_trans .tag_usage').text() || null;
        };

        return {
          term: getTerm(),
          type: getType(),
          usage: getUsage()
        };
      };

      const translations = [];
      $lines.each(function(index, line) {
        translations.push(getTranslation($(line)));
      });

      return translations;
    }
  };
};
