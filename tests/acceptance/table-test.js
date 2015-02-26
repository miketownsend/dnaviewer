(function () {
	module("Table", {
		setup: function(){	
			App.reset();
		}
	});

	test("Table Renders", function(){
		visit('/');
		andThen(function(){
			ok(find('#feature-table').length > 0, "Table element exists");
			equal(find('.feature-table-row').length, 12, "Table element exists");
		});
	});

	test("Table Selection Works", function(){
		visit('/');
		var first_row_selector = ".feature-table-row:first-of-type";
		click(first_row_selector);
		andThen(function(){
			equal(
				find('.feature-table-row.is-selected').length, 
				1, 
				"One feature is selected in table"
			);
			equal(
				find('.feature-table-row.is-selected span:nth-child(2)').text().trim(),
				"pGEX_3_primer", 
				"Correct feature is selected in table"
			);

			click(first_row_selector);
			andThen(function () {
				equal(
					find('.feature-table-row.is-visible').length, 
					12, 
					"Can deselect row from table click"
				);
			});
		});
	});
})();