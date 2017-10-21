FROM ruby:2.4

COPY . /app/

RUN set -x && \
    cp /app/.gemrc ~/.gemrc && \
    gem install bundler

WORKDIR /app

RUN set -x && \
    bundle install

EXPOSE 3000

CMD "bundle exec rails s -b 0.0.0.0"
