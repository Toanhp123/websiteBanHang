const fs = require("fs");
const path = require("path");

const deleteImages = (mainImage, subImages) => {
	fs.unlink(path.join("uploads/images/", mainImage.filename), (unlinkErr) => {
		if (unlinkErr)
			console.error("Failed to delete unused file:", unlinkErr);
	});

	subImages.forEach((subImage) => {
		fs.unlink(
			path.join("uploads/images/", subImage.filename),
			(unlinkErr) => {
				if (unlinkErr)
					console.error("Failed to delete unused file:", unlinkErr);
			}
		);
	});
};

module.exports = { deleteImages };
