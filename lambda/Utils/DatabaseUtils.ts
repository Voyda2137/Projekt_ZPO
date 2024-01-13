import {IUser} from "../../Interfaces/IUser";
import {DynamoDB} from "aws-sdk";
import {Integrator} from "../../Interfaces/IIntegrator";
import {IntegratorGroup} from "../../Interfaces/IIntegratorGroup";
import {IntegratorEntry} from "../../Interfaces/IIntegratorEntry";

const moment = require('moment')

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

export const getUserByID = async (userID: string): Promise<IUser> => {
    const params: DynamoDB.GetItemInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        Key: { PK: { S: userID }, SK: {S: 'user'} }
    }
    try {
        const result = await dynamoDB.getItem(params).promise();

        if (result.Item) {
            return DynamoDB.Converter.unmarshall(result.Item) as IUser;
        }
        throw new Error('Error getting user')
    }
    catch (e) {
        console.error('Error getting user: ', e);
        throw e;
    }
}

export const createUser = async (user: IUser): Promise<IUser | { error: string }> => {

    const { login, password, name, surname, role, manager }: IUser = user

    const userID = generateId()

    const userParams: IUser = {
        userID,
        login,
        password: password || '',
        name: name || '',
        surname: surname || '',
        role: {
          isService: false,
          isManager: false
        },
        integratorGroups: [],
        type: "user",
        manager: ""
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
        userParams.role.isService = role.isService || false
        userParams.role.isManager = role.isManager || false
    }
    const item: Record<string, any> = {
        PK: { S: userParams.userID },
        SK: { S: userParams.type },
        login: { S: userParams.login },
        name: { S: userParams.name },
        surname: { S: userParams.surname },
        password: { S: userParams.password },
        role: {
            M: {
                isService: { BOOL: userParams.role.isService },
                isManager: { BOOL: userParams.role.isManager }
            }
        },
        integratorGroups: { L: [] }
    };

    if (manager) {
        item.manager = {S: manager}
    }

    const params: DynamoDB.PutItemInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        Item: item
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
    const user = await getUserByID(userID)
    if(!user.role.isManager && !user.role.isService) return {error: `Unauthorized, user: ${user.role.isManager}`}
    const integratorID = generateId()
    const createIngergratorParams: Integrator = {
        integratorID: integratorID,
        location: location,
        serialNumber: serialNumber,
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
            IntegratorEntries: {L: []}
        }
    }
    try {
        await dynamoDB.putItem(createIntegratorRequest).promise()
        return createIngergratorParams
    }
    catch (e) {
        console.error('Error creating integrator', e)
        return {error: `Error creating integrator: ${e}`}
    }
}

export const getIntegrators = async (user: IUser): Promise<Integrator[] | boolean> => {
    const {isService} = user.role
    if(isService){
        const getIntegratorsParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            FilterExpression: 'SK = :type',
            ExpressionAttributeValues: {
                ":type": {S: "integrator"}
            }
        }
        const result = await dynamoDB.scan(getIntegratorsParams).promise()
        if(result.Items && result.Items.length > 0){
            return  result.Items.map(item => {
                return DynamoDB.Converter.unmarshall(item) as Integrator;
            });
        }
        return false
    }
    else {
        const integratorGroupsObject: DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};
        user.integratorGroups.forEach((integrator, idx) => {
            const groupKey = ":group" + idx
            integratorGroupsObject[groupKey] = { S: integrator }
        })
        const getIntegratorsRequest = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            FilterExpression: user.integratorGroups.map((_, idx) => `integratorGroup IN (:group${idx})`).join(' OR '),
            ExpressionAttributeValues: integratorGroupsObject,
        }

        const getIntegrators = await dynamoDB.scan(getIntegratorsRequest).promise()
        if(getIntegrators.Items && getIntegrators.Items.length > 0){
            return  getIntegrators.Items.map(item => {
                return DynamoDB.Converter.unmarshall(item) as Integrator;
            });
        }
        return false
    }
}

export const addUserToIntegratorGroup = async (integratorGroupID: string | undefined, userID: string, addedUserID: string): Promise<boolean> => {
    try {
        const user = await getUserByID(userID)
        if(user.role.isManager || user.role.isService){
            const addUserToGroupParams = {
                TableName: process.env.DYNAMODB_TABLE_NAME || '',
                Key: { PK: { S: addedUserID }, SK: {S: 'user'} },
                UpdateExpression: 'SET integratorGroups = list_append(integratorGroups, :group)',
                ExpressionAttributeValues: {
                    ':group': { L: [{ S: integratorGroupID }] }
                },
            }
            await dynamoDB.updateItem(addUserToGroupParams).promise()
            return true
        }
        return false
    }
    catch (e) {
        console.error("Error adding user to group", e)
        return false
    }
}

