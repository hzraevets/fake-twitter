FROM node:16.16.0

ENV PUBLIC_URL=" "

RUN git clone https://github.com/hzraevets/fake-twitter

WORKDIR fake-twitter

RUN npm install && npm run build-storybook && \
    npm install -g serve

EXPOSE 6006

# https://github.com/storybookjs/storybook/issues/15659
# can not use "-s" option here
CMD ["serve", "storybook-static", "-p", "6006"]
