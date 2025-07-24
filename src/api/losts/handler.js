class LostsHandler {
  constructor(service, validator, pointService, achievementService) {
    this._service = service;
    this._validator = validator;
    this._pointService = pointService;
    this._achievementService = achievementService;
  }

  postLostHandler = async (request, h) => {
    this._validator.validateLostPayload(request.payload);

    const { title, shortDesc, description, lostDate, categoryId, locationId } = request.payload;
    const { id: userId } = request.auth.credentials;

    const lostId = await this._service.addLost({
      title,
      shortDesc,
      description,
      lostDate,
      userId,
      categoryId,
      locationId,
    });

    await this._pointService.addPoint(20, userId);
    await this._achievementService.checkAndGiveAchievement(userId);

    const response = h.response({
      status: 'success',
      message: 'Lost item berhasil ditambahkan',
      data: {
        lostId,
      },
    });
    response.code(201);
    return response;
  };

  putLostHandler = async (request, h) => {
    this._validator.validatePutLostPayload(request.payload);

    const { id: lostId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._service.putLost(lostId, userId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Lost item berhasil diperbarui',
    });
    response.code(201);
    return response;
  };

  getLostsHandler = async () => {
    const losts = await this._service.getLosts();
    return {
      status: 'success',
      data: {
        losts,
      },
    };
  };

  getLostByIdHandler = async (request) => {
    const { id } = request.params;
    const detail = await this._service.getLostById(id);
    const comments = await this._service.getLostCommentsByLostId(id);

    const lostDetail = { ...detail, comments };

    return {
      status: 'success',
      data: {
        lostDetail,
      },
    };
  };

  deleteLostItemByIdHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const { id: lostId } = request.params;

    await this._service.deleteLostItemById(userId, lostId);

    return {
      status: 'success',
      message: 'Lost Item berhasil dihapus',
    };
  };
}

module.exports = LostsHandler;
