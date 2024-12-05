import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
interface s3Props {
    bucketName: string,
}


export class CustomS3 extends Construct {
    S3bucket: s3.Bucket;
    public bucketObject: s3.Bucket;
    constructor(scope: Construct, id: string, props: s3Props) {
      super(scope, id);
      const kachis3 = new s3.Bucket(this, props.bucketName, {
        bucketName: props.bucketName,
        removalPolicy: RemovalPolicy.DESTROY,
      });
      this.bucketObject = kachis3;
      this.S3bucket = kachis3;
    }
    
}