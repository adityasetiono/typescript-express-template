FROM node:9.2-slim
RUN mkdir /code
WORKDIR /code
COPY ./package.json /code
RUN yarn
COPY . /code
RUN yarn run build
EXPOSE 3000
