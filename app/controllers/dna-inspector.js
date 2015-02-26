App.DnaInspectorController = Ember.ObjectController.extend({

	filter: null,
	selectedViewModel: null,

	// Setup view models which will allow metadata regarding how the feature is being
	// viewed and interacted with to be shared between the table and diagram.
	featureViewModels: function () {
		var features = this.get('model.dnafeatures');
		var viewModels = features.map(function (feature) {
			return App.DnaFeatureMarkerViewModel.create({
				marker: feature,
				isVisible: true,
				isSelected: false,
			});
		});

		return viewModels;
	}.property('model.dnafeatures.@each'),

	// Checks features against the filter and toggles the visibility of the view
	// model if the feature if the filter doesnt match.
	filterViewModels: function () {
		var filter = this.get('filter');
		var features = this.get('featureViewModels');

		features.forEach(function (featureViewModel) {
			if( !filter ) featureViewModel.set('isVisible', true);
			var name = featureViewModel.get('marker.dnafeature.name').toLowerCase();
			featureViewModel.set('isVisible', name.indexOf(filter.toLowerCase()) != -1);
		});
	}.observes('filter'),

	actions: {
		// Deselect the existing selected feature and select the new feature.
		selectFeature: function (featureViewModel, ctrlSelected) {
			if( featureViewModel.get('isSelected') ) {
				featureViewModel.set('isSelected', false);
				this.set('selectedViewModel', undefined);
				return;
			}

			var selectedFeature = this.get('selectedViewModel');
			if( selectedFeature ) selectedFeature.set('isSelected', false);
			featureViewModel.set('isSelected', true);
			this.set('selectedViewModel', featureViewModel);
		}
	}
});