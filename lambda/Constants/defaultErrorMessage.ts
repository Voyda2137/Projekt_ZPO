import {defaultHeaders} from "./defaultHeaders";

export const defaultErrorMessage = {
    statusCode: 500,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message: 'Internal server error' }),
}