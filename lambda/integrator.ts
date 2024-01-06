import {createIntegrator} from "./Utils/DatabaseUtils";
import {APIGatewayEvent} from "aws-lambda";

exports.handler = async (event: APIGatewayEvent) => {
    try{
        const {location, serialNumber, userID} = JSON.parse(event.body || '')
        if(location && serialNumber && userID) {
            const createIntegratorRequest = await createIntegrator({location: location, serialNumber: serialNumber, userID: userID})
            if('error' in createIntegratorRequest){
                return {
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Internal server error' }),
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(createIntegratorRequest, null, 2)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Missing params' }),
        }
    }
    catch (e) {
        console.error('Error adding integrator', e)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
}