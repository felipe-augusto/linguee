# linguee
Bilingual word translation straight from Liguee website

## Usage

Example:

```javascript
var linguee = require('linguee');

// translate money from english to portuguese

linguee.translate('money', { from : 'eng', to: 'por'}, function (resp) {
	console.log(resp);
})
```

## License

MIT

Linguee Terms and Conditions: http://www.linguee.com/english-portuguese/page/termsAndConditions.php

