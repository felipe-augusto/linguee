const urlBuilder = function(config, querystring) {
  return {
    buildUrl: function(from, to, query) {
      if (!(from in config.langs)) {
        throw Error(
          `"from" parameter (value: "${from}") is not valid. Valid values are: ${Object.keys(
            config.langs
          ).join(', ')}`
        );
      }
      if (!(to in config.langs)) {
        throw Error(
          `"to" parameter (value: "${to}") is not valid. Valid values are: ${Object.keys(
            config.langs
          ).join(', ')}`
        );
      }
      const queryParameters = {
        ...config.queryParameters,
        query: query
      };

      const url = `${config.domain}${config.placeholderUrl
        .replace('{from}', config.langs[from])
        .replace('{to}', config.langs[to])}`;

      return `${url}?${querystring.stringify(queryParameters)}`;
    },
    buildAudioUrl: function(path) {
      return `${config.domain}/mp3/${path}`;
    }
  };
};

module.exports = urlBuilder;
