class FoundsHandler {
  constructor(service, validator, pointService, achievementService) {
    this._service = service;
    this._validator = validator;
    this._pointService = pointService;
    this._achievementService = achievementService;
  }

  postFoundHandler = async (request, h) => {
    this._validator.validateFoundPayload(request.payload);

    const { title, shortDesc, description, foundDate, categoryId, locationId } = request.payload;
    const { id: userId } = request.auth.credentials;

    const foundId = await this._service.addFound({
      title,
      shortDesc,
      description,
      foundDate,
      userId,
      categoryId,
      locationId,
    });

    await this._pointService.addPoint(50, userId);
    await this._achievementService.checkAndGiveAchievement(userId);

    const response = h.response({
      status: 'success',
      message: 'Found item berhasil ditambahkan',
      data: {
        foundId,
      },
    });
    response.code(201);
    return response;
  };

  putFoundHandler = async (request, h) => {
    this._validator.validatePutFoundPayload(request.payload);

    const { id: foundId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._service.putFound(foundId, userId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Found item berhasil diperbarui',
    });
    response.code(201);
    return response;
  };

  getFoundsHandler = async () => {
    const founds = await this._service.getFounds();
    return {
      status: 'success',
      data: {
        founds,
      },
    };
  };

  getFoundByIdHandler = async (request) => {
    const { id } = request.params;
    const detail = await this._service.getFoundById(id);
    const comments = await this._service.getFoundCommentsByFoundId(id);

    const foundDetail = { ...detail, comments };

    return {
      status: 'success',
      data: {
        foundDetail,
      },
    };
  };

  deleteFoundItemByIdHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const { id: foundId } = request.params;

    await this._service.deleteFoundItemById(userId, foundId);

    return {
      status: 'success',
      message: 'Found Item berhasil dihapus',
    };
  };
}

module.exports = FoundsHandler;
