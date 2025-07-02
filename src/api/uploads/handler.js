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

  postUploadImageHandler = async (request, h) => {
    const { cover } = request.payload;
    const { id: albumId } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const fileContent = bufferToDataUri(cover);
    const result = await cloudinary.uploader.upload(fileContent, {
      folder: 'album-covers',
    });
    const fileLocation = result.secure_url;

    // const filename = await this._service.writeFile(cover, cover.hapi);
    // const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/${albumId}/images/${filename}`;

    await this._service.editAlbumCover(albumId, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  };
}

module.exports = UploadsHandler;
