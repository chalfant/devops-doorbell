'use strict';

const ACCOUNT_SID = process.env.twilio_account_sid;
const AUTH_TOKEN  = process.env.twilio_auth_token;
const TO          = process.env.to_phone;
const FROM        = process.env.from_phone;
const MESSAGE     = process.env.message;

var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
module.exports.button = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    var numbers = TO.split(" ");
    var errors = [];
    var messages = [];
    for (var i=0; i < numbers.length; i++) {
        client.messages.create({
           to: numbers[i],
           from: FROM,
           body: MESSAGE,
        },
        function (err, message) {
            if (err) {
                console.log(err)
                errors.push(err);
            } else {
                console.log(message);
                messages.push(message);
            }
        });
    }

    if (errors.length > 0) {
        return callback(errors);
    }
    return callback(null, messages);
};
