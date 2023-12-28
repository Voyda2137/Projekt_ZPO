import { Duration, Stack, StackProps } from 'aws-cdk-lib/core';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as iam from 'aws-cdk-lib/aws-iam'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { IdentityPool, UserPoolAuthenticationProvider } from "@aws-cdk/aws-cognito-identitypool-alpha";

export class ProjektZpoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const queue = new sqs.Queue(this, 'ProjektZpoQueue', {
      visibilityTimeout: Duration.seconds(300)
    })

    const topic = new sns.Topic(this, 'ProjektZpoTopic')

    topic.addSubscription(new subs.SqsSubscription(queue))


   // Start user
    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { username: true, email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        givenName: { required: true, mutable: true },
        familyName: { required: true, mutable: true },
        preferredUsername: { required: true, mutable: true }
      }
    })

    const identityPool = new IdentityPool(this, 'IdentityPool', {
      identityPoolName: 'IdentityPool',
      authenticationProviders: {
        userPools: [
          new UserPoolAuthenticationProvider({
            userPool
          })
        ]
      }
    })

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
    })

    const userTable = new dynamodb.Table(this, 'UserTable', {
      partitionKey: {
        name: 'UserID',
        type: dynamodb.AttributeType.STRING,
      },
    })

    userTable.grantReadWriteData(identityPool.authenticatedRole)

    const testCognitoRole = new iam.Role(this, 'TestCognitoRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    const testCognito = new lambda.Function(this, 'TestCognito', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'testCognito.handler',
      code: lambda.Code.fromAsset('lambda'),
      role: testCognitoRole,
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
        DYNAMODB_TABLE_NAME: userTable.tableName,
      }
    })

    userTable.grantReadWriteData(testCognitoRole);

    testCognitoRole.addToPolicy(
        new iam.PolicyStatement({
          actions: ['cognito-idp:AdminCreateUser'],
          resources: [userPool.userPoolArn],
        })
    )

    const userApi = new apigw.RestApi(this, 'user', {
      restApiName: 'user-api',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
    })

    const userResource = userApi.root.addResource('testCognito')
    const userIntegration = new apigw.LambdaIntegration(testCognito)

    userResource.addMethod('POST', userIntegration)
    // End user

    // Start integrator
    
  }
}
