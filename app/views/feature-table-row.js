App.FeatureTableRowView = Ember.View.extend({
	tagName: 'li',
	classNames: ['feature-table-row'],
	classNameBindings: ['controller.isSelected', 'controller.isVisible', 'controller.isHovered'],
	click: function () {
		this.get('controller').send("toggleSelection");
	},
});