import {IUser} from "../../Interfaces/IUser";
import {DynamoDB} from "aws-sdk";
import {Integrator} from "../../Interfaces/IIntegrator";

const crypto = require('crypto')

const dynamoDB = new DynamoDB()

export const generateId = (): string => {
    return crypto.randomBytes(16).toString('hex')
}

export const getUserByLogin = async (login: string): Promise<IUser | false> => {
    const params: DynamoDB.QueryInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        IndexName: 'loginIndex',
        KeyConditionExpression: 'login = :login',
        ExpressionAttributeValues: {
            ':login': {S: login}
        }
    };

    try {
        const result = await dynamoDB.query(params).promise();

        if (result.Items && result.Items.length > 0) {
            return DynamoDB.Converter.unmarshall(result.Items[0]) as IUser;
        }
        else return false
    }
    catch (e) {
        console.error('Error getting user: ', e);
        throw e;
    }
};

export const createUser = async (user: IUser): Promise<IUser | { error: string }> => {

    const { login, password, name, surname, role }: IUser = user

    const userParams: IUser = {
        login,
        password: password || '',
        name: name || '',
        surname: surname || '',
        role: {
            isService: role.isService || false,
            isManager: role.isManager || false,
        },
        integratorGroups: [],
        type: "user"
    };
    if(!login) {
        return {
            error: 'Missing login'
        }
    }

    const userWithGivenLoginExists = await getUserByLogin(login)

    if(userWithGivenLoginExists) return {
        error: 'User already exists'
    }

    if (role) {
        user.role.isService = role.isService || false
        user.role.isManager = role.isManager || false
    }

    const userId = generateId()

    const params: DynamoDB.PutItemInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        Item: {
            PK: { S: userId },
            SK: { S: userParams.type},
            login: {S: userParams.login},
            name: {S: userParams.name},
            surname: {S: userParams.surname},
            password: {S: userParams.password},
            role: {
                M: {
                    isService: {BOOL: userParams.role.isService},
                    isManager: {BOOL: userParams.role.isManager}
                }
            },
            integratorGroups: {L: []}
        },
    }
    try{
        await dynamoDB.putItem(params).promise()
        return userParams
    }
    catch (e) {
        return {
            error: "Error while creating user " + e
        }
    }
}

export const userLogin = async ({login, password}: {login: string, password: string}): Promise<IUser | false> => {
    const params: DynamoDB.QueryInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        IndexName: 'loginIndex',
        KeyConditionExpression: 'login = :login',
        ExpressionAttributeValues: {
            ':login': {S: login}
        }
    }
    try {
        const result = await dynamoDB.query(params).promise()
        if(result.Items && result.Items.length > 0){
            const user = result.Items.find(item => item.password.S === password)
            if(user) return DynamoDB.Converter.unmarshall(user) as IUser
            else return false
        }
        else return false
    }
    catch (e) {
        console.error('User does not exist or incorrect login info: ', e);
        throw e;
    }
}

export const createIntegrator = async({location, serialNumber, userID}: {location: string, serialNumber: string, userID: string}):Promise<Integrator| { error: string }> => {
    if(!location || !serialNumber || !userID) return {error: 'Missing params'}
    const integratorID = generateId()
    const createIngergratorParams: Integrator = {
        integratorID: integratorID,
        location: location,
        serialNumber: serialNumber,
        IntegratorGroup: [],
        IntegratorEntries: [],
        type: "integrator"
    }
    const createIntegratorRequest: DynamoDB.PutItemInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        Item: {
            PK: {S: integratorID},
            SK: {S: createIngergratorParams.type},
            userID: {S: userID},
            location: {S: createIngergratorParams.location},
            serialNumber: {S: createIngergratorParams.serialNumber},
            IntegratorGroup: {L: []},
            IntegratorEntries: {L: []}
        }
    }
    try {
        await dynamoDB.putItem(createIntegratorRequest).promise()
        return createIngergratorParams
    }
    catch (e) {
        console.error('Error creating integrator', e)
        return {error: 'Error creating integrator'}
    }
}

export const getIntegrators = async (user: IUser): Promise<Integrator[] | boolean> => {
    const {isService} = user.role
    if(isService){
        const getIntegratorsParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            KeyConditionExpression: 'SK = :type',
            ExpressionAttributeValues: {
                ":type": {S: "integrator"}
            }
        }
        const result = await dynamoDB.query(getIntegratorsParams).promise()
        if(result.Items && result.Items.length > 0){
            return  result.Items.map(item => {
                return DynamoDB.Converter.unmarshall(item) as Integrator;
            });
        }
        return false
    }
    else {
        return false // tu później będzie get na integratorGroups i stąd wyciągne integratory pojedynczo
    }
}