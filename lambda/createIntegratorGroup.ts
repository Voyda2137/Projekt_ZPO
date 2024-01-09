import {APIGatewayEvent} from "aws-lambda";
import {createIntegratorGroup} from "./Utils/DatabaseUtils";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";
import {defaultHeaders} from "./Constants/defaultHeaders";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const {integratorGroupName, userID} = JSON.parse(event.body || '')
        const createIntegratorGroupRequest = await createIntegratorGroup(integratorGroupName, userID)
        if('error' in createIntegratorGroupRequest){
            return defaultErrorMessage
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
        return defaultErrorMessage
    }
}