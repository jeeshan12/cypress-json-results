FROM cypress/included:10.0.3

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci  

COPY . .

CMD [ "run", "test" ]