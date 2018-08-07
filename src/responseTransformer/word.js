module.exports = function(
  urlBuilder,
  translationsTransformer,
  lessCommonTranslationsTransformer
) {
  return {
    getWord: function($wordContainer) {
      const $mainDescription = $wordContainer.find('.lemma_desc .tag_lemma');
      const getTerm = function() {
        return $mainDescription.find('a.dictLink').text();
      };

      const getAdditionalInformation = function() {
        const $additionalInfoContainer = $mainDescription.find(
          '.tag_lemma_context'
        );
        return $additionalInfoContainer
          ? $additionalInfoContainer.text() || null
          : null;
      };

      const getType = function() {
        return $mainDescription.find('.tag_wordtype').text() || null;
      };

      const getAudio = function() {
        const $audio = $mainDescription.children('a.audio');
        const audioPath = $audio ? $audio.attr('id') || null : null;

        return audioPath ? urlBuilder.buildAudioUrl(audioPath) : null;
      };

      const $translations = $wordContainer.find(
        '.lemma_content .translation_lines'
      );
      const $lessCommonTranslations = $wordContainer.find(
        '.lemma_content .translation_lines .translation_group'
      );

      return {
        term: getTerm(),
        audio: getAudio(),
        additionalInfo: getAdditionalInformation(),
        type: getType(),
        translations: translationsTransformer.getTranslations($translations),
        lessCommonTranslations: lessCommonTranslationsTransformer.getTranslations(
          $lessCommonTranslations
        )
      };
    }
  };
};
