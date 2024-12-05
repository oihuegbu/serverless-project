import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as kachis3s from '../constructs/kachis3';
import * as path from 'path';
interface LambdaProps {
    functionName: string,
}

export class CustomLambda extends Construct {
    KachiLambda: lambda.Function;
    constructor(scope: Construct, id: string, props: LambdaProps) {
      super(scope, id);


      // Create the Lambda function
      const lambdaFunction = new lambda.Function(this, props.functionName, {
        runtime: lambda.Runtime.PYTHON_3_10,
        handler: 'lambda-handler.Handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler.zip')), 
        //environment: { ['bucketName']: newBucket. }
      });

      this.KachiLambda = lambdaFunction
    }
  }

// ./lambda-handler.zip