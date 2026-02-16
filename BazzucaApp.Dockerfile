# Stage 1: Build bazzuca-react dependency
FROM node:20-alpine AS build-lib

WORKDIR /lib

# Copy bazzuca-react package files and install dependencies
COPY bazzuca-react/package*.json ./
RUN npm install --legacy-peer-deps

# Copy bazzuca-react source and build
COPY bazzuca-react/ ./
RUN npm run build

# Stage 2: Build bazzuca-app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY bazzuca-app/package*.json ./

# Copy the built bazzuca-react library
COPY --from=build-lib /lib /lib/bazzuca-react

# Override bazzuca-react to use the local build, then install
RUN npm pkg set dependencies.bazzuca-react=file:/lib/bazzuca-react && \
    npm install --legacy-peer-deps

# Copy source code
COPY bazzuca-app/ ./

# Set environment variables for Vite build
ARG VITE_API_URL=http://localhost:5004
ARG VITE_BAZZUCA_API_URL=http://localhost:5010
ARG NODE_ENV=development

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_BAZZUCA_API_URL=${VITE_BAZZUCA_API_URL}
ENV NODE_ENV=${NODE_ENV}

# Build the application (skip TypeScript type checking)
RUN npx vite build

# Stage 3: Production
FROM nginx:alpine AS production

# Copy custom nginx config
COPY bazzuca-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
