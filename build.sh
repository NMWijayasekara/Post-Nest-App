sudo docker build -t app .

sudo docker tag app us-central1-docker.pkg.dev/nestjs-examples/post-nest-app/app

sudo docker push us-central1-docker.pkg.dev/nestjs-examples/post-nest-app/app

gcloud builds submit --tag us-central1-docker.pkg.dev/nestjs-examples/post-nest-app/app

gcloud run deploy post-nest-app  --image us-central1-docker.pkg.dev/nestjs-examples/post-nest-app/app