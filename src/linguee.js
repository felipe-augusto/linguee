const linguee = function(
  cheerio,
  request,
  iconv,
  config,
  urlBuilder,
  responseTransformer
) {
  return {
    translate: function(query, opts) {
      const url = urlBuilder.buildUrl(opts.from, opts.to, query);

      return new Promise(function(resolve, reject) {
        request(url, { encoding: null }, function(error, response, body) {
          // Linguee encodes the response in ISO-8859-1. We convert it to UTF8
          const utf8body = iconv.decode(Buffer.from(body), 'ISO-8859-1');
          if (!error && response.statusCode == 200) {
            const resp = responseTransformer.transform(utf8body, query);
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
