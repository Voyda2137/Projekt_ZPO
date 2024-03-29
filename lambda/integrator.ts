import {createIntegrator} from "./Utils/DatabaseUtils";
import {APIGatewayEvent} from "aws-lambda";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";
import {defaultHeaders} from "./Constants/defaultHeaders";

exports.handler = async (event: APIGatewayEvent) => {
    try{
        const {location, serialNumber, userID} = JSON.parse(event.body || '')
        if(location && serialNumber && userID) {
            const createIntegratorRequest = await createIntegrator({location: location, serialNumber: serialNumber, userID: userID})
            if('error' in createIntegratorRequest){
                console.error('Error in createIntegratorRequest: ',createIntegratorRequest.error)
                return defaultErrorMessage
            }
            return {
                statusCode: 200,
                headers: defaultHeaders,
                body: JSON.stringify(createIntegratorRequest, null, 2)
            }
        }
        console.error('missing params')
        return defaultErrorMessage
    }
    catch (e) {
        console.error('Error adding integrator: ', e)
        return defaultErrorMessage
    }
}