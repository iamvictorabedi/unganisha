// @flow
'use strict';

// const BootBot = require('bootbot');
const BootBot = require('./lib/BootBot');
const config = require('config');
const echoModule = require('./examples/modules/echo');
const helpModule = require('./examples/modules/help');
const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.hear(['OneTime','911', /hey( there)?/i], (payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  const options = {
    typing: true
  };
  chat.getUserProfile().then((user) => {
    chat.say(`Take a breath and relax `)
    .then(() => chat.say({
      text: 'How can i help?',
      quickReplies: ['My Savings', 'Request Ambulance',"Daily HealthVibes"]
    }));
});
});


bot.hear(['help'], (payload, chat) => {
  // Send a text message with buttons
  chat.say({
      text: 'What do you need help with?',
      buttons: [
          { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
          { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
          { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
      ]
  });
  
});
bot.hear(['hello','niaje','sasa', 'hi', /hey( there)?/i], (payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  const options = {
    typing: true
  };
  chat.getUserProfile().then((user) => {
    chat.say(`Hi, ${user.first_name}! Nice to see you here.`
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
    chat.say(`Hi, ${user.first_name}! Nice to see you here.`
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
    chat.say('Select One', {
      typing: true
    }).then(() => chat.sendListTemplate([{
      "title": "AAR HEALTHCARE",
      "image_url": "http://www.aar-healthcare.com/ke/wp-content/uploads/2017/02/ambul.jpg",
      "subtitle": "Emergency Rescue Services was started in 1984 as Africa Air Rescue. Since then, additional services have added to provide holistic health care provision resulting to Health Centers and the insurance company. Today, AAR Healthcare is in all the East Africa countries, providing not only emergency rescue services but Outpatient and medical insurance. ",
      "buttons": [{
        "title": "REQUEST AAR",
        "type": "postback",
        "payload": "ARR_PAYLOAD"
      }]
    },
    {
      "title": "KENYA REDCROSS",
      "image_url": "https://pbs.twimg.com/media/BD9xbP1CcAASh82.jpg",
      "subtitle": "Emergency Plus Medical Services (E-Plus)) is a private commercial company, fully owned by the Kenya Red Cross Society, whose core business is the provision of professional advanced pre-hospital medical care and ambulance services in Kenya ",
      "buttons": [{
        "title": "REQUEST KENYA REDCROSS",
        "type": "postback",
        "payload": "KR_PAYLOAD"
      }]
    },
    {
      "title": "ST JOHNS AMBULANCE ",
      "image_url": "https://static2.stuff.co.nz/1301346314/809/4820809.jpg",
      "subtitle": "St John Ambulance is available round the clock, 24/7 for casualties in need of critical evacuation during emergencies and disasters. We also provide hospital ambulance transfers and standby ambulance and paramedics and first aiders at events",
      "buttons": [{
        "title": "REQUEST ST JOHNS AMBULANCE",
        "type": "postback",
        "payload": "STJ_PAYLOAD"
      }]
    },
    {
      "title": "AMREF KENYA ",
      "image_url": "https://pbs.twimg.com/profile_images/933412079339372544/xvrtDYtH_400x400.jpg",
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
  }], options));

  }else{

  }


});
bot.on('postback:AMREF_PAYLOAD', (payload, chat) => {
  const options = {
    typing: true
  };
  chat.getUserProfile().then((user) => {
    chat.say(`Welcome, ${user.first_name} to the Amref Ambulance Kenya emergency unit. HealthCare Ke assistant will help you request for an emergency ride? But first we have to understand you emergency before we depatch our ambulance to you location. `
    ,options).then(() => chat.say({
      text: 'please try out these question. you can also send a voice note. Good Luck!!',
      quickReplies: ['Answer Question', 'Cancel']
    }));
  });
});

bot.on('message', (payload, chat) => {
const text = payload.message.text;
const options = {
  typing: true
};
if(text == 'Answer Question'){
  chat.conversation(convo => {
    convo.ask(`Whats Your emergency`, (payload, convo, data) => {
      convo.say(`Ok`).then(() => askDuration(convo));

    });
  });
  const askDuration = (convo) => {
    convo.ask(`How long has these being happening`, (payload, convo, data) => {
      convo.say(`Got it`).then(() => askPeriod(convo));
    });
  };
  const askPeriod = (convo) => {
    convo.ask(`How has you body being behaving in the last 30min( Estimated time, You can skip these)`, (payload, convo, data) => {
      convo.say(`Thanks for your responce`).then(() => getLocation(convo));
    });
  };
  const getLocation = (convo) => {
         const options = {
        typing: true
      };
      chat.getUserProfile().then((user) => {
        chat.say(``
        ,options).then(() => chat.say({
          text: 'Press button to share your location',
          quickReplies: ['Share Location'],
          
        }));
      });
      

  }
  bot.on('message', (payload, chat) => {
    const text = payload.message.text;
    console.log(`The user said: ${text}`);
  
    const options = {
      typing: true
    };
  
    if (text == 'Share Location') {
      chat.say('Dispatch Request Submitted', {
        typing: true
      }).then(() => chat.say({
        text: 'Your request has being approved',
        image_url : 'https://scontent.fnbo3-1.fna.fbcdn.net/v/t34.18173-12/18601594_1506223109443496_153865763_n.gif?_nc_cat=0&fallback=1&oh=776b344aabe29d365e340361f944b7e3&oe=5B5ACBC4',
      })
    )}
    else{

    }
  })
}

  else{

}
});
bot.start();
module.exports = () => 'Ahoy, world!'
