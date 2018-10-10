module.exports = function() {
  return {
    removeNonBreakableSpace: function(str = '') {
      return str.replace(/\u00A0/g, ' ');
    }
  };
};
