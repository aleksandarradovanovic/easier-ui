import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class PlaceService {
  static createPlace(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "place", params, '', responseHandler);
  }
  static getMyPlaces(responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, "place/user", '', '', responseHandler);
  }
  static getPlace(params, responseHandler) {
    let getRequest = "place/" + params.id
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static getPlaceImages(params, responseHandler) {
    let getRequest = "image"
    if(params.placeId){
      getRequest += "?placeId=" + params.placeId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static getPlaceSeatTable(params, responseHandler) {
    let getRequest = "seatTable"
    if(params.placeId){
      getRequest += "?placeId=" + params.placeId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static updatePlace(params, responseHandler) {
    let deleteRequest = "place"
    return Rest(ROOT_ENDPOINT)(fetchActions.UPDATE, deleteRequest, {id: params.placeId, data: params.data}, '', responseHandler);
  }
  static deletePlace(params, responseHandler) {
    let deleteRequest = "place"
    return Rest(ROOT_ENDPOINT)(fetchActions.DELETE, deleteRequest, {id: params.placeId}, '', responseHandler);
  }
  static getPlaceStaff(params, responseHandler) {
    let getRequest = "place/staff"
    if(params.placeId){
      getRequest += "?placeId=" + params.placeId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
}