FROM node as builder

# Create app directory
WORKDIR /

# Install app dependencies
COPY package.json .

COPY . .

RUN npm install

EXPOSE 5000

CMD ["sh","-c","npm run migrate && npm run build && npm start"]