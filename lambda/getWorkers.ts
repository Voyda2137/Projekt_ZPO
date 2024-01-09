import {APIGatewayEvent} from "aws-lambda";
import {getUserByID, getWorkers} from "./Utils/DatabaseUtils";
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
            const getUser = await getUserByID(header)
            if(getUser.role.isManager){
                const workers = await getWorkers(header)
                if('error' in workers){
                    console.error('Error in workers', workers.error)
                    return defaultErrorMessage
                }
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                    },
                    body: JSON.stringify({workers: workers}, null, 2)
                }
            }
            console.error('User is not a manager')
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