import Rest, { fetchActions } from "../restHandler";

const ROOT_ENDPOINT = '/api';

export default class AuditLogService {
    static getLog(params, responseHandler) {

        return Rest(ROOT_ENDPOINT)(fetchActions.GET, "audit", params, '', responseHandler);
    }

}