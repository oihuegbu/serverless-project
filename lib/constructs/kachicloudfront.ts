import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kachiApigateways from '../constructs/kachiapigateway';
import { CustomApigateway } from './kachiapigateway';
import { RemovalPolicy } from 'aws-cdk-lib';
import { CustomS3 } from './kachis3';
interface cloudfrontProps {
    restApiName: string,
    description: string,
    bucketName: string
}


export class CustomCloudfront extends Construct {
    Distribution: cloudfront.Distribution; 
    constructor(scope: Construct, id: string, props: cloudfrontProps) {
      super(scope, id);

      //Define API gateway and connect to lambda Handler
      const apiGateway = new apigateway.RestApi(this, 'myapi', {
        restApiName: props.restApiName,
        description: props.description
      });

      const cloudfrontDistribution = new cloudfront.Distribution(this, 'myDistribution', {
        defaultBehavior: {
            origin: new cloudfront_origins.RestApiOrigin(apiGateway)
        },
        // additionalBehaviors: {
        //   '/path': {origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(cloudfronttos3.S3bucket),}
        // }
    });

      const integration = apiGateway.root.addResource('demo');
      integration.addMethod('GET');
      integration.addMethod('POST');

      this.Distribution = cloudfrontDistribution;
    }
      




    // addApigateway(cloudfronttoapigateway: CustomApigateway, cloudfronttos3: CustomS3){
    //   const cloudfrontDistribution = new cloudfront.Distribution(this, 'myDistribution', {
    //     defaultBehavior: {
    //       origin: new cloudfront_origins.RestApiOrigin(cloudfronttoapigateway.KachiApi)
    //     },
    //     additionalBehaviors: {
    //       '/path': {origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(cloudfronttos3.S3bucket),}
    //     }
    // });

      
}

