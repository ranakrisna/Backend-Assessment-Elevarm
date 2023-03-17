FROM node:18-alpine3.17 as application
WORKDIR /app
COPY . /app
RUN npm install pnpm --location=global
RUN npm install @microsoft/rush --location=global
RUN rush purge
RUN rush install
RUN rush update
RUN rush deploy --project @elevarm/application
EXPOSE 3010