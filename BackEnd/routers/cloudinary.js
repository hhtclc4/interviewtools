const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "hoangclc4",
  api_key: "567799543743853",
  api_secret: "DSLzkE8PisZQv0tfJcEAH7y33hM",
});
module.exports = cloudinary;
