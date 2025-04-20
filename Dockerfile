# make npm install dockerfile

FROM node:18.20.3
WORKDIR /app
COPY . .
RUN npm install
RUN npm install react-scripts
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]