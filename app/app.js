var App = Ember.Application.create({
	LOG_VIEW_LOOKUPS: false,
	LOG_ACTIVE_GENERATION: false
});
App.Router.map(function() { 
	this.route('dna-inspector', { path: "/" });
});

