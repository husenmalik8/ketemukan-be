class LostCommentsHandler {
  constructor(service, validator, pointService, achievementService) {
    this._service = service;
    this._validator = validator;
    this._pointService = pointService;
    this._achievementService = achievementService;
  }

  postLostCommentHandler = async (request, h) => {
    this._validator.validateLostCommentPayload(request.payload);

    const { comment } = request.payload;
    const { id: userId } = request.auth.credentials;
    const { id: lostId } = request.params;

    await this._service.verifyLostItem(lostId);
    const commentId = await this._service.addLostComment({
      comment,
      lostId,
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

module.exports = LostCommentsHandler;
