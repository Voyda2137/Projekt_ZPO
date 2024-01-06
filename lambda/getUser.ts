import {APIGatewayEvent} from "aws-lambda";
import {getUserByLogin} from "./Utils/DatabaseUtils";

exports.handler = async(event: APIGatewayEvent) => {
    try {
        const header = event.headers['From']

        if(header){
            const getUser = await getUserByLogin(header)
            if(getUser){
                delete getUser.password
                return {
                    statusCode: 200,
                    body: JSON.stringify({user: getUser}, null, 2)
                }
            }
            else return {
                statusCode: 500,
                body: JSON.stringify({message: 'Internal Server Error'})
            }
        }
        else{
            console.error('Header is missing')
            return {
                statusCode: 500,
                body: JSON.stringify({message: 'Internal Server Error'})
            }
        }
    }
    catch (e) {
        console.error('Error ', e)
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'})
        }
    }
}