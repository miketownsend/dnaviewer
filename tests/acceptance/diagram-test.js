(function () {
	var diagram_selector = "#plasmid-diagram";
	var filter_selector = "#filter input";

	module("Filter", {
		setup: function(){	
			App.reset();
		}
	});

	test("Background path renders.", function() {
		visit('/');
		andThen(function(){
			var path = $("g.background path");
			ok(path.length, "Background path is present");
			ok(path.attr('d').indexOf('NaN') == -1, "Path 'd' attribute does not contain and NaN values.");
		});
	});

	test("Features are rendered.", function () {
		visit('/');
		andThen(function(){
			var circles = $("g.features circle");
			equal(circles.length, 12, "Correct number of features have been rendered.");
		});
	});

	test("Feature view model binding works.", function(){
		visit('/');
		fillIn(filter_selector, "pGEX");
		andThen(function(){
			var circles = $('g.features circle');
			var visible_count = 0;
			circles.each(function (i, circle) {
				if( $(circle).css('visibility') == "visible" ) visible_count++;
			});
			equal(visible_count, 1, "One feature circle is showing");
		});
	});
})();