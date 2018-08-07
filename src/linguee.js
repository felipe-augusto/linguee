const linguee = function(
  cheerio,
  request,
  config,
  urlBuilder,
  responseTransformer
) {
  return {
    translate: function(query, opts) {
      const url = urlBuilder.buildUrl(opts.from, opts.to, query);

      return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            const resp = responseTransformer.transform(body, query);
            resolve(resp);

            return;
          }

          reject(error);
        });
      });
    }
  };
};

module.exports = linguee;
