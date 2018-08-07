const loadedContainer = require('./config/loadedContainer');

const linguee = loadedContainer.get('linguee');

module.exports = {
  translate: linguee.translate
};
