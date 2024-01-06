import {APIGatewayEvent} from "aws-lambda";
import {addUserToIntegratorGroup} from "./Utils/DatabaseUtils";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const {integratorGroupID, userID, addedUserID} = JSON.parse(event.body || '')
        const addUserToGroupRequest = await addUserToIntegratorGroup(integratorGroupID, userID, addedUserID)
        if(addUserToGroupRequest) return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Successfully added user to integrator group' })
        }
        console.error('Could not add user to group')
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Could not add user to group' })
        }
    }
    catch (e) {
        console.error('Internal server error', e)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Internal server error' })
        }
    }
}