// View Model for binding and persisting user interaction with this DnaFeature.
App.DnaFeatureMarkerViewModel = Ember.Object.extend({
	// Stores the model
	marker: null,

	// Managed by dna-inspector controller
	isVisible: null,
	isSelected: null,
	
	// Used to store rendering data by the plasmid-diagram-view so that this 
	// data can be used by different d3 mandaged elements.
	isTop: null,
	positionX: null,
	positionY: null,
	labelPositionX: null,
	labelPositionY: null,

	// Symbol name, should be replaced by a class representing the symbol
	symbol: Ember.computed.alias('marker.dnafeature.category.properties.symbol.slug')
});