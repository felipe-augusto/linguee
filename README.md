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
    "audio": "http://www.linguee.com/mp3/EN_US/97/9726255eec083aa56dc0449a21b33190-101",
    "additionalInfo": null,
    "type": "noun",
    "translations": [
      {
        "term": "dinheiro",
        "audio": "http://www.linguee.com/mp3/PT_BR/79/79de84b440a2419610355782ac900622-106",
        "type": "m",
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
        "type": "m",
        "usage": null
      },
      {
        "term": "moeda",
        "type": "f",
        "usage": null
      },
      {
        "term": "verba",
        "type": "f",
        "usage": null
      },
      {
        "term": "riqueza",
        "type": "f",
        "usage": null
      },
      {
        "term": "numerário",
        "type": "m",
        "usage": null
      },
      {
        "term": "fortuna",
        "type": "f",
        "usage": null
      }
    ]
  },
  {
    "term": "money",
    "audio": "http://www.linguee.com/mp3/EN_UK/97/9726255eec083aa56dc0449a21b33190-0",
    "additionalInfo": null,
    "type": "noun as adjective",
    "translations": [],
    "lessCommonTranslations": [
      {
        "term": "monetário",
        "type": "adj",
        "usage": null
      },
      {
        "term": "financeira",
        "type": "adj",
        "usage": null
      },
      {
        "term": "monetária",
        "type": "adj",
        "usage": null
      },
      {
        "term": "cambial",
        "type": "adj",
        "usage": null
      }
    ]
  }
],
"examples": [
  {
    "from": {
      "content": "save money",
      "type": "v",
      "audio": "http://www.linguee.com/mp3/EN_US/87/87a54e4508b4bdadce59ab1dce8f05b6-200"
    },
    "to": [
      {
        "content": "economizar",
        "type": "v"
      }
    ]
  },
  {
    "from": {
      "content": "money market",
      "type": "n",
      "audio": "http://www.linguee.com/mp3/EN_US/50/50fa9efcf444a86b33ce03fee484cd5c-101"
    },
    "to": [
      {
        "content": "mercado monetário",
        "type": "m"
      }
    ]
  },
  {
    "from": {
      "content": "make money",
      "type": "v",
      "audio": "http://www.linguee.com/mp3/EN_US/73/734031a6878c5c4e7f26dae9e16f1af8-200"
    },
    "to": [
      {
        "content": "fazer dinheiro",
        "type": "v"
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

Inversion of control is guaranteed thanks to a very simple homemade dependency injection container.

## License

MIT

Linguee Terms and Conditions: http://www.linguee.com/english-portuguese/page/termsAndConditions.php
