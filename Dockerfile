# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine as build-stage

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use Nginx to serve the application
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Step 8: Copy the custom Nginx configuration
COPY nginx.conf.template /etc/nginx/nginx.conf.template

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Step 9: Expose port 80
EXPOSE 80

# Set entrypoint to the script
ENTRYPOINT ["/docker-entrypoint.d/env.sh"]


# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
