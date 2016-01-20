var helpers = require('helpers'),
    trim = helpers.trim,
    Collections = require('collections'),
    Models = require('models'),
    dataLinesCollection = Collections.DataLines,
    FormGridView,
    FormBudgetView,
    Views;

FormBudgetView = Backbone.View.extend({
    tagName: 'form',
    className: 'form-inline',
    attributes: {
        id: 'form_data_budget'
    },
    events: {
        submit: function(data) {
            event.preventDefault();

            var title = trim(this.$el.find('input[name="title"]').val());
            var amount = trim(this.$el.find('input[name="amount"]').val());
            var percentage_max = trim(this.$el.find('input[name="percentage_max"]').val());;
            var date_start = trim(this.$el.find('input[name="date_start"]').val());;
            var date_end = trim(this.$el.find('input[name="date_end"]').val());;

            var budget = new Models.Budget({
                title: trim(title),
                amount: trim(amount),
                date_start: trim(date_start),
                date_end: trim(date_end)
            });

            if (!budget.isValid()) {
                alert(budget.validationError);
            }

            budget.save();
            this._clearForm();

        },
        reset: function() {
            this._clearForm();
        }
    },
    _clearForm: function() {
        this.el.reset();
        this.$el.find('input[name="title"]').focus();
    },

    model: null,
    template: _.template(['<div class="form-group">',
        ' <label for="title">Budget</label> <input type="text" name="title" id="title" class="form-control"/>',
        ' <label for="amount">montant</label> <input type="number" step="any" min="0" name="amount" class="form-control"/>',
        ' <label for="date_start">du </label> <input type="date" name="date_start" class="form-control"/>',
        ' <label for="date_end"> au </label> <input type="date" name="date_end" class="form-control"/>',
        '&nbsp;&nbsp;<input type="submit" value="ajouter" class="form-control"/>',
        '&nbsp;&nbsp;<input type="reset" value="annuler" class="form-control"/>',
        '</div>'
    ].join('')),
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

// views dataLines
FormDataLines = Backbone.View.extend({
    tagName: 'form',
    className: 'form-inline',
    attributes: {
        id: 'addSpendForm'
    },
    events: {
        submit: function() {
            var spend = new Models.Spend();
            var title = $.trim($(this.el).find('input[name="title"]').val());
            var tag = $.trim($(this.el).find('input[name="tag"]').val());
            var amount = $.trim($(this.el).find('input[name="amount"]').val());
            var type_line = $.trim($(this.el).find('input[name="type_line"]:checked').val());

            event.preventDefault();

            spend.set({
                title: title
            });

            spend.set({
                tag: tag
            });

            spend.set({
                amount: parseInt(amount, 10)
            });

            spend.set({
                type_line: type_line
            });

            if (!spend.isValid()) {
                alert(spend.validationError);
                return;
            }

            spend.save();

            dataLinesCollection.add(spend);

            this._clearForm();
        },
        reset: function() {
            this._clearForm();
        }
    },
    model: null,
    template: _.template(
        ['<div class="form-group">',
            ' <label for="title">Titre</label> <input type="text" name="title" id="title" class="form-control"/>',
            ' <label for="title">mot clé</label> <input type="text" name="tag" class="form-control"/>',
            ' <label for="amount">montant</label> <input type="number" step="any" min="0" name="amount" class="form-control"/>',
            ' <label>type</label>',
            ' <div class="btn-group" data-toggle="buttons" id="type_line">',
            ' <label class="btn btn-primary"><input type="radio" name="type_line" value="debit"> sortie</label>',
            ' <label class="btn btn-primary"><input type="radio" name="type_line" value="credit"> entrée</label></div>',
            '&nbsp;&nbsp;<input type="submit" value="ajouter" class="form-control"/>',
            '&nbsp;&nbsp;<input type="reset" value="annuler" class="form-control"/>',
            '</div>'
        ].join('')
    ),
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    _clearForm: function() {
        this.el.reset();
        $(this.el).find('#type_line label').each(function(curr) {
            $(this).removeClass('active');
        });

        this.$el.find('input[name="title"]').focus();
    }
});

GridView = Backbone.View.extend({
    tagName: 'table',
    events: {},
    render: function() {
        var items = [];
        this.collection.fetch();

        _.each(this.collection.models.reverse(), function(model) {
            items.push(new GridLineView({
                model: model
            }).render().el);
        });

        $(this.el).find('tbody').html(items.join(''));

        return this;
    },
    collection: dataLinesCollection,
    isrendered: false
});

GridLineView = Backbone.View.extend({
    tagName: 'tr',
    model: Models.Spend,
    events: {},
    template: _.template(
        ['<td><%= date_created %></td>',
            '<td><%= title %></td>',
            '<td><%= tag %></td>',
            '<td><%= amount %></td>',
            '<td>action</td>'
        ].join('')
    ),
    render: function() {
        this.el.className = (this.model.attributes.type_line == 'credit') ? 'success' : 'danger';
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

dataLinesCollection.on("add", function(spend) {
    var gridViewElement = $('tbody');
    $(gridViewElement).prepend(new GridLineView({
        model: spend
    }).render().el);
});

Views = {
    FormBudgetView: FormBudgetView,
    FormDataLines: FormDataLines,
    GridView: GridView
};

module.exports = Views;
