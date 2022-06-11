import 'whatwg-fetch';
export const ERROR_PAGE_URL_400 = '/error_400'; // Add error page URL   e.g /ui-webportal-server/app/page/error
export const ERROR_PAGE_URL_403 = '/error_403'; // Add error page URL   e.g /ui-webportal-server/app/page/error
export const ERROR_PAGE_URL_404 = '/error_404'; // Add error page URL   e.g /ui-webportal-server/app/page/error
export const ERROR_PAGE_URL_500 = '/error_500'; // Add error page URL   e.g /ui-webportal-server/app/page/error
export const ERROR_PAGE_URL_503 = '/error_503'; // Add error page URL   e.g /ui-webportal-server/app/page/error
const REST_MESSAGE_SUCCESS = "SUCCESS"
export const REST_ROOT_ENDPOINT = configurationData && configurationData.serviceURL ? configurationData.serviceURL : "http://localhost:5000"

export function getCookie(n = 'lang') {
    let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
    return a ? a[1] : '';
}

export const ALREADY_REDIRECTED_TO_ERROR_PAGE = "ALREADY_REDIRECTED_TO_ERROR_PAGE";

export const fetchActions = Object.freeze({
    GET: 'GET',
    GET_ONE: 'GET_ONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DELETE_PARAMS: 'DELETE_PARAMS',
    GET_LIST: "GET_LIST"
});

export const fetchJson = (url, options = {}, contentTypeReturned, responseHandler) => {
    const requestHeaders = options.headers || new Headers({ 'Accept': 'application/json' });
    if (!requestHeaders.has('Content-Type') && (options && options.body)) {
        requestHeaders.set('Content-Type', 'application/json');

    }
    requestHeaders.set('Authorization', getCookie('jwt'));
    return fetch(`${REST_ROOT_ENDPOINT}${url}`, { ...options, headers: requestHeaders })
        .then((response) => {
            return handleServerResponse(response, responseHandler);
        }
        ).catch((error) => {
            throw error;
        })
}

const handleServerResponse =
    (response, responseHandler) => {
        let status = response.status;
        if (status) {
            response.clone().json().then((responseJson) => {
                if (responseJson) {
                    return resolveStatusCode(responseJson, status, responseHandler);
                }

            });
        }
    };

const resolveStatusCode =
    (responseJson, status, responseHandler) => {
        switch (status) {
            case 400:
                if (responseHandler && responseHandler.onError) {
                    responseHandler.onError(responseJson)
                }
                break;
            case 403:
                window.location = ERROR_PAGE_URL_403;
                break;
            case 404:
                window.location = ERROR_PAGE_URL_404;
                break;
            case 500:
                if (responseHandler && responseHandler.onError) {
                    responseHandler.onError(responseJson)
                }
                break;
            case 503:
                window.location = ERROR_PAGE_URL_503;
                break;
            case 200:
            case 201:
                if (responseHandler && responseHandler.onSuccess) {
                    responseHandler.onSuccess(responseJson)
                }
            case 204:
                if (responseHandler && responseHandler.onSuccess) {
                    responseHandler.onSuccess()
                }
                break;
            default:
                throw new Error('ERROR_CODE_GENERIC');
        }
    };

export default (apiUrl, httpClient = fetchJson) => {

    const convertDataToHTTPRequest = (type, resource, params, contentType, responseHandler) => {
        let url = '';
        const options = {};
        const contentTypeReturned = contentType;
        options.credentials = 'same-origin';
        switch (type) {
            case fetchActions.GET:
                url = concanateGetOprions(apiUrl, resource, params);
                break;
            case fetchActions.GET_ONE:
                url = `${concanate(apiUrl, resource)}/${params.id}`;
                break;
            case fetchActions.UPDATE:
                url = `${concanate(apiUrl, resource)}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case fetchActions.CREATE:
                url = concanate(apiUrl, resource);
                options.method = 'POST';
                options.body = JSON.stringify(params);
                console.log("body :", params);
                break;
            case fetchActions.DELETE:
                url = `${concanate(apiUrl, resource)}/${params.id}`;
                options.method = 'DELETE';
                break;
            case fetchActions.DELETE_PARAMS:
                url = concanateGetOprions(apiUrl, resource, params);
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options, contentTypeReturned, responseHandler };
    };

    return (type, resource, params, contentType, responseHandler) => {
        const { url, options, contentTypeReturned } = convertDataToHTTPRequest(type, resource, params, contentType);
        return httpClient(url, options, contentTypeReturned, responseHandler);
    };
}
function concanateGetOprions(prefix, value, options) {
    let root = concanate(prefix, value)
    return options ? `${root}?${encodeQueryData(options)}` : root
}
function concanate(prefix, value) {
    return (prefix && value) ? `${prefix}/${value}` : prefix
}
function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

