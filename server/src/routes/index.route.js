const invoiceRoute = require("./invoice.route");
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");
const profileRoute = require("./profile.route");
const productRoute = require("./product.route");
const promotionRoute = require("./promotion.route");
const blogRoute = require("./blog.route");
const dashboardRoute = require("./dashboard.route");

function route(app) {
	app.get("/", (req, res) => {
		res.send("Backend server is running!");
	});

	app.use("/account", accountRoute);

	app.use("/auth", authRoute);

	app.use("/profile", profileRoute);

	app.use("/product", productRoute);

	app.use("/invoice", invoiceRoute);

	app.use("/promotion", promotionRoute);

	app.use("/blog", blogRoute);

	app.use("/dashboard", dashboardRoute);
}

module.exports = route;
