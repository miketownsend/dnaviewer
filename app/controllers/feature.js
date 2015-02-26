App.FeatureController = Ember.ObjectController.extend({
	needs: ["dna-inspector"],
	actions: {
		toggleVisibility: function () {
			this.toggleProperty('isVisible');
		},
		toggleSelection: function () {
			var dnaInspectorController = this.get('controllers.dna-inspector');
			dnaInspectorController.send('selectFeature', this.get('model'), false);
		}
	}
});