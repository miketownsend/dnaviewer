App.FeatureController = Ember.ObjectController.extend({
	actions: {
		toggleVisibility: function () {
			this.toggleProperty('isVisible');
		},
		toggleSelection: function () {
			this.toggleProperty('isSelected');
		}
	}
});