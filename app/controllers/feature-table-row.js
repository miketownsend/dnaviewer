App.FeatureTableRowController = App.FeatureController.extend({
	needs: ["home"],
	actions: {
		toggleVisibility: function () {
			this.toggleProperty('isVisible');
		},
		toggleSelection: function () {
			var homeController = this.get('controllers.home');
			homeController.send('selectFeature', this.get('model'), false);
		}
	}
});