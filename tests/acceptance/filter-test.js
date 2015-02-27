(function () {
	var filter_selector = "#filter input";

	module("Filter", {
		setup: function(){	
			App.reset();
		}
	});

	test("Filter renders", function(){
		visit('/');
		andThen(function(){
			ok(find(filter_selector).length, "Filter element exists");
		});
	});

	test("Filter works by name", function(){
		visit('/');
		fillIn(filter_selector, "pGEX");
		andThen(function(){
			equal(
				find('.feature-table-row').length,
				1,
				"One feature is selected in table"
			);
			equal(
				find('.feature-table-row span:nth-child(2)').text().trim(),
				"pGEX_3_primer",
				"Correct feature is selected in table"
			);
		});
	});

	test("Filter is case-insensitive", function(){
		visit('/');
		fillIn(filter_selector, "pgex");
		andThen(function(){
			equal(
				find('.feature-table-row').length,
				1,
				"One feature is selected in table"
			);
			equal(
				find('.feature-table-row span:nth-child(2)').text().trim(),
				"pGEX_3_primer",
				"Correct feature is selected in table"
			);
		});
	});

	test("Filter selection works", function(){
		visit('/');
		fillIn(filter_selector, "pGEX");
		andThen(function(){
			equal(
				find('.feature-table-row.is-selected span:nth-child(2)').text().trim(),
				"pGEX_3_primer",
				"Correct feature is selected when it is the only filtered result"
			);

			fillIn(filter_selector, "");
			andThen(function () {
				equal(
					find('.feature-table-row.is-selected').length,
					0,
					"No Features are selected"
				);
			});
		});
	});
})();