const cloudinary = require('../../cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');
const parser = new DatauriParser();

const bufferToDataUri = (file) => {
  const ext = path.extname(file.hapi.filename).toString();
  return parser.format(ext, file._data).content;
};

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUploadUserPictureHandler = async (request, h) => {
    const { picture } = request.payload;
    const { id: userId } = request.auth.credentials;

    this._validator.validateImageHeaders(picture.hapi.headers);

    const fileContent = bufferToDataUri(picture);
    const result = await cloudinary.uploader.upload(fileContent, {
      folder: `users-picture/${userId}`,
    });
    const fileLocation = result.secure_url;

    await this._service.editUserPicture(userId, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Profile picture berhasil diunggah',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  };

  postUploadLostPictureHandler = async (request, h) => {
    const { picture } = request.payload;
    const { id: lostId } = request.params;

    this._validator.validateImageHeaders(picture.hapi.headers);

    const fileContent = bufferToDataUri(picture);
    const result = await cloudinary.uploader.upload(fileContent, {
      folder: `losts-picture/${lostId}`,
    });
    const fileLocation = result.secure_url;

    await this._service.editLostPicture(lostId, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Lost picture berhasil diunggah',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  };

  postUploadFoundPictureHandler = async (request, h) => {
    const { picture } = request.payload;
    const { id: foundId } = request.params;

    this._validator.validateImageHeaders(picture.hapi.headers);

    const fileContent = bufferToDataUri(picture);
    const result = await cloudinary.uploader.upload(fileContent, {
      folder: `founds-picture/${foundId}`,
    });
    const fileLocation = result.secure_url;

    await this._service.editFoundPicture(foundId, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Found picture berhasil diunggah',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  };
}

module.exports = UploadsHandler;
