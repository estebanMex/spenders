"use strict";

var Views = require('views'),
    Collections = require('collections'),
    budgetsView = $('.budgets'),
    dataLinesFormView = $('.dataLinesForm'),
    spendsCollection = Collections.DataLines;

var App = {
    init: function init() {

        var FormBudgetView = new Views.FormBudgetView(),
            formDataLines = new Views.FormDataLines(),
            gridView = new Views.GridView();

        budgetsView.append(FormBudgetView.render().el);
        dataLinesFormView.append(formDataLines.render().el, gridView.render().el);

    }
};

module.exports = App;
