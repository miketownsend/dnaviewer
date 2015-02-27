(function () {

// D3 Helpers
// Should be generalised for use in multiple views.
var accessor = function (path) { return function(d) { return d.get(path); }; };
var translate = function (x,y) { return function (d) { return "translate(%@,%@) ".fmt( d.get(x) || 0 , d.get(y) || 0 ); }; };
var scale = function (x,y) { return function (d) { return "scale(%@,%@) ".fmt(d.get(x) || 1,d.get(y) || 1) }; };

App.PlasmidDiagramView = Ember.View.extend({
	dnamolecule: Ember.computed.alias('controller.dnamolecule'),
	features: Ember.computed.alias('controller.featureViewModels'),

	// Layout manager contains dimensions + helpers for determining the 
	// layout of different elements of the diagram.
	layoutManager: function () {
		return App.PlasmidDiagramViewModel.create({
			dnamolecule: this.get('dnamolecule'),
			features: this.get('features')
		});
	}.property(),

	// This flag is used to stop observes trying to affect the DOM
	// before the view is injected into the DOM.
	isReadyForObservers: false, 

	// Setup the d3 diagram when the element is injected into the dom.
	didInsertElement: function () {
		// Get d3 selection scoped to the view.
		var d3view = d3.select("#" + this.get('elementId'));
		this.set('_d3view', d3view);

		$(window).resize($.proxy(this.updateDiagram, this));
		this.setupDiagram();
		this.updateDiagram();
	},

	// Ease of access helper for scoping selections to this view.
	_d3view: null,
	d3: function () {
		return this.get('_d3view');
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
	
	// Updates the height and width of the path manager so that 
	// it can update the size of the 
	updateSize: function () {
		var svg = $('#' + this.get('elementId') + ' svg');
		var layoutManager = this.get('layoutManager');
		layoutManager.setProperties({
			height: svg.innerHeight(),
			width: svg.innerWidth()
		});
	},

	// Sets up a d3 selection for updating the Zoom when a feature is selected.
	setupZoom: function () {
		var manager = this.get('layoutManager');
		var zoomGroup = this.d3().select('svg g.zoom');
		zoomGroup.datum(manager);
		this.set('zoomGroup', zoomGroup);
	},

	// Updates the zoom data and the attributes on the zoom group element.
	updateZoom: function () {
		if( !this.get('isReadyForObservers')) return;

		var selected = this.get('controller.selectedFeature');
		var manager = this.get('layoutManager');
		manager.updateZoom(selected);

		this.get('zoomGroup')
			.transition()
				.duration(250)
				.ease("out-in")
			.attrTween('transform', function (d, i, old_transform) {
				var new_transform = scale('scale_x', 'scale_y')(d) + translate('translate_x', 'translate_y')(d);
				return d3.interpolateString(old_transform, new_transform);
			});
	}.observes('controller.selectedFeature'),

	// Updates the background path.
	updateBackground: function () {
		var layoutManager = this.get('layoutManager');
		this.d3().select('path')
			.attr('d', layoutManager.generateBackgroundPath());
	},

	// Sets up feature elements for the d3 diagram.
	// The features content could be extracted into a mixin or reopened on another page.
	setupFeatures: function () {
		var features = this.get('features');
		var controller = this.get('controller');

		// Ideally we should scope all the selectors to the view.
		var featureGroups = this.d3().select('g.features').selectAll('g')
			.data(features.toArray());

		var enteredGroups = featureGroups.enter()
			.append('g');

		enteredGroups.append('image').attr('class','symbol');
		enteredGroups.append('circle');
		enteredGroups.append('text').attr('class', 'name');

		// Select the feature by clicking on one of the features elements.
		var clickableElements = featureGroups.selectAll('image, text, circle');
		clickableElements.on('click', function (d) {
			controller.send("toggleSelection", d);
			d3.event.preventDefault();
		});

		// Deselect on a click on the svg. 
		this.d3().select('svg').on('click', function () {
			if( d3.event.defaultPrevented ) return;
			controller.send('toggleSelection');
		});

		this.set('featureGroups', featureGroups);
	},

	// Updates existing feature elements in the d3 diagram.
	updateFeatures: function () {
		if( !this.get('isReadyForObservers') ) return;

		var symbolService = this.get('symbolService');
		var layoutManager = this.get('layoutManager');
		layoutManager.updateFeaturePositions();
		layoutManager.updateFeatureLabelPositions();

		var featureGroups = this.get('featureGroups');
		featureGroups.attr('transform', translate('positionX', 'positionY'));

		featureGroups
			.style('visibility', function(d) { 
				return d.get('isVisible') ? "visible" : "hidden";
			});

		featureGroups.select('circle')
			.attr('r', 5)
			.attr('cx', 0)
			.attr('cy', 0)
			.style('fill', function (d) {
				return d.get('isSelected') ? 'red' : 'black';
			});

		featureGroups.select('image')
			.attr('visibility', function (d) { return !!d.get('symbol') ? 'visible' : 'hidden'; })
			.attr('width', 50)
			.attr('height', 100)
			.attr('x', 0)
			.attr('y', 0)
			.attr('xlink:href', function(d) { 
				return symbolService.getHref(d.get('symbol'));
			})
			.attr('transform', function (d) {
				var symbol_slug = d.get('symbol');
				if( !symbol_slug ) return "";
				var transform = symbolService.getTransform(symbol_slug, d.get('isTop'));
				return transform;
			});

		featureGroups.select('text')
			.attr('transform', translate('labelPositionX', 'labelPositionY'))
			.text(accessor('marker.dnafeature.name'));

	}.observes(
		'features.@each.isSelected',
		'features.@each.isVisible',
		'width'
	)
});

})();