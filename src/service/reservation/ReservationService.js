import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class ReservationService {
  static createReservation(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "reservation", params, '', responseHandler);
  }
//   static searchEvent(params, responseHandler) {
//     let getRequest = "event?"
//     if(params.placeId){
//       getRequest += "placeId=" + params.placeId + "&"
//     }
//     if(params.page){
//       getRequest += "page=" + params.page + "&"
//     }
//     if(params.pageSize){
//       getRequest += "&pageSize=" + params.pageSize
//     }
//     if(params.eventPlaceName){
//       getRequest += "&placeName=" + params.eventPlaceName
//     }
//     if(params.eventName){
//       getRequest += "&name=" + params.eventName
//     }
//     if(params.eventType){
//       getRequest += "&type=" + params.eventType
//     }
//     return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
//   }
//   static getEvent(params, responseHandler) {
//     let getRequest = "event/" + params.id
//     return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
//   }
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
//   static deleteEvent(params, responseHandler) {
//     let deleteRequest = "event"
//     return Rest(ROOT_ENDPOINT)(fetchActions.DELETE, deleteRequest, {id: params.eventId}, '', responseHandler);
//   }

}