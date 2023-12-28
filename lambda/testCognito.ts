import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';
import {IUser} from "../Interfaces/IUser";
import {generateTmpPwd} from "./Utils/UserUtils";

exports.handler = async function(event: IUser) {
    const userPoolID = process.env.USER_POOL_ID || ""
    const userPoolClientId = process.env.USER_POOL_CLIENT_ID || ''
    const dynamoDBTableName = process.env.DYNAMODB_TABLE_NAME || ''

    const cognitoClient = new CognitoIdentityServiceProvider()
    const dynamoDB = new DynamoDB()

    try {
        if(event.username && event.email) {
            const tmpPassword = await generateTmpPwd()
            const createUserParams: CognitoIdentityServiceProvider.Types.AdminCreateUserRequest = {
                UserPoolId: userPoolID,
                Username: event.username,
                TemporaryPassword: tmpPassword,
                UserAttributes: [
                    {Name: 'email', Value: event.email},
                    {Name: 'given_name', Value: event.givenName},
                    {Name: 'family_name', Value: event.familyName},
                    {Name: 'preferred_username', Value: event.username}
                ]
            }
            const createUser = await cognitoClient.adminCreateUser(createUserParams).promise()
            if(createUser){

                const dynamoDBParams: DynamoDB.Types.PutItemInput = {
                    TableName: dynamoDBTableName,
                    Item: {
                        UserID: {S: createUser.User?.Username},
                        Email: {S: event.email},
                        Name: {S: event.givenName},
                        Surname: {S: event.familyName},
                    }
                }

                await dynamoDB.putItem(dynamoDBParams).promise()
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'User created',
                    user: createUser.User
                })
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Missing attribute email'
            })
        }
    }
    catch (e) {
        console.error('Error creating user', e)

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal Server Error'
            })
        }
    }

}