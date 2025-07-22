class CategoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getAllCategoriesHandler = async () => {
    const categories = await this._service.getCategories();
    return {
      status: 'success',
      data: {
        categories,
      },
    };
  };

  postCategoriesHandler = async (request, h) => {
    const { name } = request.payload;
    const categoryId = await this._service.addCategory({ name });

    const response = h.response({
      status: 'success',
      message: 'Kategori berhasil ditambahkan',
      data: {
        categoryId,
      },
    });
    response.code(201);
    return response;
  };

  deleteCategoriesHandler = async (request) => {
    const { id } = request.params;

    await this._service.deleteCategory(id);

    return {
      status: 'success',
      message: 'Kategori berhasil dihapus',
    };
  };
}

module.exports = CategoriesHandler;
