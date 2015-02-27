(function () {

var accessor = function (path) { return function(d) { return d.get(path); }; };

App.PlasmidDiagramView = Ember.View.extend({
	dnamolecule: Ember.computed.alias('controller.dnamolecule'),
	features: Ember.computed.alias('controller.featureViewModels'),

	pathManager: function () {
		return App.PlasmidDiagramViewModel.create({
			dnamolecule: this.get('dnamolecule')
		});
	}.property(),

	// This flag is used to stop observes trying to affect the DOM
	// before the view is injected into the DOM.
	isReadyForObservers: false, 

	// Setup the d3 diagram when the element is injected into the dom.
	didInsertElement: function () {
		$(window).resize($.proxy(this.updateDiagram, this));
		this.setupDiagram();
		this.updateDiagram();
	},

	// If the features data set changes, rerun setupDiagram to reattach 
	// data to the d3 model.
	onDataChange: function () {
		if( !this.get('isReadyForObservers') ) return;
		Ember.run.scheduleOnce("afterRender", this, this.setupDiagram);
	}.property('features.@each'),

	// Setups the d3 diagram.
	// Caches the selections and attaches data to the elements.
	setupDiagram: function () {
		this.setupFeatures();
		this.setupZoom();
		this.set('isReadyForObservers', true);
	},

	// Updates the d3 diagram.
	updateDiagram: function () {
		this.updateSize();
		this.updateBackground();
		this.updateFeatures();
		this.updateZoom();
	},

	// Sets up a d3 selection for updating the Zoom when a feature is selected.
	setupZoom: function () {
		var manager = this.get('pathManager');
		var zoomGroup = d3.select('svg g.zoom');
		zoomGroup.datum(manager);
		this.set('zoomGroup', zoomGroup);
	},

	// Updates the zoom data and the attributes on the zoom group element.
	updateZoom: function () {
		if( !this.get('isReadyForObservers')) return;

		var selected = this.get('controller.selectedFeature');
		var manager = this.get('pathManager');
		manager.updateZoom(selected);

		var transform = "scale(%@, %@) translate(%@, %@)";
		this.get('zoomGroup')
			.transition()
				.duration(250)
				.ease("out-in")
			.attrTween('transform', function (d, i, old_transform) {
				var new_transform = transform.fmt(d.get('scale_x'), d.get('scale_y'), d.get('translate_x'), d.get('translate_y'));
				return d3.interpolateString(old_transform, new_transform);
			});
	}.observes('controller.selectedFeature'),

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
	// The features content could be extracted into a mixin or reopened on another page.
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
		if( !this.get('isReadyForObservers') ) return;
		
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