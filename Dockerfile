FROM node:7.7-slim
MAINTAINER Aditya Setiono<winged.zach@gmail.com>
RUN mkdir /code
WORKDIR /code
COPY ./package.json /code
RUN yarn
COPY . /code
RUN yarn run build
EXPOSE 3000
