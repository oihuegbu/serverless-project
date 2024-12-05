import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdass from '../constructs/kachilambda';
import * as path from 'path';
import { table } from 'console';
interface dynamodbProps {
    functionName: string
}


export class CustomDynamodb extends Construct {
    constructor(scope: Construct, id: string, props: dynamodbProps) {
      super(scope, id);

      const dynamodbTable = new dynamodb.TableV2(this, 'Table', {
        partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      });

      // Create the Lambda function
      const lambdaFunction = new lambda.Function(this, props.functionName, {
        runtime: lambda.Runtime.PYTHON_3_10,
        handler: 'lambda-handler.Handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler.zip')),
        //environment: { ['bucketName']: newBucket. }
      });

      //Connect DynameDB table to lambda
      dynamodbTable.grantReadWriteData(lambdaFunction)

}
      addlambdatodynamodb(){}
}
