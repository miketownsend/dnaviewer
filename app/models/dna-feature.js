(function () {

App.DnaFeature = Ember.Model.extend({
	id: Ember.attr(),
	name: Ember.attr(),
	length: Ember.attr(),
	category: Ember.belongsTo('App.DnaFeatureCategory', { key: 'category', embedded: true }),
	pattern: Ember.belongsTo('App.DnaFeaturePattern', { key: 'pattern', embedded: true })
});

})();