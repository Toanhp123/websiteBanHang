const fs = require("fs");
const path = require("path");

const deleteImages = (mainImage = null, subImages = []) => {
	// Xóa main image
	if (mainImage) {
		let mainImagePath;

		if ("path" in mainImage && mainImage.path) {
			// File từ multer
			mainImagePath = mainImage.path;
		} else if ("image_url" in mainImage && mainImage.image_url) {
			// ProductImage từ DB
			mainImagePath = path.join(__dirname, "../../", mainImage.image_url);
		}

		if (mainImagePath) {
			fs.unlink(mainImagePath, (err) => {
				if (err) console.error("Failed to delete main image:", err);
			});
		}
	}

	// Xóa sub images
	if (subImages.length > 0) {
		subImages.forEach((subImage) => {
			if (!subImage) return;

			let subImagePath;

			if ("path" in subImage && subImage.path) {
				subImagePath = subImage.path;
			} else if ("image_url" in subImage && subImage.image_url) {
				subImagePath = path.join(
					__dirname,
					"../../",
					subImage.image_url
				);
			}

			if (subImagePath) {
				fs.unlink(subImagePath, (err) => {
					if (err) console.error("Failed to delete sub image:", err);
				});
			}
		});
	}
};

module.exports = { deleteImages };
