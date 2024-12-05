import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront_origin from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as kachis3s from '../constructs/kachis3';
import * as kachicloudfronts from '../constructs/kachicloudfront';
import * as kachiapigateways from '../constructs/kachiapigateway';
import * as kachidynamodbs from '../constructs/kachidynamodb';
import * as kachiroute53s from '../constructs/kachiroute53';
import * as kachilambdas from '../constructs/kachilambda';

export class ServerlessProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const demoS3 = new kachis3s.CustomS3(this, 'demoS3', {
      bucketName: 'kachidemobucket2468',
    })


    const demoCloudfront = new kachicloudfronts.CustomCloudfront(this, 'demoCloudfront', {
      restApiName: 'kachi Demo Api',
      description: 'This is a kachi demo service',
      bucketName: 'kachitestdemobucket'
    })

    const demoRoute53 = new kachiroute53s.CustomRoute53(this, 'demoRoute53', {
      zoneName: 'demo.com',
      bucketName: 'kachidemobucket'
    })

    demoRoute53.addRecord(demoCloudfront)
    

    const demoapigateway = new kachiapigateways.CustomApigateway(this, 'demoApigateway', {
      restApiName: 'Kachi Service',
      description: 'This service serves demo service'
    })

    const demoLambda = new kachilambdas.CustomLambda(this, 'demoLambda', {
      functionName: 'demoFunction',
    })

    demoapigateway.addLambdaIntegration(demoLambda)

    const demoDynamodb = new kachidynamodbs.CustomDynamodb(this, 'demoDynamodb', {
      functionName: 'demoFunction'
    })

    //demoCloudfront.addApigateway(demoapigateway, demoS3)
    //demoCloudfront.addApigateway()
  }
}
