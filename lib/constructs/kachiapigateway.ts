import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { CustomLambda } from './kachilambda';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
interface apigatewayProps {
  restApiName: string,
  description: string
}


export class CustomApigateway extends Construct {
    KachiApi: apigateway.RestApi; 
    LambdaIntegration: apigateway.LambdaIntegration;
    constructor(scope: Construct, id: string, props: apigatewayProps) {
      super(scope, id);

      //Define API gateway and connect to lambda Handler
      const apiGateway = new apigateway.RestApi(this, 'myapi', {
        restApiName: props.restApiName,
        description: props.description
      });

      this.KachiApi = apiGateway

      const integration = apiGateway.root.addResource('demo');
      integration.addMethod('GET');
      integration.addMethod('POST');



      // // Create the Lambda function
      // const lambdaFunction = new lambda.Function(this, props.functionName, {
      //   runtime: lambda.Runtime.PYTHON_3_10,
      //   handler: 'lambda-handler.Handler',
      //   code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler.zip')),
      //   //environment: { ['bucketName']: newBucket. }
      // });


    }
     
    addLambdaIntegration(lambdaFunction: CustomLambda){
      const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction.KachiLambda)
    }

      //this.LambdaIntegration = lambdaIntegration

    
}


// declare const booksBackend: apigateway.LambdaIntegration;
// const api = new apigateway.RestApi(this, 'books', {
//   defaultIntegration: booksBackend
// });

// const books = api.root.addResource('books');
// books.addMethod('GET');  // integrated with `booksBackend`
// books.addMethod('POST'); // integrated with `booksBackend`

// const book = books.addResource('{book_id}');
// book.addMethod('GET');   // integrated with `booksBackend`