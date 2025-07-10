class AuthenticationsHandler {
  constructor(service, tokenManager, validator) {
    this._service = service;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  postAuthenticationHandler = async (request, h) => {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { username, password } = request.payload;
    const id = await this._service.verifyUserCredential(username, password);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  };

  putAuthenticationHandler = async (request) => {
    this._validator.validatePutAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._service.verifyRefreshToken(refreshToken);
    const { id } = await this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  };

  deleteAuthenticationHandler = async (request) => {
    this._validator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._service.verifyRefreshToken(refreshToken);
    await this._service.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  };
}

module.exports = AuthenticationsHandler;
