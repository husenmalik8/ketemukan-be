class LostsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postLostHandler = async (request, h) => {
    this._validator.validateLostPayload(request.payload);

    const { title, shortDesc, description, lostDate, categoryId, locationId } =
      request.payload;
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
}

module.exports = LostsHandler;
