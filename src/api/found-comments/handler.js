class FoundCommentsHandler {
  constructor(service, validator, pointService, achievementService) {
    this._service = service;
    this._validator = validator;
    this._pointService = pointService;
    this._achievementService = achievementService;
  }

  postFoundCommentHandler = async (request, h) => {
    this._validator.validateFoundCommentPayload(request.payload);

    const { comment } = request.payload;
    const { id: userId } = request.auth.credentials;
    const { id: foundId } = request.params;

    await this._service.verifyFoundItem(foundId);
    const commentId = await this._service.addFoundComment({
      comment,
      foundId,
      userId,
    });

    await this._pointService.addPoint(10, userId);
    await this._achievementService.checkAndGiveAchievement(userId);

    const response = h.response({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: {
        commentId,
      },
    });
    response.code(201);
    return response;
  };
}

module.exports = FoundCommentsHandler;