export const createIntegratorGroup = async (integratorGroupName: string, userID: string): Promise<IntegratorGroup | { error: string }> => {
    const integratorGroupID = generateId()
    const createIntegratorGroupParams: IntegratorGroup = {
        integratorGroupID: integratorGroupID,
        integratorGroupName: integratorGroupName,
        type: "integratorGroup"
    }
    const createIntegratorGroupRequest: DynamoDB.PutItemInput = {
        TableName: process.env.DYNAMODB_TABLE_NAME || '',
        Item: {
            PK: {S: createIntegratorGroupParams.integratorGroupID},
            SK: {S: createIntegratorGroupParams.type},
            integratorGroupName: {S: createIntegratorGroupParams.integratorGroupName},
        }
    }
    const user = await getUserByID(userID)
    if(user.role.isManager || user.role.isService) {
        try {
            const createIntegratorGroupQuery = await dynamoDB.putItem(createIntegratorGroupRequest).promise()
            if(createIntegratorGroupQuery.$response.httpResponse.statusCode === 200){
                const addUserToGroupQuery = await addUserToIntegratorGroup(createIntegratorGroupParams.integratorGroupID, userID, userID)
                if(addUserToGroupQuery) return createIntegratorGroupParams
            }
            console.error("Error adding user to integrator group:")
            return {error: 'Error adding user to integrator group'}
        }
        catch (e) {
            console.error("Error creating integrator group: ", e)
            return {error: 'Error creating integrator group'}
        }
    }
    throw new Error('User is not authorized to create an Integrator Group')
}

export const addIntegratorToGroup = async(integratorID: string, integratorGroupID: string, userID: string): Promise<boolean> => {
    const user = await getUserByID(userID)
    if(user.role.isManager || user.role.isService) {
        try {
            const addIntegratorToGroupParams = {
                TableName: process.env.DYNAMODB_TABLE_NAME || '',
                Key: {PK: {S: integratorID}, SK: {S: 'integrator'}},
                UpdateExpression: 'SET integratorGroup = :integratorGroupID',
                ExpressionAttributeValues: {
                    ':integratorGroupID': {S: integratorGroupID}
                }
            }
            await dynamoDB.updateItem(addIntegratorToGroupParams).promise()
            return true
        } catch (e) {
            console.error('Error adding integrator to group')
            return false
        }
    }
    throw new Error('User is not authorized to add an integrator to group')
}

export const getIntegratorGroups = async(userID: string) =>{
    const user = await getUserByID(userID)
    if(user.role.isService){
        const getIntegratorGroupsParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            FilterExpression: 'SK = :type',
            ExpressionAttributeValues: {
                ":type": {S: "integratorGroup"}
            }
        }
        const result = await dynamoDB.scan(getIntegratorGroupsParams).promise()
        if(result.Items && result.Items.length > 0){
            return  result.Items.map(item => {
                return DynamoDB.Converter.unmarshall(item) as IntegratorGroup;
            });
        }
        return false
    }
    else {
        const integratorGroupsMap: { S: string }[] = [];
        user.integratorGroups.forEach(group => {
            integratorGroupsMap.push({
                S: group
            });
        });

        const keys = integratorGroupsMap.map(item => ({
            SK: { S: 'integratorGroup' },
            PK: { S: item.S }
        }));

        const getIntegratorGroupsParams: DynamoDB.DocumentClient.BatchGetItemInput = {
            RequestItems: {
                [process.env.DYNAMODB_TABLE_NAME || '']: {
                    Keys: keys
                }
            }
        };

        const result = await dynamoDB.batchGetItem(getIntegratorGroupsParams).promise();
        if (result.Responses && result.Responses[process.env.DYNAMODB_TABLE_NAME || '']) {
            return result.Responses[process.env.DYNAMODB_TABLE_NAME || ''].map(item => {
                return DynamoDB.Converter.unmarshall(item) as IntegratorGroup;
            });
        }
        return false
    }
}

export const getWorkers = async(managerID: string): Promise<IUser[] | { error: string }> => {
    try {
        const getWorkersRequest = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            FilterExpression: 'manager = :value',
            ExpressionAttributeValues: {
                ':value': {S: managerID}
            }
        }
        const getWorkersQuery = await dynamoDB.scan(getWorkersRequest).promise()
        if(getWorkersQuery.Items && getWorkersQuery.Items.length > 0){
            return getWorkersQuery.Items.map(item => {
                const user = DynamoDB.Converter.unmarshall(item) as IUser
                delete(user.password)
                return user
            })
        }
        return {error: 'No workers found'}
    }
    catch (e) {
        return {error: `Error getting users: ${e}`}
    }
}

export const createEntry = async(integratorID: string, utcDateTime: number, rate: number, speed: number, total: number): Promise<boolean | {error: string}> => {
    try {
        const integratorEntry: IntegratorEntry = {
            utcDateTime: utcDateTime,
            utcCreationTime: +moment(),
            rate: rate,
            speed: speed,
            total: total
        }
        const createEntryRequest = {
            TableName: process.env.DYNAMODB_TABLE_NAME || '',
            Key: {PK: {S: integratorID}, SK: {S: 'integrator'}},
            UpdateExpression: 'SET IntegratorEntries = list_append(IntegratorEntries, :integratorEntry)',
            ExpressionAttributeValues: {
                ':integratorEntry': { L: [{
                    M: {
                        utcDateTime: { N: integratorEntry.utcDateTime.toString() },
                        utcCreationTime: { N: integratorEntry.utcCreationTime.toString() },
                        rate: { N: integratorEntry.rate.toString() },
                        speed: { N: integratorEntry.speed.toString() },
                        total: { N: integratorEntry.total.toString() }
                    }
                }]}
            }
        }
        const query = await dynamoDB.updateItem(createEntryRequest).promise()
        if(query.$response.httpResponse.statusCode === 200){
            return true
        }
        else return {error: `Could not create the entry: ${query.$response.error}`}
    }
    catch (e) {
        return {error: `${e}`}
    }
}