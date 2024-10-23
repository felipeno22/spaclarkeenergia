# Usa a imagem oficial do Python
FROM python:3.9-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o requirements.txt e instala as dependências
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copia o código do backend para o container
COPY . .

# Expõe a porta 5000 para a API Flask
EXPOSE 5000

# Define o comando para iniciar a aplicação
CMD ["python", "main.py"]
