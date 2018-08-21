const sanitizer = function() {
  return {
    removeNonBreakableSpace: function(str) {
      return str.replace(/\u00A0/g, ' ');
    }
  };
};

module.exports = sanitizer;
