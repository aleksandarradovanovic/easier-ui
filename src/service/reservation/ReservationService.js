import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class ReservationService {
  static createReservation(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "reservation", params, '', responseHandler);
  }
  static getUserReservation(responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, "reservation/user", '', '', responseHandler);
  }
  static searchReservation(params, responseHandler) {
    let getRequest = "reservation?"
    if(params.placeId){
      getRequest += "placeId=" + params.placeId + "&"
    }
    if(params.page){
      getRequest += "page=" + params.page + "&"
    }
    if(params.pageSize){
      getRequest += "&pageSize=" + params.pageSize
    }
    if(params.eventPlaceName){
      getRequest += "&placeName=" + params.eventPlaceName
    }
    if(params.eventName){
      getRequest += "&name=" + params.eventName
    }
    if(params.eventType){
      getRequest += "&type=" + params.eventType
    }
    if(params.eventId){
      getRequest += "&eventId=" + params.eventId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static getReservation(params, responseHandler) {
    let getRequest = "reservation/" + params.id
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
//   static getEventImages(params, responseHandler) {
//     let getRequest = "image"
//     if(params.eventId){
//       getRequest += "?eventId=" + params.eventId
//     }
//     return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
//   }
//   static updateEvent(params, responseHandler) {
//     let updateRequest = "event"
//     return Rest(ROOT_ENDPOINT)(fetchActions.UPDATE, updateRequest, {id: params.eventId, data: params.data}, '', responseHandler);
//   }
  static deleteReservation(params, responseHandler) {
    let deleteRequest = "reservation"
    return Rest(ROOT_ENDPOINT)(fetchActions.DELETE, deleteRequest, {id: params.reservationId}, '', responseHandler);
  }

}