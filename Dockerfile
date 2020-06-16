FROM node:alpine as build
WORKDIR /app
COPY . /app
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
RUN apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates
RUN apk add --no-cache --virtual .build-deps python g++ make gcc .build-deps curl git pixman-dev cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev
RUN npm install
RUN apk del .build-deps
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY deployment/default.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
COPY deployment/env.sh .
COPY deployment/config.env .
RUN apt update
RUN apt install dos2unix
RUN dos2unix config.env
RUN dos2unix env.sh
# Make our shell script executable
RUN chmod +x env.sh
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
