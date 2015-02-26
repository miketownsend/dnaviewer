// View Model for binding and persisting user interaction with this DnaFeature.
App.DnaFeatureMarkerViewModel = Ember.Object.extend({
	marker: null,
	isVisible: null,
	isHovered: null,
	isSelected: null,
	isFilteredOut: null,
	positionX: null,
	positionY: null,
	
	symbol: Ember.computed.alias('marker.dnafeature.category.properties.symbol.slug')
});