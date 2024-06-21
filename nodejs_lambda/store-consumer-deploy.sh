npm install
zip -r storeConsumer.zip .
aws lambda update-function-configuration --function-name store-consumer --handler storeConsumer.handler --timeout 30 --description aws:states:opt-out
aws lambda update-function-code --function-name store-consumer --zip-file fileb://storeConsumer.zip --no-paginate --no-cli-pager
rm storeConsumer.zip
