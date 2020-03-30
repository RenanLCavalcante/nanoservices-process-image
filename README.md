# PROCESSAMENTO DE IMAGENS

* **Lambda: http-handler-upload-img:POST** - Recebe uma imagem atráves do API gateway da AWS, gera um id para imagem e salva no S3.
* **Lambda: thumbnail-handler** - Resgata uma imagem do S3 e aplica um tamanho de 100 x 100 salvando em outro bucket.
* **Lambda: image-tagging-handler** - Resgata uma imagem do S3 e envia para o AWS Rekognition fazer uma análise da imagem, trazendo diversos textos relacionados a imagem.
* **Lambda: filter-black-white-handler** - Resgata uma imagem do S3 e aplica um filtro de preto e branco e salva em outro bucket.
* **Lambda: handler-events-image** - Lê mensages do SQS e salva no DynamoDB
* **Lambda: htt-handler-upload-img:GET** - Passando uma palavra, por exemplo "Car", se o AWS Rekoginition conseguiu fazer o tagging da imagem, este lambda irá trazer os buckets/key que contém imagens com carro.

* Lambdas criados utilizando o [Serverless Framework] (https://serverless.com/)

## Recursos criados no console da AWS: 
1. S3
2. SNS
3. SQS
4. DynamoDB

## Eventos configurados no console:
1. Evento de PUT do S3 disparado para o SNS

