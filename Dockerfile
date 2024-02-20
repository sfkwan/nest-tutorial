#FROM uadohklqpp01.bocgroup.com:8445/ubi9/nodejs-18-minimal:1-56 AS base
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest AS base
#RUN npm config set strict-ssl false
#RUN npm config set registry https://nexus.bocgroup.com/repository/npm-public/
RUN npm config set registry https://registry.npmjs.org
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /opt/app-root/src
COPY package.json pnpm-lock.yaml ./
RUN pnpm i

FROM base AS build
WORKDIR /opt/app-root/src
COPY --chown=1001:0 . .
COPY --chown=1001:0 --from=dependencies /opt/app-root/src/node_modules ./node_modules
RUN npx prisma generate
RUN pnpm build
RUN pnpm prune --prod

FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest AS deploy
#FROM uadohklqpp01.bocgroup.com:8445/ubi9/nodejs-18-minimal:1-56 AS deploy
WORKDIR /opt/app-root/src
COPY --chown=1001:0 --from=build /opt/app-root/src/dist/ ./dist/
COPY --chown=1001:0 --from=build /opt/app-root/src/node_modules ./node_modules
CMD ["node", "dist/src/main.js"]