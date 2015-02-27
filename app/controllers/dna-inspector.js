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
		var self = this;
		var filter = this.get('filter');
		var features = this.get('featureViewModels');

		features.forEach(function (feature) {
			if( !filter ) feature.set('isVisible', true);
			var name = feature.get('marker.dnafeature.name').toLowerCase();
			var isFiltered = name.indexOf(filter.toLowerCase()) != -1;
			feature.set('isVisible', isFiltered);
			if( feature.get('isSelected') && !isFiltered ) self.toggleSelectionFor();
		});

		// Select single feature if its the only one visible.
		var visibleFeatures = features.filterProperty('isVisible');
		if( visibleFeatures && visibleFeatures.get('length') == 1 ) {
			var featureToSelect = visibleFeatures.objectAt(0);
			if( !featureToSelect.get('isSelected') ) this.toggleSelectionFor(featureToSelect);
		}

		// If the user has cleared the filter, deselect any selected features.
		if( !filter ) {
			this.toggleSelectionFor();
		}
	}.observes('filter'),

	// Manage the selected element
	toggleSelectionFor: function (feature) {	
			// Deselect feature if it is already selected
			if(feature && feature.get('isSelected')) {
				feature.set('isSelected', false);
				this.set('selectedViewModel', undefined);
				return;
			}

			// Deselect existing selected feature.
			var selectedFeature = this.get('selectedViewModel');
			if( selectedFeature ) selectedFeature.set('isSelected', false);

			// Select feature if it is not selected already.
			if( feature ) feature.set('isSelected', true);
			this.set('selectedViewModel', feature);
	},

	actions: {
		// Deselect the existing selected feature and select the new feature.
		toggleSelectionFor: function (featureViewModel) {
			this.toggleSelectionFor(featureViewModel);
		}
	}
});