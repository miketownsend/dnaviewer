App.HomeController = Ember.ObjectController.extend({
	featureViewModels: function () {
		var features = this.get('model.dnafeatures');
		var viewModels = features.map(function (feature) {
			return App.DnaFeatureMarkerViewModel.create({
				marker: feature,
				visible: true
			});
		});

		return viewModels;
	}.property('model.dnafeatures.@each')
});