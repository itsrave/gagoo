FROM node:13 as build-deps
WORKDIR /usr/src
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
