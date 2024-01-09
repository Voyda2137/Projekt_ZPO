import {APIGatewayEvent} from "aws-lambda";
import {createIntegratorGroup} from "./Utils/DatabaseUtils";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";
import {defaultHeaders} from "./Constants/defaultHeaders";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const {integratorGroupName, userID} = JSON.parse(event.body || '')
        const createIntegratorGroupRequest = await createIntegratorGroup(integratorGroupName, userID)
        if('error' in createIntegratorGroupRequest){
            console.error('Error in createIntegratorGroupRequest: ', createIntegratorGroupRequest.error)
            return defaultErrorMessage
        }
        return {
            statusCode: 200,
            headers: defaultHeaders,
            body: JSON.stringify(createIntegratorGroupRequest, null, 2)
        }
    }
    catch (e) {
        console.error("Error: ", e)
        return defaultErrorMessage
    }
}