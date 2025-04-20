# make npm install dockerfile

FROM node:18.20.3
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install react-scripts
EXPOSE 3000
CMD ["npm", "run", "start"]