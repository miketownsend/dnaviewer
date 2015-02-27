(function () {

// Scales for managing responsiveness. Should really have one for each of the main dimensions.
var margin_scale = d3.scale.linear().domain([1000, 3000]).range([0, 200]);
var height_scale = d3.scale.linear().domain([720,  1080]).range([400, 800])

// Plasmid Diagram View Model
// This is a manager class for the diagram. It contains the math required to 
// render the diagram and position elements on the diagram.
App.PlasmidDiagramViewModel = Ember.Object.extend({
	
	// These properties control the dimensions of the diagram.
	height: 1280,
	width: 1720,
	radius: 50,
	padding_y: 100,
	padding_x: 100,
	
	margin_x: function () {
		var width = this.get('width');
		if( width < 1000)  return 0;
		return margin_scale(width);
	}.property('width'),

	effectiveHeight: function () {
		var height = this.get('height');
		if( height < 720 ) return 400;
		return height_scale(height);
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
				isTop = midpoint < half_length,
				x, y;

			if( isTop ) {
				x = scale(midpoint);
				y = top;
			} else {
				x = scale(molecule_length - midpoint);
				y = bottom;

			}
			
			f.set('isTop', isTop);
			f.set('positionX', x);
			f.set('positionY', y);
		});
	},

	zoomWhenFeatureSelected: 1.3,
	translate_x: 0,
	translate_y: 0,
	scale_x: 1,
	scale_y: 1,
	zoom_origin_x: 0,
	zoom_origin_y: 0,

	updateZoom: function (feature) {
		var zoom = feature ? this.get('zoomWhenFeatureSelected') : 1,
			height = this.get('height'),
			width = this.get('width'),
			center_x = width * 0.5,
			center_y = height * 0.3,
			x = feature ? feature.get('positionX') : center_x,
			y = feature ? feature.get('positionY') : center_y;

		var translate_x = width * (zoom-1) / zoom * - 0.5; 	// Translate by half the change in size to keep the svg centered after scaling.
		translate_x += (center_x - x); 			// Adjust to center on the feature. 

		var translate_y = height * (zoom-1) / zoom * - 0.5;
		translate_y += (center_y - y);

		this.setProperties({
			translate_x: translate_x,
			translate_y: translate_y,
			scale_x: zoom,
			scale_y: zoom,
			zoom_origin_x: center_x,
			zoom_origin_y: center_y
		});
	}
});

})();