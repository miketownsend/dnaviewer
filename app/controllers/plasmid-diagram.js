App.PlasmidDiagramController = Ember.ObjectController.extend({
	needs: ["dna-inspector"],
	
	selectedFeature: Ember.computed.alias('controllers.dna-inspector.selectedViewModel'),
	featureViewModels: Ember.computed.alias('controllers.dna-inspector.featureViewModels'),
	dnamolecule: Ember.computed.alias('controllers.dna-inspector.model'),

	actions: {
		toggleSelection: function (feature) {
			var dnaInspectorController = this.get('controllers.dna-inspector');
			dnaInspectorController.send('toggleSelectionFor', feature, false);
		}	
	}
});