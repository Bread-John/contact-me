const msal = require('@azure/msal-node');
const fetch = require('node-fetch');

module.exports = async function (values) {
    return new Promise(async function (resolve, reject) {
        const clientId = process.env['CLIENT_ID'];
        const clientSecret = process.env['CLIENT_SECRET'];
        const tenantId = process.env['TENANT_ID'];

        const senderAddr = process.env['SENDER_EMAIL_ADDR'];
        const recipientAddr = process.env['RECIPIENT_EMAIL_ADDR'];

        const mail = {
            subject: `[Contact Me] A Message from ${values.name}`,
            body: {
                content: `<hr><h3>INCOMING MESSAGE</h3><h5>Name: ${values.name}</h5><h5>Email Address: ${values.email}</h5><hr><h2>${values.subject}</h2><p style="white-space:pre">${values.msg}</p>`,
                contentType: 'HTML'
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: recipientAddr,
                    },
                }
            ]
        };

        const msalConf = {
            auth: {
                clientId: clientId,
                clientSecret: clientSecret,
                authority: `https://login.microsoftonline.com/${tenantId}`
            },
        };

        const tokenReq = {
            scopes: ['https://graph.microsoft.com/.default']
        };

        const cca = new msal.ConfidentialClientApplication(msalConf);
        const tokens = await cca.acquireTokenByClientCredential(tokenReq);

        const headers = new fetch.Headers();
        headers.append('Authorization', `Bearer ${tokens.accessToken}`);
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ message: mail }),
        };

        try {
            const response = await fetch(`https://graph.microsoft.com/v1.0/users/${senderAddr}/sendMail`, options);

            if (response.ok) {
                resolve(response);
            } else {
                throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            reject(error);
        }
    });
};
