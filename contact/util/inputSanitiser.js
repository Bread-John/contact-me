module.exports = {
    sanitiseSpecialChar: function (values) {
        const charMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;'
        };
        
        function escapeChar (value) {
            return String(value).replace(/[&<>"'`\/]/g, (s) => charMap[s]);
        }

        const sanitisedValues = {};
        for (const [key, value] of Object.entries(values)) {
            sanitisedValues[`${key}`] = escapeChar(value);
        }

        return sanitisedValues;
    }
}
