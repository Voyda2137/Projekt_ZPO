import {APIGatewayEvent} from "aws-lambda";
import {getIntegrators, getUserByLogin} from "./Utils/DatabaseUtils";

exports.handler = async(event: APIGatewayEvent) => {
    try {
        const header = event.headers['From']
        if(header){
            const user = await getUserByLogin(header)
            if(user){
                const integrators = await getIntegrators(user)
                if(integrators) return {
                    statusCode: 200,
                    body: JSON.stringify({integrators: integrators}, null, 2)
                }
            }
            console.error('No user found')
        }
        console.error('Missing header')
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Internal server error'})
        }
    }
    catch (e) {
        console.error('Error: ', e)
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Internal server error'})
        }
    }
}