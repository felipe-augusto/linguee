# linguee

Bilingual word translation straight from Linguee website

## Installation

`npm install linguee`

## Warning

As Linguee does not provide an API we need to request the translation page and parse it. Obviously, if Linguee changes it's DOM, probably this will break and also need changes. Proceed with caution.

## Usage

Example:

```javascript
var linguee = require('linguee');

// translate money from english to portuguese

linguee.translate('money', { from: 'eng', to: 'por' }, function(resp) {
  console.log(resp);
  /*
	OUTPUT	
	{  
	   word:'pretty',
	   audio:'http://www.linguee.com.br/mp3/EN_US/2f/2f0e7ef29748dbf6dacf8381c4cc921c-300',
	   pos:{  
	      adj:[  
	         'bonito',
	         'lindo',
	         'belo',
	         'agradáveis',
	         'elegante',
	         'atraente',
	         'agradável',
	         'considerável',
	         'venusto'
	      ],
	      adv:[  
	         'bastante',
	         'bem',
	         'praticamente',
	         'consideravelmente'
	      ]
	   }
	}
	*/
});
```

## Supported Languages ISO 639-2/B codes

| Language |    Code    |
| :------: | :--------: |
|   eng    |  English   |
|   ger    |   German   |
|   fra    |   French   |
|   spa    |  Spanish   |
|   chi    |  Chinese   |
|   rus    |  Russian   |
|   jpn    |  Japanese  |
|   por    | Portuguese |
|   ita    |  Italian   |
|   dut    |   Dutch    |
|   pol    |   Polish   |
|   swe    |  Swedish   |
|   dan    |   Danish   |
|   fin    |  Finnish   |
|   gre    |   Greek    |
|   cze    |   Czech    |
|   rum    |  Romanian  |
|   hun    | Hungarian  |
|   slo    |   Slovak   |
|   bul    | Bulgarian  |
|   slv    |  Slovene   |
|   lit    | Lithuanian |
|   lav    |  Latvian   |
|   est    |  Estonian  |
|   mlt    |  Maltese   |

## License

MIT

Linguee Terms and Conditions: http://www.linguee.com/english-portuguese/page/termsAndConditions.php
