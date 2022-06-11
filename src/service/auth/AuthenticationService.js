import Rest, {fetchActions} from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class AuthenticationService {
  static login(params, responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.CREATE, "login", params, '', responseHandler, 'LOGIN');
  }
  static getUserFromToken(responseHandler) {
    return Rest(ROOT_ENDPOINT)(fetchActions.GET, "user/jwt", '', '', responseHandler);
  }
}