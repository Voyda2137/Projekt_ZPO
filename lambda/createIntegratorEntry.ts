import {APIGatewayEvent} from "aws-lambda";
import {createEntry} from "./Utils/DatabaseUtils";
import {defaultHeaders} from "./Constants/defaultHeaders";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";

exports.handler = async(event: APIGatewayEvent) => {
    const {integratorID, utcDateTime, rate, speed, total} = JSON.parse(event.body || '')
    if(integratorID && utcDateTime && rate && speed && total) {
        const createEntryRequest = await createEntry(integratorID, utcDateTime, rate, speed, total)
        if(createEntryRequest) {
            console.log('xd', createEntryRequest)
            return {
                statusCode: 200,
                headers: defaultHeaders,
                body: JSON.stringify({message: 'Successfully created the entry'})
            }
        }
        console.error('Could not create integrator entry', createEntryRequest)
        return defaultErrorMessage
    }
    console.error('Missing params')
    return defaultErrorMessage
}