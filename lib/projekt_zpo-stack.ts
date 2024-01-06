import {Duration, Stack, StackProps} from 'aws-cdk-lib/core';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class ProjektZpoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const queue = new sqs.Queue(this, 'ProjektZpoQueue', {
      visibilityTimeout: Duration.seconds(300)
    })

    const topic = new sns.Topic(this, 'ProjektZpoTopic')

    topic.addSubscription(new subs.SqsSubscription(queue))

    const integratorTable = new dynamodb.Table(this, 'IntegratorTable', {
      partitionKey: {name: 'PK', type: dynamodb.AttributeType.STRING},
      sortKey: {name: 'SK', type: dynamodb.AttributeType.STRING}
    })
    integratorTable.addGlobalSecondaryIndex({
      indexName: 'SKIndex',
      partitionKey: {name: 'SK', type: dynamodb.AttributeType.STRING}
    })

    // Start user

    const userApi = new apigw.RestApi(this, 'user', {
      restApiName: 'userApi',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
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
      }
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
    })

    const getUserResource = userApi.root.addResource('getUser')
    const getUserIntegration = new apigw.LambdaIntegration(getUser)

    getUserResource.addMethod('GET', getUserIntegration)
    integratorTable.grantReadData(getUser)

    // End user

    // Start integrator

    const integratorApi = new apigw.RestApi(this, 'IntegratorApi', {
      restApiName: 'IntegratorAPI',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
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
      }
    })

    const getIntegrators = new lambda.Function(this, 'GetIntegrators', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getIntegrators.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName
      }
    })

    const integratorEntryLambda = new lambda.Function(this, 'IntegratorEntryLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'integratorEntry.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      }
    })

    const integratorGroupLambda = new lambda.Function(this, 'IntegratorGroupLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'integratorGroup.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DYNAMODB_TABLE_NAME: integratorTable.tableName,
      }
    })

    const integratorResource = integratorApi.root.addResource('integrator')
    integratorResource.addMethod('POST', new apigw.LambdaIntegration(integratorLambda))

    const integratorEntryResource = integratorApi.root.addResource('integratorEntry')
    integratorEntryResource.addMethod('POST', new apigw.LambdaIntegration(integratorEntryLambda))

    const integratorGroupResource = integratorApi.root.addResource('integratorGroup')
    integratorGroupResource.addMethod('POST', new apigw.LambdaIntegration(integratorGroupLambda))

    integratorTable.grantReadWriteData(integratorGroupLambda);
    integratorTable.grantReadWriteData(integratorLambda);
    integratorTable.grantReadWriteData(integratorEntryLambda);

  }
}
