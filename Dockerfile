ARG NODE_VERSION=14

# First pass: install all node dependences for next build.
FROM node:$NODE_VERSION-alpine

ADD package.json ./
ADD package-lock.json ./

RUN npm install

COPY components ./components
COPY containers ./containers
COPY next-env.d.ts ./next-env.d.ts
COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY tsconfig.json ./tsconfig.json
COPY .env.local ./.env.local
COPY .eslintrc.yml ./.eslintrc.yml

RUN npm run build

# Second pass: install only prod dependencies needed by server
FROM node:$NODE_VERSION-alpine

ADD package.json ./
ADD package-lock.json ./

RUN npm install --production

# Third pass: copy next build + prod dependencies to distroless.
FROM gcr.io/distroless/nodejs:$NODE_VERSION

COPY --from=0 .next .next
COPY --from=1 node_modules node_modules

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
