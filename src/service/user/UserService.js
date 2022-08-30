import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class UserService {
  static createUser(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "user", params, '', responseHandler, 'LOGIN');
  }
  static searchUsers(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, "user", params, '', responseHandler, 'LOGIN');
  }
  static deleteUser(params, responseHandler) {
    let deleteRequest = "user"
    return Rest(ROOT_ENDPOINT)(fetchActions.DELETE, deleteRequest, { id: params.userId }, '', responseHandler);
  }
  static getUser(params, responseHandler) {
    let getRequest = "user/" + params.id
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
  }
  static updateUser(params, responseHandler) {
    let updateRequest = "user"
    return Rest(ROOT_ENDPOINT)(fetchActions.UPDATE, updateRequest, {id: params.userId, data: params.data}, '', responseHandler);
  }
}