import {IUser} from "../Interfaces/IUser";
import {userLogin} from "./Utils/DatabaseUtils";
import {APIGatewayEvent} from "aws-lambda";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const userObject: IUser = JSON.parse(event.body || '')
        if(userObject.login && userObject.password){
            const loginRequest = await userLogin({login: userObject.login, password: userObject.password})
            if(loginRequest) return {
                statusCode: 200,
                body: JSON.stringify({
                    user: {
                        login: loginRequest.login,
                        name: loginRequest.name,
                        surname: loginRequest.surname,
                        role: loginRequest.role,
                        integratorGroups: loginRequest.integratorGroups
                    }
                }, null, 2)
            }
            else {
                console.log('Error while trying to login')
                return {
                    statusCode: 500,
                    body: JSON.stringify({message: 'Internal Server Error'})
                }
            }
        }
        else {
            console.log('Missing login or password')
            return {
                statusCode: 500,
                body: JSON.stringify({message: 'Internal Server Error'})
            }
        }
    }
    catch (e) {
        console.log('Error: ', e)
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Internal Server Error'})
        }
    }
}
