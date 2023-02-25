FROM node:16.16.0

ENV PUBLIC_URL=" "

RUN git clone https://github.com/hzraevets/fake-twitter

WORKDIR fake-twitter

RUN npm install && npm run build && \
    npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-p", "3000"]
