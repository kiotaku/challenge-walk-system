FROM ruby:2.4

COPY . /app/

RUN set -x && \
    cp /app/.gemrc ~/.gemrc && \
    gem install bundler && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get upgrade -y && \
    apt-get install nodejs build-essential -y && \
    npm i -g yarn

WORKDIR /app

RUN set -x && \
    bundle install

EXPOSE 3000

CMD "bundle exec rails s -b 0.0.0.0"
