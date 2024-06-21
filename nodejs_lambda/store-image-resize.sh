npm install
zip -r storeImageResize.zip .
aws lambda update-function-configuration --function-name store-image-resize --handler storeImageResize.handler --timeout 60 --description aws:states:opt-out
aws lambda update-function-code --function-name store-image-resize --zip-file fileb://storeImageResize.zip --no-paginate --no-cli-pager
rm storeImageResize.zip
