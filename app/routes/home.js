App.HomeRoute = Ember.Route.extend({
	model: function () {
		return App.DnaMolecule.fetch(7482);
	}
});