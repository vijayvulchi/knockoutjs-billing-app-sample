function item(initialItem, initialQuantity) {
    var self = this;
    self.item = ko.observable(initialItem);
    self.quantity = ko.observable(initialQuantity);
	self.total = ko.computed(function () {
		return self.item().price * self.quantity().quantity;
		// return price ? "$" + price.toFixed(2) : "None";
	}, this);
}

function viewModel() {
	// Data
	var self = this;
	self.appTitle = ko.observable();
	self.appSubTitle = ko.observable();
	self.jsonData = ko.observableArray();
	self.items = ko.observableArray();
	self.addNewItem = ko.observable();

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
	    // Operations
	    self.addNewItem = function() {
	        self.items.push(new item(self.jsonData().vegetables[0], self.jsonData().quantity[0]));
	    }
		//
		self.removeItem = function (item) {
			self.items.remove(item);
		}
    }

	self.totalAmount = ko.computed(function() {
		var total = 0;
		for (var i = 0; i < self.items().length; i++) {
			total += self.items()[i].total();
		}
		return total.toFixed(2);
	}, this);

	self.fullAppName = ko.computed(function () {
		return self.appTitle() + ' ' + self.appSubTitle();
	}, this);
}

ko.applyBindings(new viewModel);