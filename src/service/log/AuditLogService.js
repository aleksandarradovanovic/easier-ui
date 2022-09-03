import Rest, { fetchActions } from "../restHandler";

const ROOT_ENDPOINT = '/api';
import moment from 'moment'
export default class AuditLogService {
    static getLog(params, responseHandler) {
        let getRequest = "audit?"
        if (params) {
            if (params.commandAt) {
              getRequest += "commandAt=" + moment(params.commandAt).toISOString() + "&"
            }
            if (params.commandName) {
              getRequest += "commandName=" + params.commandName + "&"
            }
            if (params.userIdentity) {
              getRequest += "userIdentity=" + params.userIdentity + "&"
            }
          }
        return Rest(ROOT_ENDPOINT)(fetchActions.GET, getRequest, '', '', responseHandler);
    }

}