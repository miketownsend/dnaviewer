App.FeatureTableRowController = App.FeatureController.extend({
	needs: ["dna-inspector"],
	actions: {
		toggleVisibility: function () {
			this.toggleProperty('isVisible');
		},
		toggleSelection: function () {
			var dnaInspectorController = this.get('controllers.home');
			dnaInspectorController.send('selectFeature', this.get('model'), false);
		}
	}
});