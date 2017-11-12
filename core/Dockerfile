FROM arm32v7/node:latest

RUN git clone https://github.com/maxsoulard/pleasedont-die.git
WORKDIR pleasedont-die/core
RUN npm install
CMD npm start
EXPOSE 8888
