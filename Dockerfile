FROM node:10-alpine

RUN mkdir -p /home/app
ENV HOME /home/app
WORKDIR $HOME

COPY package*.json $HOME/

RUN npm install

ADD . $HOME

CMD [ "npm", "start" ]

EXPOSE 3000
