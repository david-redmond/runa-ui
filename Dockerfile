# Use a lightweight Node.js image as base
FROM node:16-alpine3.18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

ENV REACT_APP_GATEWAY_URL=""
ENV REACT_APP_AUTH_URL=""
ENV PORT=4100

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Use the official nginx image as base
FROM node:16-alpine3.18

WORKDIR /usr/src/app

COPY server.js ./
COPY --from=build app/public/ ./public

ENV REACT_APP_GATEWAY_URL=""
ENV REACT_APP_AUTH_URL=""
ENV PORT=4100

# Expose port 4100
EXPOSE 4100

# Command to run the Node.js server
CMD ["node", "server.js"]