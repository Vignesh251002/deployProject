#! /bin/bash

Stage="dev"
Project="sam-app2"
Region="us-east-1"
DynamoDBTableName="MyTable"
S3Bucket="sam-bucket-25102002"
TemplateFile="../../template/templateShell.yaml"
LambdaFunctionName="LambdaFunctionName"
StackName="${Project}-stack"

if ! aws s3 ls "s3://$S3Bucket"
then
    echo "S3 bucket $S3Bucket does not exist. Creating..."
    aws s3 mb "s3://$S3Bucket" --region $Region
else
    echo "S3 bucket $S3Bucket already exists."
fi

echo "Storing the template to S3."

sam package \
    --template-file $TemplateFile \
    --s3-bucket $S3Bucket \
    --output-template-file packagedDeploy-template.yaml \
    --region $Region

echo "Deploying application"

sam deploy \
    --template-file packagedDeploy-template.yaml \
    --stack-name $StackName \
    --s3-bucket $S3Bucket \
    --region $Region \
    --no-fail-on-empty-changeset \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM \
    --parameter-overrides \
        Stage=${Stage} \
        DynamoDBTableName=${DynamoDBTableName} \
        LambdaFunctionName=${LambdaFunctionName} \
    --tags created_by="vignesh" purpose="learning"

echo "Deployment complete!"
