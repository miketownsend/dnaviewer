var App = Ember.Application.create({
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true
});
App.Helpers = {};
App.Enums = {};
App.Config = {};
App.Router.map(function() { 
	this.route('dna-inspector', { path: "/" });
});

