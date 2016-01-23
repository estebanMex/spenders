function trim(data) {
    return $.trim(data);
}

function template(templateName){
    return _.template(document.querySelector("#"+templateName).innerHTML);
}

function firstAndLastDateOfCurrentMonth() {
        var objDate = moment(),
            firstDay = '01',
            lastDay = (objDate.daysInMonth() < 10) ? '0'+ objDate.daysInMonth() : objDate.daysInMonth(),
            month = (objDate.month() + 1 < 10) ? '0' + (objDate.month() + 1) : objDate.month() + 1,
            year = objDate.year();
        return {
            date_start: [year, month, firstDay].join('-'),
            date_end: [year, month, lastDay].join('-')
        }
    };

Helpers = {
	trim:trim,
    template:template,
	firstAndLastDateOfCurrentMonth : firstAndLastDateOfCurrentMonth
};

module.exports = Helpers;