function viewModel() {
	self.appName = ko.observable('Builling System');
	self.appSubName = ko.observable('by Vijaya Kumar Vulchi');

	self.fullAppName = ko.computed(function () {
		return self.appName() + ' ' + self.appSubName();
	}, this);
}

ko.applyBindings(new viewModel);