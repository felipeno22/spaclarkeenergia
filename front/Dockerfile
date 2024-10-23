# Usa a imagem oficial do Node.js para o build
FROM node:14

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .


EXPOSE 3000
CMD ["npm", "start"]
