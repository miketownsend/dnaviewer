(function () {

App.DnaFeatureCategory = Ember.Model.extend({
	id: Ember.attr(),
	name: Ember.attr(),
	properties: Ember.belongsTo('App.DnaFeatureProperty', { key: 'properties', embedded: true }),
});

})();