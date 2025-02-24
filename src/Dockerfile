FROM node:20.18 AS build-stage
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --silent
# Copy the rest of the project files
COPY . .
# Build the React app
RUN npm run build


FROM node:20.18
ARG NEXT_PUBLIC_REST_IPFS_GATEWAY
ENV NEXT_PUBLIC_REST_IPFS_GATEWAY=$NEXT_PUBLIC_REST_IPFS_GATEWAY
WORKDIR /app
ENV NEXT_PUBLIC_REST_IPFS_GATEWAY='ipfs.io/ipfs/'
COPY --from=build-stage /app ./
EXPOSE 3000