#!/usr/bin/env bash

Stage="dev"
Project="sam-app3"
Region="us-east-1"
S3Bucket="sam-bucket-25102002" 
TemplateFile="../../template/templateShell1.yaml"
StackName="${Project}-stack"

echo "Storing the template to S3."

sam package \
    --template-file $TemplateFile \
    --s3-bucket $S3Bucket \
    --output-template-file packagedDeploy-template1.yaml \
    --region $Region

echo "Deploying application"

sam deploy \
    --template-file packagedDeploy-template1.yaml \
    --stack-name $StackName \
    --s3-bucket $S3Bucket \
    --region $Region \
    --no-fail-on-empty-changeset \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM \
    --parameter-overrides \
        Stage=${Stage} 
       
echo "deployment complete!"
