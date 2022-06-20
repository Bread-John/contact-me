const validate = require('validate.js');

module.exports = {
    validateContactForm: function (values) {
        const constraints = {
            name: {
                presence: { allowEmpty: false },
                length: { maximum: 40 },
                format: {
                    pattern: "[a-zA-Z ]+",
                    message: "can only contain letters and spaces"
                }
            },
            email: {
                presence: { allowEmpty: false },
                email: true
            },
            subject: {
                presence: { allowEmpty: false },
                length: { maximum: 50 }
            },
            msg: {
                presence: { allowEmpty: false },
                length: { maximum: 800 }
            }
        };

        return validate(values, constraints);
    }
}
