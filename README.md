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

linguee
  .translate('money', { from: 'eng', to: 'por' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    // ...
  });

/** Outputs :
{
"query": "money",
"words": [
  {
    "term": "money",
    "audio": "https://www.linguee.com/mp3/EN_US/97/9726255eec083aa56dc0449a21b33190-101",
    "additionalInfo": null,
    "type": "noun",
    "translations": [
      {
        "term": "dinheiro",
        "audio": "https://www.linguee.com/mp3/PT_BR/79/79de84b440a2419610355782ac900622-106",
        "type": "noun, masculine",
        "alternatives": [],
        "examples": [
          {
            "from": "My friend still owes me some money. ",
            "to": "Meu amigo ainda me deve algum dinheiro."
          },
          {
            "from": "I want to withdraw money from my account.",
            "to": "Eu quero retirar dinheiro da minha conta."
          }
        ]
      }
    ],
    "lessCommonTranslations": [
      {
        "term": "capital",
        "type": "noun, masculine",
        "usage": null
      },
      {
        "term": "moeda",
        "type": "noun, feminine",
        "usage": null
      },
      {
        "term": "verba",
        "type": "noun, feminine",
        "usage": null
      },
      {
        "term": "riqueza",
        "type": "noun, feminine",
        "usage": null
      },
      {
        "term": "numerário",
        "type": "noun, masculine",
        "usage": null
      },
      {
        "term": "fortuna",
        "type": "noun, feminine",
        "usage": null
      }
    ]
  },
  {
    "term": "money",
    "audio": "https://www.linguee.com/mp3/EN_UK/97/9726255eec083aa56dc0449a21b33190-0",
    "additionalInfo": null,
    "type": "noun as adjective",
    "translations": [],
    "lessCommonTranslations": [
      {
        "term": "monetário",
        "type": "adjective, masculine",
        "usage": null
      },
      {
        "term": "financeira",
        "type": "adjective, feminine",
        "usage": null
      },
      {
        "term": "monetária",
        "type": "adjective, feminine",
        "usage": null
      },
      {
        "term": "cambial",
        "type": "adjective, singular, both",
        "usage": null
      }
    ]
  }
],
"examples": [
  {
    "from": {
      "content": "value for money",
      "type": "noun",
      "audio": "https://www.linguee.com/mp3/EN_UK/78/78d0975a374ecdf77205be9b213ee294-0"
    },
    "to": [
      {
        "content": "relação qualidade-preço",
        "type": "noun, feminine"
      },
      {
        "content": "rentabilidade",
        "type": "noun, feminine"
      }
    ]
  },
  {
    "from": {
      "content": "raise money",
      "type": "verb",
      "audio": "https://www.linguee.com/mp3/EN_US/55/55aace5542808e206cd7c48c63fa386a-200"
    },
    "to": [
      {
        "content": "levantar dinheiro",
        "type": "verb"
      }
    ]
  },
  {
    "from": {
      "content": "money supply",
      "type": "noun",
      "audio": "https://www.linguee.com/mp3/EN_US/72/72d6c1f1aa121245beb37ff5b58ae4c7-101"
    },
    "to": [
      {
        "content": "massa monetária",
        "type": "noun, feminine"
      },
      {
        "content": "fornecimento de dinheiro",
        "type": "noun, masculine"
      }
    ]
  }
]
}
*/
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

## Tests

Run `npm run test`

## Architecture

A `linguee` function takes the parameters as input (query, languages) and send a Promise with the result.

Internally, the function calls an `urlBuilder` to build the url, and a `responseTransformer` to pass it the response body from linguee, after converting it from 'ISO-8859-1'.

The `responseTransformer` itself is built from several functions that are dedicated to each part of the page to parse.

Inversion of control is guaranteed thanks to [a very simple dependency injection container](https://www.npmjs.com/package/@einenlum/jic).

## License

MIT

Linguee Terms and Conditions: https://www.linguee.com/english-portuguese/page/termsAndConditions.php
