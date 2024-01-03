# Base image for NestJS
FROM node:21-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Generate Prisma Client
Run npx prisma generate

# Build Nest Js App
RUN npm run build

EXPOSE 3000

CMD ["node",  "dist/main"]