const Buffer = require('buffer/').Buffer;

const fitbitOAuthUri = "https://www.fitbit.com/oauth2/authorize";
const redirect_uri = "edu.nus.com.empower://oauth2-callback/fitbit";
const client_id = "22BV5Z" //"22BVZ4";
const oAuthClientSecret = "b175b181d985d9224c8b08bd7989a0a4"//"81a05f0d421e7498f848bbb2ca11ad3b";
const scope = "activity heartrate location nutrition profile weight settings sleep social";

function base64URLEncode(buff) {
    return buff.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

const fitbitTokenUri = 'https://api.fitbit.com/oauth2/token';
const authorisationHeader = base64URLEncode(Buffer.from(client_id + ":" + oAuthClientSecret, 'utf8'));

export {fitbitOAuthUri, redirect_uri, client_id, oAuthClientSecret, scope, fitbitTokenUri, authorisationHeader, base64URLEncode};