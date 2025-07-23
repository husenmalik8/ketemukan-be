class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUserHandler = async (request, h) => {
    this._validator.validateUserPayload(request.payload);
    const { username, password, fullname, locationId } = request.payload;

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
      locationId,
    });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  };

  getUserHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const userDetail = await this._service.getProfileUser(userId);

    return {
      status: 'success',
      data: {
        userDetail,
      },
    };
  };

  putUserHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const { fullname, locationId } = request.payload;

    await this._service.editProfileUser(userId, { fullname, locationId });

    return {
      status: 'success',
      message: 'User berhasil diperbarui',
    };
  };

  getMyLostItemsHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const myLostItems = await this._service.getMyLostItems(userId);

    return {
      status: 'success',
      data: {
        myLostItems,
      },
    };
  };

  getMyFoundItemsHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const myFoundItems = await this._service.getMyFoundItems(userId);

    return {
      status: 'success',
      data: {
        myFoundItems,
      },
    };
  };

  getMyAchievementsHandler = async (request) => {
    const { id: userId } = request.auth.credentials;
    const myAchievements = await this._service.getMyAchievements(userId);

    return {
      status: 'success',
      data: {
        myAchievements,
      },
    };
  };
}

module.exports = UsersHandler;
