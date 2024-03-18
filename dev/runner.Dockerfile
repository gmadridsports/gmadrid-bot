FROM node:lts-iron

ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock
ADD ./package-lock.json /app/package-lock.json
ADD ./dist /app/
ADD ./src/apps/shell-cli/dependency-injection /app/src/apps/shell-cli/dependency-injection/
ADD ./src/Contexts/Shared/infrastructure/config/*.json /app/src/Contexts/Shared/infrastructure/config/

RUN apt-get update && apt-get install yarn -y && \
  echo "**** install packages ****" && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    chromium \
    chromium-l10n && \
  echo "**** cleanup ****" && \
  apt-get autoclean && \
  rm -rf \
    /config/.cache \
    /var/lib/apt/lists/* \
    /var/tmp/* \
    /tmp/*
RUN cd /app && yarn install --frozen-lockfile

ENTRYPOINT ["yarn", "start:bot:shell-cli"]
VOLUME /usr/src/app/data
WORKDIR /app