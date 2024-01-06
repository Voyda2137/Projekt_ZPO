import {APIGatewayEvent} from "aws-lambda";
import {createIntegratorGroup} from "./Utils/DatabaseUtils";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const {integratorGroupName, userID} = JSON.parse(event.body || '')
        const createIntegratorGroupRequest = await createIntegratorGroup(integratorGroupName, userID)
        if('error' in createIntegratorGroupRequest){
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ message: 'Internal server error' }),
            }
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(createIntegratorGroupRequest, null, 2)
        }
    }
    catch (e) {
        console.error("Error: ", e)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Internal server error' }),
        }
    }
}