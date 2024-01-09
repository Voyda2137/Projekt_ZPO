import {APIGatewayEvent} from "aws-lambda";
import {getUserByLogin} from "./Utils/DatabaseUtils";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";
import {defaultHeaders} from "./Constants/defaultHeaders";

exports.handler = async(event: APIGatewayEvent) => {
    try {
        console.log('Request: ', event.headers)
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                },
                body: '',
            };
        }

        const header = event.headers['from']

        if(header){
            const getUser = await getUserByLogin(header)
            if(getUser){
                delete getUser.password
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                    },
                    body: JSON.stringify({user: getUser}, null, 2)
                }
            }
            console.error('No user found')
            return defaultErrorMessage
        }
        else{
            console.error('Header is missing')
            return defaultErrorMessage
        }
    }
    catch (e) {
        console.error('Error ', e)
        return defaultErrorMessage
    }
}