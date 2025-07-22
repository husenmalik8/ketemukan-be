class LocationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getAllLocationsHandler = async () => {
    const locations = await this._service.getLocations();
    return {
      status: 'success',
      data: {
        locations,
      },
    };
  };
}

module.exports = LocationsHandler;
