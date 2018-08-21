module.exports = {
  query: 'verstehe',
  words: [
    {
      term: 'verstehen',
      audio:
        'http://somedomain.com/mp3/DE/0e/0ed1f518e64b3fef9cf0d27a92d5a1b3-201',
      additionalInfo: null,
      type: 'verb',
      translations: [
        {
          term: 'comprendre (qqch./qqn.)',
          audio:
            'http://somedomain.com/mp3/FR/8f/8f8f74ac3eb56b5511cd6fdef2cc6030-200',
          type: 'verb',
          alternatives: [],
          examples: [
            {
              from: 'Nach ihrer Erklärung habe ich verstanden, was sie meinte.',
              to: "Après son explication, j'ai compris ce qu'elle voulait dire."
            },
            {
              from:
                'Ich versuchte, die Einstellung meines Bruders zu verstehen.',
              to: "J'ai essayé de comprendre l'attitude de mon frère."
            }
          ]
        },
        {
          term: 'savoir',
          audio:
            'http://somedomain.com/mp3/FR/68/68cdd228eaefe937bd165c8c2d99b25c-200',
          type: 'verb',
          alternatives: [],
          examples: [
            {
              from: 'Sie versteht etwas vom Kochen.',
              to: 'Elle sait cuisiner.'
            }
          ]
        }
      ],
      lessCommonTranslations: [
        {
          term: 'entendre',
          type: 'verb',
          usage: null
        },
        {
          term: 'saisir',
          type: 'verb',
          usage: null
        },
        {
          term: 'concevoir',
          type: 'verb',
          usage: null
        },
        {
          term: 'se rendre compte',
          type: 'verb',
          usage: null
        }
      ]
    },
    {
      term: 'Verstehen',
      audio:
        'http://somedomain.com/mp3/DE/cc/cc7c31cf519b50e685ac3b3efa024036-105',
      additionalInfo: null,
      type: 'noun, neuter',
      translations: [
        {
          term: 'entendement',
          audio: null,
          type: 'noun, masculine',
          alternatives: [],
          examples: []
        }
      ],
      lessCommonTranslations: []
    }
  ],
  examples: [
    {
      from: {
        content: 'falsch verstehen',
        type: 'verb',
        audio:
          'http://somedomain.com/mp3/DE/e5/e5205e4b0cb7b69e847d793fef079c92-200'
      },
      to: [
        {
          content: 'mal comprendre qqch.',
          type: 'verb'
        }
      ]
    },
    {
      from: {
        content: 'zu verstehen geben',
        type: 'verb',
        audio:
          'http://somedomain.com/mp3/DE/37/37f7e1dcb3b999aa0b8140177dc2f3d4-200'
      },
      to: [
        {
          content: 'signifier',
          type: 'verb'
        }
      ]
    },
    {
      from: {
        content: 'besseres Verstehen',
        type: 'noun, neuter',
        audio: null
      },
      to: [
        {
          content: 'meilleure compréhension',
          type: 'noun, feminine'
        },
        {
          content: 'compréhension approfondie',
          type: 'noun, feminine'
        },
        {
          content: 'meilleure connaissance',
          type: 'noun, feminine'
        }
      ]
    }
  ]
};
