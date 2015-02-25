(function () {

App.DnaFeatureProperty = Ember.Model.extend({
	color: Ember.attr(),
	scale: Ember.attr(),
	symbol: Ember.belongsTo('App.DnaFeatureSymbol', { key: 'symbol', embedded: true })
});

})();