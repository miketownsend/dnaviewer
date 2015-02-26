(function () {
	var str = "scale(%@,%@) translate(%@,%@)";

	module("Zoom", {
		setup: function(){	
			this.manager = App.PlasmidDiagramViewModel.create();
		}
	});

	test("Default transform: scale(1,1) translate(0,0)", function() {
		var m = this.manager;
		m.updateZoom();

		var transform = str.fmt(m.get('scale_x'), m.get('scale_y'), m.get('translate_x'), m.get('translate_y'));
		equal(transform, "scale(1,1) translate(0,0)");
	});
})();