import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class UserService {
  static createUser(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "user", params, '', responseHandler, 'LOGIN');
  }
}