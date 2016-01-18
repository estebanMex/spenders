var Budget = Backbone.Model.extend({
    defaults: {
        title: '',
        date_created: function() {
            return moment().format('YYYY-MM-D HH:MM:SS');
        }(),
        amount: 0,
        percentage_max: 0,
        date_start: '',
        date_end: '',
    },
    url: '../../back/api/api.php/budgets/',
    validate: function(attrs, options) {
        var errors = []
    
        if (errors.length > 0) {
            return errors.join("\n");
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
    url: '../../back/api/api.php/datalines/',
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
            return errors.join("\n");
        }
    }
});


var Models = {
    DataLine: DataLine,
    Budget: Budget
};

module.exports = Models;
