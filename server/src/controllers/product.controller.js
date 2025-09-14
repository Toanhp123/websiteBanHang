const { json } = require("sequelize");
const productService = require("../services/product.service");
const { ProductFilter } = require("../utils/search");

class ProductController {
	// [GET] product/
	async getProductByCondition(req, res) {
		const product = await productService.getProductByCondition(
			ProductFilter(req.query)
		);

		res.json(product);
	}

	// [GET] product/categories
	async getCategories(req, res) {
		const categories = await productService.getCategories();

		res.json(categories);
	}

	// [GET] product/type
	async getProductType(req, res) {
		const productType = await productService.getProductType();

		res.json(productType);
	}

	// [GET] product/status
	async getProductStatus(req, res) {
		const productStatus = await productService.getProductStatus();

		res.json(productStatus);
	}

	// [GET] product/stock/:id
	async getProductStock(req, res) {
		const { productID } = req.params;

		const productStock = await productService.getProductStock(productID);

		res.json({ availability: productStock });
	}

	// [GET] product/:product_id
	async getProductByID(req, res) {
		const { product_id } = req.params;

		const productDetail = await productService.getProductByID(product_id);

		res.json(productDetail);
	}

	// [GET] product/warehouse
	async getWarehouse(req, res) {
		const warehouse = await productService.getWarehouse();

		res.json(warehouse);
	}

	// [GET] product/warehouse
	async getSupplier(req, res) {
		const supplier = await productService.getSupplier();

		res.json(supplier);
	}

	// [POST] product/addProduct
	async addProduct(req, res) {
		const mainImage = req.files?.mainImage?.[0] || null;
		const subImages = req.files?.subImages || [];

		const {
			product_name,
			product_description,
			product_category_id,
			price,
			supplier_id,
			product_type_id,
			warehouseQuantities,
			product_code,
		} = req.body;

		const { id } = req.user;

		const parsedWarehouseQuantities = warehouseQuantities
			? JSON.parse(warehouseQuantities)
			: [];

		const message = await productService.addProduct(
			id,
			mainImage,
			subImages,
			product_name,
			product_description,
			product_category_id,
			price,
			supplier_id,
			product_type_id,
			parsedWarehouseQuantities,
			product_code
		);

		res.json(message);
	}

	// [DELETE] /product/:product_id
	async deleteProduct(req, res) {
		const { product_id } = req.params;

		await productService.deleteProduct(product_id);

		return json({ message: "OK" });
	}

	// [GET] /product/advanceInfo
	async getProductAdvancedInfo(req, res) {
		const advanceInfo = await productService.getProductAdvancedInfo();

		res.json(advanceInfo);
	}
	// [PUT] /updateProduct
	async updateProduct(req, res) {
		const { product_id } = req.params;
		const { id } = req.user;
		const { warehouseQuantities, ...formData } = req.body;

		const mainImage = req.files?.mainImage?.[0] || null;
		const subImages = req.files?.subImages || [];

		const parsedWarehouseQuantities = warehouseQuantities
			? JSON.parse(warehouseQuantities)
			: [];

		const message = await productService.updateProduct(
			id,
			product_id,
			mainImage,
			subImages,
			formData,
			parsedWarehouseQuantities
		);

		res.json(message);
	}

	// [POST] product/addSupplier
	async addSupplier(req, res) {
		const { data } = req.body;

		const message = await productService.addSupplier(data);

		res.json(message);
	}

	// [GET] product/minimal
	async getAllProductMinimal(req, res) {
		const product = await productService.getAllProductMinimal();

		res.json(product);
	}
}

module.exports = new ProductController();
