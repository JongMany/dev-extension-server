# build stage
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:20
FROM node:18-alpine AS build
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start:dev" ]

# prod stage
# FROM node:18-alpine
# WORKDIR /usr/src/app
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# COPY --from=build /usr/src/app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production
# RUN rm package*.json
# EXPOSE 8080
# CMD ["node", "dist/main.js"]