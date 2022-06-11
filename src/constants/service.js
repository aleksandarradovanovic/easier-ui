export const SERVICE = "service";
export const REQUEST_DATA = "requestData";
export const ON_SUCCESS_GLOBAL = "onSuccessGlobalFunc";
export const ON_ERROR_GLOBAL = "onErrorGlobalFunc";
export const ON_SUCCESS_LOCAL = "onSuccessLocal";
export const ON_ERROR_LOCAL = "onErrorLocal";

export const REQUEST_OBJECT = "requestObject";
export const PAGE = "page";
export const SIZE_PER_PAGE = "sizePerPage";
export const SORT_NAME = "sortName";
export const ASCENDING = "ascending";


export const START_DATE = "startDate";
export const START_TIME = "startTime";

export const ID = "id";
export const PHONE = "phone";
export const EMAIL = "email";
export const DATE = "date";

export const restErrors = Object.freeze({
  ERROR_WRONG_CAPTCHA: "ERROR_WRONG_CAPTCHA",
  ERROR_BAD_USERNAME_OR_PASSWORD: "ERROR_BAD_USERNAME_OR_PASSWORD",
  ERROR_BAD_USERNAME: "ERROR_BAD_USERNAME",
  GENERAL_SERVER_ERROR: "GENERAL_SERVER_ERROR",
  ERROR_CODE_GENERIC: "ERROR_CODE_GENERIC",
  ERROR_ACCOUNT_LOCKED: "ERROR_ACCOUNT_LOCKED",
  ERROR_ACCOUNT_NOT_CONFIRMED: "ERROR_ACCOUNT_NOT_CONFIRMED",
  ERROR_ACCOUNT_INACTIVE: "ERROR_ACCOUNT_INACTIVE",
  ERROR_ACCOUNT_EXPIRED: "ERROR_ACCOUNT_EXPIRED",
  ERROR_ACCOUNT_NOT_APPROVED: "ERROR_ACCOUNT_NOT_APPROVED",
  ERROR_ACCOUNT_DELETED: "ERROR_ACCOUNT_DELETED",
  ERROR_USERNAME_NOT_UNIQUE: "ERROR_USERNAME_NOT_UNIQUE",
  ERROR_EMAIL_NOT_UNIQUE: "ERROR_EMAIL_NOT_UNIQUE",
  ERROR_BAD_PASSWORD: "ERROR_BAD_PASSWORD",
  ERROR_REPEAT_PASS_NOT_SAME: "ERROR_REPEAT_PASS_NOT_SAME",
  ERROR_NO_ACCOUNT_WITH_GIVEN_USERNAME: "ERROR_NO_ACCOUNT_WITH_GIVEN_USERNAME",
  ERROR_ACCOUNT_NOT_ACTIVE: "ERROR_ACCOUNT_NOT_ACTIVE",
  ERROR_BAD_OLD_PASSWORD: "ERROR_BAD_OLD_PASSWORD",
  ERROR_BAD_NEW_PASSWORD: "ERROR_BAD_NEW_PASSWORD"
});

export class ServiceRequestData {
  constructor(service, requestData, onSuccessGlobalFunc, onErrorGlobalFunc, onSuccessLocalFunc, onErrorLocalFunc) {
    this[SERVICE] = service;
    this[REQUEST_DATA] = requestData;
    this[ON_SUCCESS_GLOBAL] = onSuccessGlobalFunc;
    this[ON_ERROR_GLOBAL] = onErrorGlobalFunc;
    this[ON_SUCCESS_LOCAL] = onSuccessLocalFunc;
    this[ON_ERROR_LOCAL] = onErrorLocalFunc;
  }
}

export class PagedRequest {
  constructor(requestObject, page, sizePerPage, sortName, ascending) {
    this[REQUEST_OBJECT] = requestObject;
    this[PAGE] = page;
    this[SIZE_PER_PAGE] = sizePerPage;
    this[SORT_NAME] = sortName;
    this[ASCENDING] = ascending;
  }
}