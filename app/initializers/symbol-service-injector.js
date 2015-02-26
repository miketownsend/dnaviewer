Ember.Application.initializer({
  name: "symbolServiceInjector",
  initialize: function(container, application) {
  	container.register('services:symbolService', Services.MockSymbolService, { singleton: true });
	application.inject('view:plasmid-diagram','symbolService','services:symbolService');
  }
});