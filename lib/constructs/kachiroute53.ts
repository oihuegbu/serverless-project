import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as kachis3s from '../constructs/kachis3';
import { CustomCloudfront } from './kachicloudfront';
interface route53Props {
    zoneName: string,
    bucketName: string
}


export class CustomRoute53 extends Construct {
    //public bucketObject: s3.Bucket;
    HostedZone: route53.PublicHostedZone; 
    constructor(scope: Construct, id: string, props: route53Props) {
      super(scope, id);

      const hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
        zoneName: props.zoneName,
      });

      this.HostedZone = hostedZone
    }

    addRecord(distribution: CustomCloudfront){
      const newRoute53 = new route53.ARecord(this, 'Alias', {
        zone: this.HostedZone,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution.Distribution)),
      });
    }
    
    
}