const test = require('tape');
const stringSanitizer = require('../utils/stringSanitizer')();

test('it removes non breakable spaces', function(assert) {
  const textWithNbsp = 'This module is amazing';
  const textWithoutNbsp = 'This module is amazing';

  assert.notEquals(textWithNbsp, textWithoutNbsp);
  assert.equals(
    stringSanitizer.removeNonBreakableSpace(textWithNbsp),
    textWithoutNbsp
  );

  assert.end();
});
