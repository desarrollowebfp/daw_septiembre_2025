const cloudinary = require("cloudinary").v2;

const deleteImgCloudinary = async (publicID) => {
  if (!publicID) {
    return;
  }
  try {
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.error("No se pudo eliminar la imagen");
  }
};

module.exports = deleteImgCloudinary;
