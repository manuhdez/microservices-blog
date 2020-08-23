FROM node:alpine

# Environment variables
ENV CI=true
ENV REACT_APP_POSTS_SERVICE_URL=posts.com
ENV REACT_APP_COMMENTS_SERVICE_URL=http://localhost:3002
ENV REACT_APP_QUERY_SERVICE_URL=http://localhost:3003

WORKDIR /app
COPY ./ ./
RUN npm install

CMD [ "npm", "start" ]
