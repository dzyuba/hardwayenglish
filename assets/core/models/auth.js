const store   = require('../models/store');
const request = require('../models/request');
const cookie  = require('../models/cookie');

const auth = {

	// VIEW
	init: function(element) {

		let error = false;
		let nodes = store.DOM();
		let menu  = nodes.menu;
		let type  = menu.getAttribute('type');
		let form  = menu.querySelector('.menu-form[type='+type+']');

		let fields = form.querySelectorAll('.menu-form__item');
		let add_class_error = function() {
			menu.setAttribute("status", "error");
			setTimeout(function() {
				menu.removeAttribute("status");
			}, 1000);
		};

		console.log(fields);

		for (let el = 0; el < fields.length; ++el) {
			let status = fields[el].getAttribute('status');
			if (status == "error") error = true;
			else if (status !== "success" && status !== "error") {
				let tip = fields[el].querySelector('.menu-form__tip');

				fields[el].setAttribute('status', 'error');
				tip.innerHTML = "Field must be complete!";
				error = true;
			}
		}

		let get_value = function(type) {

			let field = form.querySelector('.menu-form__field[type="' +
				type + '"]');

			let value = field != null ? field.value : null;
			return value;
		};

		let data = {
			"email" : get_value("email"),
			"username" : get_value("username"),
			"password" : get_value("password")
		};

		if (error) add_class_error();
		else if (!error) auth.in(type, data, function() {
			add_class_error();
		});

	},

	available: function(type, value) {

		let data = type == "username" ? {username:value}
			     : type == "email" ? {email:value} : null;

		return request.data('/available', data, function(data) {
			if (data.available) return true; 
			return false;
		});
	},

	in: function(type, data, callback) {

		let url = "/" + type;

		// send request data
		request.data(url, data, function(data) {

			if (!data.token) {
				alert(data.message);
				return callback();
			}

			if (data.token) {

				// set cookie
				cookie.set("token", data["token"], data["timestamp"]);

				// reload page
				window.location.replace("/");

			}

		});

		// change btn

	},

	out: function() {

	}
};

module.exports = auth;