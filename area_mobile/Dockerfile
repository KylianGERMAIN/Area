FROM cirrusci/flutter

USER root

COPY . /app
WORKDIR /app

RUN rm -f .packages

RUN flutter pub get
RUN flutter clean