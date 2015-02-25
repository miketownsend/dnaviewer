var App = Ember.Application.create({
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true
});
App.Enums = {};
App.Config = {};

App.adapter = Ember.FixtureAdapter.create();
