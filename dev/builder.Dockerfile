FROM --platform=linux/amd64 node:lts-iron
RUN apt-get update && apt-get install yarn -y
WORKDIR /app