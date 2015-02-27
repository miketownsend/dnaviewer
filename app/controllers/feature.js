// Feature Controller can be extended for controllers working with features.
App.FeatureController = Ember.ObjectController.extend({
	needs: ["dna-inspector"],
	actions: {
		toggleVisibility: function () {
			this.toggleProperty('isVisible');
		},
		toggleSelection: function () {
			var dnaInspectorController = this.get('controllers.dna-inspector');
			dnaInspectorController.send('toggleSelectionFor', this.get('model'), false);
		}
	}
});