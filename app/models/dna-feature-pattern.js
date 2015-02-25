(function () {

App.DnaFeaturePattern = Ember.Model.extend({
	id: Ember.attr(),
	bases: Ember.attr(),
	sha1: Ember.attr()
});

})();