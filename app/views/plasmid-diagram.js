(function () {

var accessor = function (path) { return function(d) { return d.get(path); }; };

App.PlasmidDiagramView = Ember.View.extend({
	pathManager: Ember.computed.alias('controller.plasmidDiagramViewModel'),
	molecule: Ember.computed.alias('controller.molecule'),
	features: Ember.computed.alias('controller.featureViewModels'),

	// This flag is used to stop observes trying to affect the DOM
	// before the view is injected into the DOM.
	hasSetupD3: false, 

	// Setup the d3 diagram when the element is injected into the dom.
	didInsertElement: function () {
		$(window).resize($.proxy(this.updateDiagram, this));
		this.setupDiagram();
		this.updateDiagram();
	},

	// If the features data set changes, rerun setupDiagram to reattach 
	// data to the d3 model.
	onDataChange: function () {
		if( !this.get('hasSetupD3') ) return;
		Ember.run.scheduleOnce("afterRender", this, this.setupDiagram);
	}.property('features.@each'),

	// Setups the d3 diagram.
	// Caches the selections and attaches data to the elements.
	setupDiagram: function () {
		this.setupFeatures();
		this.set('hasSetupD3', true);
	},

	// Updates the d3 diagram.
	updateDiagram: function () {
		this.updateSize();
		this.updateFeatures();
		this.updateBackground();
	},

	// Updates the background path.
	updateBackground: function () {
		var pathManager = this.get('pathManager');
		d3.select('path')
			.attr('d', pathManager.generateBackgroundPath());
	},

	// Updates the height and width of the path manager so that 
	// it can update the size of the 
	updateSize: function () {
		var svg = $('svg');
		var pathManager = this.get('pathManager');
		pathManager.setProperties({
			height: svg.innerHeight(),
			width: svg.innerWidth()
		});
	},

	// Sets up feature elements for the d3 diagram.
	setupFeatures: function () {
		var features = this.get('features');

		var featureGroups = d3.select('g.features').selectAll('g')
			.data(features.toArray());

		var enteredGroups = featureGroups.enter()
			.append('g');

		enteredGroups.append('image')
			.attr('class','symbol');
		enteredGroups.append('circle');

		this.set('featureGroups', featureGroups);
	},

	// Updates existing feature elements in the d3 diagram.
	updateFeatures: function () {
		if( !this.get('hasSetupD3') ) return;
		var symbolService = this.get('symbolService');
		var pathManager = this.get('pathManager');
		var features = this.get('features');
		pathManager.setPositionFor(features);

		var featureGroups = this.get('featureGroups');
		featureGroups
			.style('visibility', function(d) { 
				return d.get('isVisible') ? "visible" : "hidden";
			});
			
		featureGroups.select('circle')
			.attr('r', 5)
			.attr('cx', function (d) { return d.get('positionX'); })
			.attr('cy', function (d) { return d.get('positionY'); })
			.style('fill', function (d) {
				return d.get('isSelected') ? 'red' : 'black';
			});

		featureGroups.select('image')
			.attr('width', '50')
			.attr('height', '100')
			.attr('x', accessor('positionX'))
			.attr('y', accessor('positionY'))
			.attr('xlink:href', function(d) { 
				return symbolService.getHref(d.get('symbol'));
			})
			.attr('transform', function (d) {
				return symbolService.getTransform(d.get('symbol'));
			});
	}.observes(
		'features.@each.isSelected',
		'features.@each.isVisible',
		'width'
	)
});

})();