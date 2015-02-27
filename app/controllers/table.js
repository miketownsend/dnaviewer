App.TableController = Ember.ArrayController.extend({
	needs: ['dna-inspector'],
	filter: Ember.computed.alias('controllers.dna-inspector.filter'),
	sortAscending: true,
	sortProperties: ["marker.start"]
});