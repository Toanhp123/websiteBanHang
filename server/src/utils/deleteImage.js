const fs = require("fs");
const path = require("path");

const deleteImages = (mainImage = null, subImages = []) => {
	if (mainImage) {
		fs.unlink(mainImage.path, (err) => {
			if (err) console.error("Failed to delete unused file:", err);
		});
	}
	if (subImages.length > 0) {
		subImages.forEach((subImage) => {
			fs.unlink(subImage.path, (err) => {
				if (err) console.error("Failed to delete unused file:", err);
			});
		});
	}
};

module.exports = { deleteImages };
