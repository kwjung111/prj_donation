FROM node:20

WORKDIR /usr/src/WORKDIR

COPY . .

RUN npm install && \
    ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

EXPOSE 3000

CMD ["npm", "run", "start"]