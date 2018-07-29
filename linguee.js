const request = require('request');
const buildUrl = require('./src/urlBuilder');
const transformResponse = require('./src/responseTransformer');

module.exports = {
  translate: function(query, opts, cb) {
    const url = buildUrl(opts.from, opts.to, query);
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const resp = transformResponse(body, query);
        cb(resp);
      }
    });
  }
};
