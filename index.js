const linguee = require('./linguee');

linguee.translate('money', { from: 'eng', to: 'fra' }, function(resp) {
  console.log(resp);
});
