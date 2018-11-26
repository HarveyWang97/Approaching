const mandrill = require('node-mandrill')('FGkuN54CdMt7xCvkJzH54g');

//send an e-mail to jim rubenstein
mandrill('/messages/send', {
    message: {
        to: [{email: 'git@jimsc.com', name: 'Jim Rubenstein'}],
        from_email: 'you@domain.com',
        subject: "Hey, what's up?",
        text: "Hello, I sent this message using mandrill."
    }
}, function(error, response) {
    if (error) console.log( JSON.stringify(error) );
    else console.log(response);
});