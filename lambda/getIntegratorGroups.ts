import {APIGatewayEvent} from "aws-lambda";
import {getIntegratorGroups} from "./Utils/DatabaseUtils";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";

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
            const integratorGroups = await getIntegratorGroups(header)
            if(integratorGroups) return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                },
                body: JSON.stringify({integratorGroups: integratorGroups}, null, 2)
            }
            console.error('No integrator groups found')
            return defaultErrorMessage
        }
        console.error('Missing header')
        return defaultErrorMessage
    }
    catch (e) {
        console.error('Error: ', e)
        return defaultErrorMessage
    }
}