FROM node:lts-iron

RUN apt-get update && apt-get install yarn -y
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/data/serviceAccountKey.json"
ENV TZ="Europe/Madrid"
RUN \
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

WORKDIR /app