import {Duration, Stack, StackProps} from 'aws-cdk-lib/core';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class ProjektZpoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const integratorTable = new dynamodb.Table(this, 'IntegratorTable', {
      partitionKey: {name: 'PK', type: dynamodb.AttributeType.STRING},
      sortKey: {name: 'SK', type: dynamodb.AttributeType.STRING}
    })
    integratorTable.addGlobalSecondaryIndex({
      indexName: 'loginIndex',
      partitionKey: {name: 'login', type: dynamodb.AttributeType.STRING}
    })

    // Start user

    const userApi = new apigw.RestApi(this, 'user', {
      restApiName: 'userApi',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: ['*']
      },
      defaultMethodOptions: {
        authorizationType: apigw.AuthorizationType.NONE,
        authorizer: undefined,
        authorizationScopes: undefined,
        apiKeyRequired: false
      }
    })

    const registerUser = new lambda.Function(this, 'registerUser', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'register.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName
      },
      memorySize: 1024
    })

    const registerUserResource = userApi.root.addResource('register')
    const registerUserIntegration = new apigw.LambdaIntegration(registerUser)

    registerUserResource.addMethod('POST', registerUserIntegration)
    integratorTable.grantReadWriteData(registerUser)

    const userLoginResource = userApi.root.addResource('login')

    const userLogin = new lambda.Function(this, 'userLogin', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'login.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const userLoginIntegration = new apigw.LambdaIntegration(userLogin)

    userLoginResource.addMethod('POST', userLoginIntegration)
    integratorTable.grantReadData(userLogin)

    const getUser = new lambda.Function(this, 'getUser', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getUser.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const getUserResource = userApi.root.addResource('getUser')
    const getUserIntegration = new apigw.LambdaIntegration(getUser)

    getUserResource.addMethod('GET', getUserIntegration, {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    })
    integratorTable.grantReadData(getUser)

    const addUserToIntegratorGroup = new lambda.Function(this, 'addUserToGroup', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'addUserToGroup.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    integratorTable.grantReadWriteData(addUserToIntegratorGroup)

    const editUserResource = userApi.root.addResource('editUser')
    editUserResource.addMethod('PUT', new apigw.LambdaIntegration(addUserToIntegratorGroup))

    const getWorkers = new lambda.Function(this, 'getWorkers', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getWorkers.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const getWorkersResource = userApi.root.addResource('getWorkers')
    getWorkersResource.addMethod('GET', new apigw.LambdaIntegration(getWorkers), {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    })

    integratorTable.grantReadData(getWorkers)
    // End user

    // Start integrator

    const integratorApi = new apigw.RestApi(this, 'IntegratorApi', {
      restApiName: 'IntegratorAPI',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: ['*'],
      },
      defaultMethodOptions: {
        authorizationType: apigw.AuthorizationType.NONE,
        authorizer: undefined,
        authorizationScopes: undefined,
        apiKeyRequired: false
      }
    })

    const integratorLambda = new lambda.Function(this, 'IntegratorLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'integrator.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName
      },
      memorySize: 1024
    })

    const getIntegrators = new lambda.Function(this, 'GetIntegrators', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getIntegrators.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName
      },
      memorySize: 3008,
      timeout: Duration.seconds(10)
    })

    const integratorEntryLambda = new lambda.Function(this, 'IntegratorEntryLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'createIntegratorEntry.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const integratorGroupLambda = new lambda.Function(this, 'IntegratorGroupLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'createIntegratorGroup.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const addIntegratorToGroupLambda = new lambda.Function(this, 'AddIntegratorToGroupLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'addIntegratorToGroup.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const getIntegratorGroupsLambda = new lambda.Function(this, 'GetIntegratorGroups', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getIntegratorGroups.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      },
      memorySize: 1024
    })

    const integratorResource = integratorApi.root.addResource('integrator')
    integratorResource.addMethod('POST', new apigw.LambdaIntegration(integratorLambda))
    integratorResource.addMethod('GET', new apigw.LambdaIntegration(getIntegrators), {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    })

    integratorTable.grantReadWriteData(integratorLambda);
    integratorTable.grantReadData(getIntegrators)

    const integratorGroupResource = integratorApi.root.addResource('integratorGroup')
    integratorGroupResource.addMethod('POST', new apigw.LambdaIntegration(integratorGroupLambda))
    integratorGroupResource.addMethod('PUT', new apigw.LambdaIntegration(addIntegratorToGroupLambda))
    integratorGroupResource.addMethod('GET', new apigw.LambdaIntegration(getIntegratorGroupsLambda), {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    })

    integratorTable.grantReadWriteData(integratorGroupLambda);
    integratorTable.grantReadWriteData(addUserToIntegratorGroup)
    integratorTable.grantReadWriteData(addIntegratorToGroupLambda)
    integratorTable.grantReadData(getIntegratorGroupsLambda)

    const integratorEntryResource = integratorApi.root.addResource('integratorEntry')
    integratorEntryResource.addMethod('POST', new apigw.LambdaIntegration(integratorEntryLambda))

    integratorTable.grantReadWriteData(integratorEntryLambda);

  }
}
