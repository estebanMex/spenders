var helpers = require('helpers');

var Budget = Backbone.Model.extend({
    defaults: {
        title: '',
        date_created: function() {
            return moment().format('YYYY-MM-D HH:MM:SS');
        }(),
        amount: 0
    },
    initialize: function() {
        var firstAndLastDate = helpers.firstAndLastDateOfCurrentMonth();

        this.set('date_start', firstAndLastDate['date_start']);
        this.set('date_end', firstAndLastDate['date_end']);

    },
    url: '../../back/api/api.php/budgets/',
    validate: function(attrs, options) {
        var errors = [];

        if (!attrs.title) {
            errors.push('Le champ titre du budget est obligatoire');
        }

        if (!attrs.amount) {
            errors.push('Le champ montant est obligatoire');
        }

        if (errors.length > 0) {
            return errors.join("\n\n");
        }
    }
});

var DataLine = Backbone.Model.extend({
    defaults: {
        title: '',
        date_created: function() {
            return moment().format('YYYY-MM-D HH:MM:SS');
        }(),
        type_line: '',
        amount: 0,
        tag: ''
    },
    url: '../../back/api/api.php/datalines',
    initialize: function() {
        this.id = this.get('cid');
    },
    validate: function(attrs, options) {
        var errors = []
        if (!attrs.title && !attrs.amount && !attrs.type_line) {
            errors.push("les champs titre, montant et type sont obligatoires");
        } else {

            if (!attrs.title) {
                errors.push("le champ titre est obligatoire");
            }

            if (!attrs.amount) {
                errors.push("le champ montant est obligatoire et doit être superieur à 0");
            }

            if (!attrs.type_line) {
                errors.push("le champ type est obligatoire pour definir s'il s'agit d'une entrée ou sortie");
            }
        }

        if (errors.length > 0) {
            return errors.join("\n\n");
        }
    }
});

var DataBilanBudget = Backbone.Model.extend({
    defaults: {
        entries: 0,
        outputs: 0,
        statuts: 'warm'
    },
    urlRoot: '/back/api/api.php/custom_currents_totals/',
    initialize: function() {}
});

var Models = {
    DataLine: DataLine,
    DataBilanBudget: DataBilanBudget,
    Budget: Budget
};

module.exports = Models;
