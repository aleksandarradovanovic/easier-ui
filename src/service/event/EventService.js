import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class EventService {
  static createEvent(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "event", params, '', responseHandler);
  }
  static searchEvent(params, responseHandler) {
    let getRequest = "event"
    if(params.placeId){
      getRequest += "?placeId=" + params.placeId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static getEvent(params, responseHandler) {
    let getRequest = "event/" + params.id
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static getEventImages(params, responseHandler) {
    let getRequest = "image"
    if(params.eventId){
      getRequest += "?eventId=" + params.eventId
    }
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }

}