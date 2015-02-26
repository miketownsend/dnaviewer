// Mock Service to retreive the information needed to display this symbol in the plasmid diagram.

// Ideally this would come from a configuration file and would return the paths required to
// render the symbol rather than the svg link. This would allow us to apply different styles 
// to the symbols.
Services = Ember.Namespace.create();

(function () {

var data = {
	terminator: {
		href: "assets/svg/terminator.svg",
		transform: "translate(-25, -55)"
	},
	promoter: {
		href: "assets/svg/promoter.svg",
		transform: "translate(-10, -53)"
	},
};

var get = function (slug, key) {
	return data[slug] ? data[slug][key] : undefined; 
};

Services.MockSymbolService = Ember.Object.extend({
	getHref: function (slug) {
		return get(slug,"href");
	},
	getTransform: function (slug) {
		return get(slug, "transform");
	}
});

})();
