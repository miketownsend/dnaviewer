(function () {

App.DnaMolecule = Ember.Model.extend({
	id: Ember.attr(),
	name: Ember.attr(),
	length: Ember.attr(),
	dnafeatures: Ember.hasMany('App.DnaFeatureMarker', { key: 'dnafeatures', embedded: true }),
	sequence: Ember.belongsTo('App.DnaSequence', { key: 'sequence'})
});

App.DnaMolecule.adapter = Ember.FixtureAdapter.create();

})();