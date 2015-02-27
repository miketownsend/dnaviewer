// Mock Service to retreive the information needed to display this symbol in the plasmid diagram.

// Ideally this would come from a configuration file and would return the paths required to
// render the symbol rather than the svg link. This would allow us to apply different styles 
// to the symbols and create them so that they are centered for rotation / flipping.

Services = Ember.Namespace.create();

(function () {
	
var data = {
	terminator: {
		href: "assets/svg/terminator.svg",
		size: { width: 50, height: 100 },
		center: { x: 25, y: 55 }
	},
	promoter: {
		href: "assets/svg/promoter.svg",
		size: { width: 50, height: 100 },
		center: { x: 10, y: 53 }
	},
};

var get = function (slug, key) {
	return data[slug] ? data[slug][key] : undefined; 
};

Services.MockSymbolService = Ember.Object.extend({
	getHref: function (slug) {
		return get(slug,"href");
	},
	getTransform: function (slug, isTop) {
		var d = data[slug],
			rotate = "rotate(%@,%@,%@) ",
			translate = "translate(%@,%@) ",
			angle = 180,
			cx = d.size.width/2,
			cy = d.size.height/2,
			tx = isTop ? -1 * d.center.x : d.size.width - d.center.x,
			ty = isTop ? -1 * d.center.y : d.size.height - d.center.y;

		var transform = isTop ? "" : rotate.fmt(angle, cx, cy);
		transform += translate.fmt(tx,ty);
		return transform;
	}
});

})();
