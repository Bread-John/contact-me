const { validateContactForm } = require('./util/inputValidator');
const { sanitiseSpecialChar } = require('./util/inputSanitiser');
const sendMail = require('./util/graphAPI/sendMail');

module.exports = async function (context, req) {
    try {
        if (req.body) {
            const validationFaults = validateContactForm(req.body);
            if (validationFaults) {
                context.res = {
                    status: 400,
                    body: JSON.stringify({
                        msg: '',
                        err: 'Malformed request'
                    }),
                    contentType: 'application/json'
                };
            } else {
                const cleanValues = sanitiseSpecialChar(req.body);

                await sendMail(cleanValues)
                    .then(function (response) {
                        context.res = {
                            status: response.status || 200,
                            body: JSON.stringify({
                                msg: 'Your message has been sent',
                                err: ''
                            }),
                            contentType: 'application/json'
                        };
                    })
                    .catch(function(error) {
                        throw error;
                    });
            }
        } else {
            context.res = {
                status: 400,
                body: JSON.stringify({
                    msg: '',
                    err: 'Bad request'
                }),
                contentType: 'application/json'
            };
        }
    } catch (err) {
        context.res = {
            status: err.status || 500,
            body: JSON.stringify({
                msg: '',
                err: 'Something went wrong'
            }),
            contentType: 'application/json'
        };
    }
};
