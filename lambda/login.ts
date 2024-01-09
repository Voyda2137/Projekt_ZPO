import {IUser} from "../Interfaces/IUser";
import {userLogin} from "./Utils/DatabaseUtils";
import {APIGatewayEvent} from "aws-lambda";
import {defaultHeaders} from "./Constants/defaultHeaders";
import {defaultErrorMessage} from "./Constants/defaultErrorMessage";

exports.handler = async (event: APIGatewayEvent) => {
    try {
        const userObject: IUser = JSON.parse(event.body || '')
        if(userObject.login && userObject.password){
            const loginRequest = await userLogin({login: userObject.login, password: userObject.password})
            if(loginRequest) return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
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
                return defaultErrorMessage
            }
        }
        else {
            console.log('Missing login or password')
            return defaultErrorMessage
        }
    }
    catch (e) {
        console.log('Error: ', e)
        return defaultErrorMessage
    }
}
