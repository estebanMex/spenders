var Models = require('models');

var DataLines = Backbone.Collection.extend({
	model: Models.DataLine,
	url: '../../back/api/api.php/datalines/'
});

var Collections = {
	DataLines : new DataLines()
};

module.exports = Collections;