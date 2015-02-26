(function () {

var margin_scale = d3.scale.linear().domain([1000,3000]).range([0, 200]);

// Plasmid Diagram View Model
// This is a manager class for the diagram. It contains the math required to 
// render the diagram and position elements on the diagram.
App.PlasmidDiagramViewModel = Ember.Object.extend({

	init: function () {
		window.plasmidManager = this;
	},

	// These properties control the dimensions of the diagram.
	// "height" and "width" are updated by the view when the window size changes. 
	// Ideally the other properties would be setup to adjust using scales as shown
	// for margin_x. 
	height: 1000,
	width: 1000,
	radius: 50,
	max_height: 400,
	padding_y: 100,
	padding_x: 100,

	margin_x: function () {
		var width = this.get('width');
		if( width < 1000)  return 0;
		return margin_scale(width);
	}.property('width'),

	effectiveHeight: function () {
		var svg_height = this.get('height'),
			max = this.get('max_height');

		return Math.min(max, svg_height);
	}.property('height', 'max_height'),

	effectiveWidth: function () {
		var width = this.get('width'),
			margin = this.get('margin_x');

		return width - margin * 2;
	}.property('height', 'max_height'),

	pathTop: function () {
		return this.get('padding_y');
	}.property('padding_y'),
	
	pathLeft: function () {
		var padding = this.get('padding_x'),
			margin = this.get('margin_x');
		return margin + padding;
	}.property('padding_x', 'margin_x'),

	pathRight: function () {
		var width = this.get('width'),
			padding = this.get('padding_x'),
			margin = this.get('margin_x');

		return width - padding - margin;
	}.property('pathLeft', 'margin_x', 'padding_x'),

	pathBottom: function () {
		var top = this.get('pathTop'),
			height = this.get('effectiveHeight'), 
			padding = this.get('padding_y');

		return height - top - padding;
	}.property('height', 'padding_y', 'max_height'),

	// Generates and SVG paths "d" attr for the background path.
	generateBackgroundPath: function () {
		var r = this.get('radius'),
			top = this.get('pathTop'),
			bottom = this.get('pathBottom'),
			left = this.get('pathLeft'),
			right = this.get('pathRight');

		var line = "L %@ %@ ";
 		var curve = "S %@ %@ %@ %@ ";

		var d="M %@ %@ ".fmt(left+r, top);
		// start top left.
		d += line.fmt(right-r, top);
		d += curve.fmt(right, top, right, top+r);
		d += line.fmt(right, bottom-r);
		d += curve.fmt(right, bottom, right-r, bottom);
		d += line.fmt(left+r, bottom);
		d += curve.fmt(left, bottom, left, bottom-r);
		d += line.fmt(left, top+r);
		d += curve.fmt(left, top, left+r, top);
		d += line.fmt(left+r, top);
		d += "Z";

		return d;
	},

	// Sets the position of all features on the path.
	setPositionFor: function (features) {
		var molecule_length = this.get('dnamolecule.length'),
			top = this.get('pathTop'),
			bottom = this.get('pathBottom'),
			left = this.get('pathLeft'),
			right = this.get('pathRight'),
			radius = this.get('radius'),
			half_length = molecule_length/2;
			
		var scale = d3.scale.linear()
			.domain([0, half_length])
			.range([left + radius, right - radius]);

		features.forEach(function (f) {
			var start = f.get('marker.start'),
				end = f.get('marker.end'),
				midpoint = start + (end - start)/2,
				x, y;

			if( midpoint < half_length ) {
				x = scale(midpoint);
				y = top;
			} else {
				x = scale(midpoint - half_length);
				y = bottom;
			}

			f.set('positionX', x);
			f.set('positionY', y);
		});
	}
});

})();