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

    model: new Models.Budget(),
    template: helpers.template('form-budget'),
    render: function() {
        this.$el.html(this.template(this.model.attributes));
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
            event.preventDefault();

            var spend = new Models.DataLine();
            var title = $.trim($(this.el).find('input[name="title"]').val());
            var tag = $.trim($(this.el).find('input[name="tag"]').val());
            var amount = $.trim($(this.el).find('input[name="amount"]').val());
            var type_line = $.trim($(this.el).find('input[name="type_line"]:checked').val());

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
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    model: new Models.DataLine,
    template: helpers.template('form-data-lines'),
    render: function() {
        this.$el.html(this.template(this.model.attributes));
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
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    tagName: 'tr',
    model: new Models.DataLine,
    events: {
        'click a[data-action="remove"]': function() {
            this.model.destroy();
        },
        'click a[data-action="update"]': function() {
            var root = $('#form-update-data-line'),
                id = $(root).find('input[name="id"]'),
                title = $(root).find('input[name="title"]'),
                amount = $(root).find('input[name="amount"]'),
                tag = $(root).find('input[name="tag"]'),
                type_line = $(root).find('input[value="' + this.model.get('type_line') + '"]');

            $(id).val(this.model.get('id'));
            $(title).val(this.model.get('title'));
            $(amount).val(this.model.get('amount'));
            $(tag).val(this.model.get('tag'));
            $(type_line).parent('label').addClass('active');
        }
    },
    template: helpers.template('line-grid'),
    render: function() {
        this.el.className = (this.model.attributes.type_line == 'credit') ? 'success' : 'danger';
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    _setFormToUpdate: function(modelToUpdate) {
        console.log(modelToUpdate);
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
