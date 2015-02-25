Ember.Handlebars.helper('strandtext', function (value) {
	switch (value) {
		case 1: return "Forward";
		case -1: return "Backward";
	}

	return value;
});
