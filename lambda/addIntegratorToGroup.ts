import {APIGatewayEvent} from "aws-lambda";
import {addIntegratorToGroup} from "./Utils/DatabaseUtils";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";
import {defaultHeaders} from "./Constants/defaultHeaders";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const {integratorID, integratorGroupID, userID} = JSON.parse(event.body || '')
        const addIntegratorToGroupRequest = await addIntegratorToGroup(integratorID, integratorGroupID, userID)
        if(addIntegratorToGroupRequest) return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Successfully added integrator to group' }),
        }
        return defaultErrorMessage
    }
    catch(e) {
        return defaultErrorMessage
    }
}