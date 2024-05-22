# build stage
# FROM node:18-alpine AS build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:20
# RUN mkdir -p /var/app
# WORKDIR /var/app
# COPY . .
# RUN npm install

# EXPOSE 8080
# CMD [ "npm", "run", "start:dev" ]

# STEP 1
# 1
FROM node:18 AS builder
# 2
WORKDIR /app
# 3
COPY . .
# 4
RUN yarn
# 5
RUN yarn build

# STEP 2
#6
FROM node:8-alpine
#7
WORKDIR /app
#8
ENV NODE_ENV production
#9
COPY --from=builder /app ./
#10
CMD ["yarn","start:prod"]

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