function item(initialItem) {
    var self = this;
    self.item = ko.observable(initialItem);
    console.log(self.item());
}

function viewModel() {
	// Data
	var self = this;
	self.jsonData = ko.observableArray();
	self.items = ko.observableArray()
	self.appTitle = ko.observable();
	self.appSubTitle = ko.observable();

	// Load initial state from server
	$.getJSON('../data/billing.json', function(data, textStatus, jqXHR) {
		self.jsonData(data);
	}).done(function () {
		console.log(self.jsonData());
		console.log('Request done!');
		populateData();
	}).fail(function (jqxhr,settings,ex) {
		alert('failed, '+ ex);
	});

    //
    function populateData () {
	    self.appTitle(self.jsonData().appTitle);
	    self.appSubTitle(self.jsonData().appSubTitle);

	    // Editable data
	    self.items([
	        new item(self.jsonData().vegetables[0]),
	        new item(self.jsonData().vegetables[1])
	    ]);
    }

	self.fullAppName = ko.computed(function () {
		return self.appTitle() + ' ' + self.appSubTitle();
	}, this);
}

ko.applyBindings(new viewModel);