import {IUser} from "../Interfaces/IUser";
import {createUser} from "./Utils/DatabaseUtils";
import {APIGatewayEvent} from "aws-lambda";

const table = process.env.DYNAMODB_TABLE_NAME || ''

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const userObject: IUser = JSON.parse(event.body || '')
        const createUserRequest = await createUser(userObject)

        if('error' in createUserRequest){
            console.error('Error creating user: ', createUserRequest.error)
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal server error' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Successfully created user!'})
        }


    }
    catch (e) {
        console.error('Error during registration: ', e)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
}
