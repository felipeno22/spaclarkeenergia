from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas
fornecedores = [
    {
        'nome': '2W Energia',
        'logo': 'https://jornadadaeficiencia.com.br/wp-content/uploads/2021/09/2w-energia.png',
        'estado_origem': 'SP',
        'custo_kwh': 0.50,
        'limite_minimo_kwh': 10000,
        'numero_total_clientes': 500,
        'avaliacao_media': 4.5
    },
    {
        'nome': 'Alupar',
        'logo': 'https://media.licdn.com/dms/image/v2/C4E0BAQHOgCxiV073oA/company-logo_200_200/company-logo_200_200/0/1631325214086?e=1736985600&v=beta&t=EHx4jMocqt2Hpce6U9Oyd0F8CaqDDjxET8j5ICB_sKM',
        'estado_origem': 'RJ',
        'custo_kwh': 0.45,
        'limite_minimo_kwh': 20000,
        'numero_total_clientes': 400,
        'avaliacao_media': 4.0
    },
    {
    'nome': 'CPFL Energia',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/CPFL_logo.svg/200px-CPFL_logo.svg.png',
    'estado_origem': 'SP',
    'custo_kwh': 0.48,
    'limite_minimo_kwh': 15000,
    'numero_total_clientes': 600,
    'avaliacao_media': 4.2
},
{
    'nome': 'Neoenergia',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Neoenergia_logo.svg/200px-Neoenergia_logo.svg.png',
    'estado_origem': 'BA',
    'custo_kwh': 0.52,
    'limite_minimo_kwh': 12000,
    'numero_total_clientes': 700,
    'avaliacao_media': 4.6
},
{
    'nome': 'Energisa',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Energisa_logo.svg/200px-Energisa_logo.svg.png',
    'estado_origem': 'MT',
    'custo_kwh': 0.47,
    'limite_minimo_kwh': 18000,
    'numero_total_clientes': 550,
    'avaliacao_media': 4.3
},
{
    'nome': 'Equatorial Energia',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Equatorial_logo.svg/200px-Equatorial_logo.svg.png',
    'estado_origem': 'MA',
    'custo_kwh': 0.49,
    'limite_minimo_kwh': 16000,
    'numero_total_clientes': 520,
    'avaliacao_media': 4.4
},
{
    'nome': 'Light',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Light_logo.svg/200px-Light_logo.svg.png',
    'estado_origem': 'RJ',
    'custo_kwh': 0.46,
    'limite_minimo_kwh': 13000,
    'numero_total_clientes': 450,
    'avaliacao_media': 4.1
},
{
    'nome': 'Celesc',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Celesc_logo.svg/200px-Celesc_logo.svg.png',
    'estado_origem': 'SC',
    'custo_kwh': 0.51,
    'limite_minimo_kwh': 11000,
    'numero_total_clientes': 480,
    'avaliacao_media': 4.0
},
{
    'nome': 'Cemig',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Cemig_logo.svg/200px-Cemig_logo.svg.png',
    'estado_origem': 'MG',
    'custo_kwh': 0.44,
    'limite_minimo_kwh': 17000,
    'numero_total_clientes': 510,
    'avaliacao_media': 4.3
},
{
    'nome': 'Copel',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Copel_logo.svg/200px-Copel_logo.svg.png',
    'estado_origem': 'PR',
    'custo_kwh': 0.50,
    'limite_minimo_kwh': 14000,
    'numero_total_clientes': 470,
    'avaliacao_media': 4.2
},
{
    'nome': 'Aes Brasil',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AES_Brasil_logo.svg/200px-AES_Brasil_logo.svg.png',
    'estado_origem': 'SP',
    'custo_kwh': 0.53,
    'limite_minimo_kwh': 10000,
    'numero_total_clientes': 530,
    'avaliacao_media': 4.6
}


]

@app.route('/fornecedores', methods=['POST'])
def get_fornecedores():
    data = request.json
    consumo = data.get('consumo_mensal_kwh')
    fornecedores_validos = [f for f in fornecedores if consumo >= f['limite_minimo_kwh']]
    return jsonify(fornecedores_validos)

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000)  # Escuta em 0.0.0.0 para conexões externas
     #app.run(debug=True)
