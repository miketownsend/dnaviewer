(function () {

App.DnaFeatureMarker = Ember.Model.extend({
	dnafeature: Ember.belongsTo('App.DnaFeature', { key: 'dnafeature', embedded: true }),
	start: Ember.attr(),
	end: Ember.attr(),
	strand: Ember.attr(),
	dnafeatureId: Ember.attr(),
	dnamoleculeId: Ember.attr(),
});

})();