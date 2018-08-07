module.exports = {
  query: 'buy',
  words: [
    {
      term: 'buy sth.',
      audio:
        'http://somedomain.com/mp3/EN_US/04/0461ebd2b773878eac9f78a891912d65-200',
      additionalInfo: null,
      type: 'verb',
      translations: [
        {
          term: 'покупать что-л.',
          audio: null,
          type: 'v',
          alternatives: [],
          examples: [
            {
              from: 'I will buy a new car today.',
              to: 'Сегодня я куплю новую машину.'
            }
          ]
        }
      ],
      lessCommonTranslations: []
    }
  ],
  examples: [
    {
      from: {
        content: 'intention to buy',
        type: 'n',
        audio:
          'http://somedomain.com/mp3/EN_UK/19/1922e463e713687ee48ac6b25a76d4dd-100'
      },
      to: [
        {
          content: 'намерение купить',
          type: 'nt'
        }
      ]
    },
    {
      from: {
        content: 'buy order',
        type: 'n',
        audio:
          'http://somedomain.com/mp3/EN_US/1d/1d85f7a778ad5e9d86c63420fddcd6f1-100'
      },
      to: [
        {
          content: 'заказ на покупку',
          type: 'm'
        }
      ]
    },
    {
      from: {
        content: 'right to buy',
        type: 'n',
        audio: null
      },
      to: [
        {
          content: 'право покупать',
          type: 'nt'
        }
      ]
    },
    {
      from: {
        content: 'good buy',
        type: 'n',
        audio: null
      },
      to: [
        {
          content: 'удачная покупка',
          type: 'f'
        }
      ]
    }
  ]
};
