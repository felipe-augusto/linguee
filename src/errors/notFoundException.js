const notFoundException = function(query) {
  this.type = 'Not Found';
  this.message = `The word "${query}" was not found`;
};

module.exports = notFoundException;
