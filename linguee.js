const request = require('request');
const querystring = require('querystring');
const cheerio = require('cheerio');
const config = require('./config');
const transformResponse = require('./src/responseTransformer')(config, cheerio);
const buildUrl = require('./src/urlBuilder')(config, querystring);

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
