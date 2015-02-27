App.PlasmidDiagramController = Ember.ObjectController.extend({
	needs: ["dna-inspector"],
	selectedFeature: Ember.computed.alias('controllers.dna-inspector.selectedViewModel'),
	featureViewModels: Ember.computed.alias('controllers.dna-inspector.featureViewModels'),
	dnamolecule: Ember.computed.alias('controllers.dna-inspector.model'),
});