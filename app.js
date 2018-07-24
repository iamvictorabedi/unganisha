// @flow
'use strict';
// const BootBot = require('bootbot');
const BootBot = require('./lib/BootBot');
const config = require('config');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.hear(['OneTime','911','help', /hey( there)?/i], (payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  const options = {
    typing: true
  };
  chat.getUserProfile().then((user) => {
    chat.say(`Take a breath and relax while i help you out`)
});
});

bot.hear(['hello','niaje','sasa', 'hi', /hey( there)?/i], (payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  const options = {
    typing: true
  };
  chat.getUserProfile().then((user) => {
    chat.say(`Hi, ${user.first_name}!Nice to see you there.`
    ,options).then(() => chat.say({
      text: 'How can i help you today?',
      quickReplies: ['My Savings', 'Request Ambulance',"Daily HealthVibes"]
    }));
  });
});

bot.setGetStartedButton((payload, chat) => {
  const options = {
    typing: true
  };
    // Greet the customer then ask what he would like to order, a cake or doughnut?
  chat.getUserProfile().then((user) => {
    chat.say(`Hi, ${user.first_name}!Nice to see you there.`
    ,options).then(() => chat.say({
      text: 'How can i help you today?',
      quickReplies: ['My Savings', 'Request Ambulance',"Daily HealthVibes"]
    }));
  });
});


bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  console.log(`The user said: ${text}`);

  const options = {
    typing: true
  };

  if (text == 'My Savings') {
    chat.say('Select One', {
      typing: true
    }).then(() => chat.sendListTemplate([{
        "title": "Save",
        "image_url": "https://i2.wp.com/www.techweez.com/wp-content/uploads/2017/07/Mpesa.jpg?fit=1920%2C1080",
        "subtitle": "Use M-pesa to save for medical emergencies.“Save for retirement. Start from your first paycheck.” -John Mart ",
        "buttons": [{
          "title": "Use M-PESA",
          "type": "postback",
          "payload": "LIPA_NA_M-PESA__SELF_PAYLOAD"
        }]
      },
      {
        "title": "Remit",
        "image_url": "https://i2.wp.com/www.techweez.com/wp-content/uploads/2017/07/Mpesa.jpg?fit=1920%2C1080",
        "subtitle": "Remit for friends and family in times of medical crisis using lipa na mpesa",
        "buttons": [{
          "title": "Use Mpesa",
          "type": "postback",
          "payload": "LIPA_NA_M-PESA__OTHER_PAYLOAD"
        }]
      }
    ], [{
      "title": "View More",
      "type": "postback",
      "payload": "VIEWMORE_PAYLOAD"
    }], options));

  } else if(text == 'Request Ambulance') {
    chat.sendListTemplate([{
      "title": "AAR HEALTHCARE",
      "image_url": "https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg",
      "website": "http://www.aar-healthcare.com/ke/rescue-services/",
      "subtitle": "Emergency Rescue Services was started in 1984 as Africa Air Rescue. Since then, additional services have added to provide holistic health care provision resulting to Health Centers and the insurance company. Today, AAR Healthcare is in all the East Africa countries, providing not only emergency rescue services but Outpatient and medical insurance. ",
      "buttons": [{
        "title": "REQUEST AAR",
        "type": "postback",
        "payload": "ARR_PAYLOAD"
      }]
    },
    {
      "title": "KENYA REDCROSS",
      "image_url": "https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg",
      "website": "http://eplus.co.ke/",
      "subtitle": "Emergency Plus Medical Services (E-Plus)) is a private commercial company, fully owned by the Kenya Red Cross Society, whose core business is the provision of professional advanced pre-hospital medical care and ambulance services in Kenya ",
      "buttons": [{
        "title": "REQUEST KENYA REDCROSS",
        "type": "postback",
        "payload": "KR_PAYLOAD"
      }]
    },
    {
      "title": "ST JOHNS AMBULANCE ",
      "image_url": "http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg",
      "subtitle": "St John Ambulance is available round the clock, 24/7 for casualties in need of critical evacuation during emergencies and disasters. We also provide hospital ambulance transfers and standby ambulance and paramedics and first aiders at events",
      "buttons": [{
        "title": "REQUEST ST JOHNS AMBULANCE",
        "type": "postback",
        "payload": "STJ_PAYLOAD"
      }]
    },
    {
      "title": "AMREF KENYA ",
      "image_url": "http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg",
      "subtitle": "Leading halthcare provider in safe and proffessional aero-medical",
      "buttons": [{
        "title": "REQUEST AMREF KENYA",
        "type": "postback",
        "payload": "AMREF_PAYLOAD"
      }]
    }
  ], [{
    "title": "View More",
    "type": "postback",
    "payload": "VIEWMORE_PAYLOAD"
  }], options);

  }else{

  }
  bot.on('postback:LIPA_NA_M-PESA__SELF_PAYLOAD', (payload, chat) => {
    chat.say('Please wait for M-PESA prompt on your phone', {
      typing: true
    });
  });
  
  bot.on('postback:LIPA_NA_M-PESA__OTHER_PAYLOAD', (payload, chat) => {
    chat.say('Please enter the phone number of the person you would wish to remit to?', {
      typing: true
    }).then(() => chat.say({
        text: 'Please wait for an M-PESA promt on your phone'
    }));
  });
  
  bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
    chat.say('You selected BlackForest', {
      typing: true
    });
    chat.conversation((convo) => {
      convo.set('name', 'blackforest');
      convo.sendTypingIndicator(1000).then(() => askQuantity(convo));
    });
  });
  bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
    chat.say('You selected BlackForest', {
      typing: true
    });
    chat.conversation((convo) => {
      convo.set('name', 'blackforest');
      convo.sendTypingIndicator(1000).then(() => askQuantity(convo));
    });
  });
  bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
    chat.say('You selected BlackForest', {
      typing: true
    });
    chat.conversation((convo) => {
      convo.set('name', 'blackforest');
      convo.sendTypingIndicator(1000).then(() => askQuantity(convo));
    });
  });
  bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
    chat.say('You selected BlackForest', {
      typing: true
    });
    chat.conversation((convo) => {
      convo.set('name', 'blackforest');
      convo.sendTypingIndicator(1000).then(() => askQuantity(convo));
    });
  });

  const askQuantity = (convo) => {

    const question = {
      text: `How many do you want?`,
      quickReplies: ['1', '2', '3', '4', '5']
    };

    const answer = (payload, convo, data) => {
      // const text = payload.message.text;
      // convo.set('Quantity',text);
      // convo.say(`Ok ${text} of them.`);

    };

    const payload = [{
      event: 'quick_reply',
      callback: (payload, convo, data) => {
        const text = payload.message.text;
        convo.set('Quantity', text);
        convo.say(`Ok ${text} of them.`);
        askSize(convo);
      }
    }];

    const options = {
      typing: true
    };

    convo.ask(question, answer, payload, options);

    // convo.ask({
    // 	text: `How many do you want?`,
    // 	quickReplies: ['1', '2', '3','4','5']
    // }, {
    //   text: `Ok ${payload.message.text} of them.`
    // });
    // const text = payload.message.text;
    // convo.set('Quantity',text).then(() => askSize(convo) );
  };

  const askSize = (convo) => {

    const question = {
      text: `What size would you like?`,
      quickReplies: ['500g', '1Kg', '2Kg']
    };
    const answer = (payload, convo, data) => {
      // const text = payload.message.text;
      // convo.say(`Ok ${text} .`);
      // convo.set('Size',text);
    };

    const payload = [{
      event: 'quick_reply',
      callback: (payload, convo, data) => {
        const text = payload.message.text;
        convo.say(`Ok ${text} .`);
        convo.set('Size', text);

        const payload_1 = {

          "template_type": "receipt",
          "recipient_name": "Peter Okwara",
          "order_number": "000000000000000",
          "currency": "USD",
          "payment_method": "MPESA",
          "timestamp": "1428444852",
          "elements": [{
              "title": "BlackForest Cake",
              "subtitle": "Includes: headset, sensor, remote",
              "quantity": 1,
              "price": 599.00,
              "currency": "USD"
            }
          ],
          "address": {
            "street_1": "Pangani",
            "street_2": "",
            "city": "Menlo Park",
            "postal_code": "94025",
            "state": "CA",
            "country": "US"
          },
          "summary": {
            "subtotal": 698.99,
            "shipping_cost": 20.00,
            "total_tax": 57.67,
            "total_cost": 626.66
          },
          "adjustments": [{
              "name": "New Customer Discount",
              "amount": -50
            },
            {
              "name": "$100 Off Coupon",
              "amount": -100
            }
          ]


        };




        const options_1 = {
          typing: true
        };
        convo.sendTemplate(payload_1, options_1);

      //   convo.say(`Ok, here's what you told me about you:
      // - Name: ${convo.get('Size')}
      // - Favorite Food: ${convo.get('Quantity')}
      // `);
      //   askSize(convo);
      }
    }];

    const options = {
      typing: true
    };

    convo.ask(question, answer, payload, options);
    // convo.ask({
    //   text: `What size would you like?`,
    //   quickReplies: ['500g', '1Kg', '2Kg']
    // }, {
    //   text: `Ok ${payload.message.text}`
    // });
    // const text = payload.message.text;
    // convo.set('Size',text).then(() => askSize(convo));
    // convo.end();
  };

  const sendReceipt = (convo) => {

  }


  //   const question1 = {
  //     text: `What size would you like?`,
  //     quickReplies: ['500g', '1Kg', '2Kg']
  //   };
  //
  //   const answer1 = (payload, convo) => {
  //     const text = payload.message.text;
  //     convo.say(`Ok ${text} .`);
  //   };
  //
  // //   bot.hear('hello', (payload, chat) => {
  // //   chat.conversation((convo) => {
  // //     convo.sendTypingIndicator(1000).then(() => askName(convo));
  // //   });
  // // });
  //
  // const askName = (convo) => {
  //   convo.ask(`Hello! What's your name?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('name', text);
  //     convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
  //   });
  // };
  //
  // const askFavoriteFood = (convo) => {
  //   convo.ask(`What's your favorite food?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('food', text);
  //     convo.say(`Got it, your favorite food is ${text}`).then(() => askGender(convo));
  //   });
  // };

  // const askGender = (convo) => {
  //   convo.ask((convo) => {
  //     const buttons = [
  //       { type: 'postback', title: 'Male', payload: 'GENDER_MALE' },
  //       { type: 'postback', title: 'Female', payload: 'GENDER_FEMALE' },
  //       { type: 'postback', title: 'I don\'t wanna say', payload: 'GENDER_UNKNOWN' }
  //     ];
  //     convo.sendButtonTemplate(`Are you a boy or a girl?`, buttons);
  //   }, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('gender', text);
  //     convo.say(`Great, you are a ${text}`).then(() => askAge(convo));
  //   }, [
  //     {
  //       event: 'postback',
  //       callback: (payload, convo) => {
  //         convo.say('You clicked on a button').then(() => askAge(convo));
  //       }
  //     },
  //     {
  //       event: 'postback:GENDER_MALE',
  //       callback: (payload, convo) => {
  //         convo.say('You said you are a Male').then(() => askAge(convo));
  //       }
  //     },
  //     {
  //       event: 'quick_reply',
  //       callback: () => {}
  //     },
  //     {
  //       event: 'quick_reply:COLOR_BLUE',
  //       callback: () => {}
  //     },
  //     {
  //       pattern: ['yes', /yea(h)?/i, 'yup'],
  //       callback: () => {
  //         convo.say('You said YES!').then(() => askAge(convo));
  //       }
  //     }
  //   ]);
  // };

  // const askAge = (convo) => {
  //   convo.ask(`Final question. How old are you?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('age', text);
  //     convo.say(`That's great!`).then(() => {
  //       convo.say(`Ok, here's what you told me about you:
  //       - Name: ${convo.get('name')}
  //       - Favorite Food: ${convo.get('food')}
  //       - Gender: ${convo.get('gender')}
  //       - Age: ${convo.get('age')}
  //       `);
  //       convo.end();
  //     });
  //   });
  // };

  //   bot.hear('Cake', (payload, chat) => {
  //
  // });

  // bot.hear('Doughnut', (payload, chat) => {
  //
  // });

  // bot.on('postback:BLACKFOREST_PAYLOAD', (payload, chat) => {
  //   chat.say('You selected BlackForest',{typing: true});
  //   chat.conversation((convo) => {
  //     convo.sendTypingIndicator(1000).then(() => askQuantity(convo)).then(() => askSize(convo));
  //   });
  // });
  //
  // const askQuantity = (convo) => {
  //   convo.ask(question, answer)
  // };
  //
  // const question = {
  // 	text: `How many do you want?`,
  // 	quickReplies: ['1', '2', '3','4','5']
  // };
  //
  // const answer = (payload, convo) => {
  // 	const text = payload.message.text;
  // 	convo.say(`Ok ${text} of them.`);
  // };
  //
  // const askSize = (convo) => {
  //   convo.ask(question1, answer1);
  // };
  //
  // const question1 = {
  //   text: `What size would you like?`,
  //   quickReplies: ['500g', '1Kg', '2Kg']
  // };
  //
  // const answer1 = (payload, convo) => {
  //   const text = payload.message.text;
  //   convo.say(`Ok ${text} .`);
  // };

  // bot.hear('hello', (payload, chat) => {
  //   chat.conversation((convo) => {
  //     convo.sendTypingIndicator(1000).then(() => askName(convo));
  //   });
  // });

  // const askFavoriteFood = (convo) => {
  //   convo.ask(`What's your favorite food?`, (payload, convo, data) => {
  //     const text = payload.message.text;
  //     convo.set('food', text);
  //     convo.say(`Got it, your favorite food is ${text}`).then(() => askGender(convo));
  //   });
  // };
  //
  // chat.say(welcome, options)
  //   .then(() => chat.say({
  //     text: 'What would you like to order today?',
  //     quickReplies: ['Cake', 'Doughnut']
  //   }));

});
bot.start();
