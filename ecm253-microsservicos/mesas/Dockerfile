#alpine: imagem Linux "pequena"
FROM node:alpine

#diretorio no sistema de arquivos do contêiner para os comandos a seguir
WORKDIR /app

#copia o arquivo packege.json para poder executar npm install
COPY package.json .

#instala as dependencias
RUN npm install

#copia todo o conteúdo local para  aimagem
COPY . .

#executa quando o contêiner entrar em execução
CMD ["npm", "start"]