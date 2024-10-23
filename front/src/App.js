import React, { useState } from 'react';

function App() {
  const [consumo, setConsumo] = useState('');
  const [fornecedores, setFornecedores] = useState([]);


  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/fornecedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ consumo_mensal_kwh: parseFloat(consumo) }),
    });

    const data = await response.json();
    setFornecedores(data);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Escolha de Fornecedor</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Consumo mensal (kWh)"
          value={consumo}
          onChange={(e) => setConsumo(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
      <div style={styles.results}>
        {fornecedores.length > 0 ? (
          <>
            <h2 style={styles.subtitle}>Fornecedores disponíveis</h2>
            <ul style={styles.list}>
              {fornecedores.map((fornecedor, index) => (
                <li key={index} style={styles.listItem}>
                  <img
                    src={fornecedor.logo}
                    alt={fornecedor.nome}
                    width="50"
                    style={styles.logo}
                  />
                  <div style={styles.info}>
                    <h3 style={styles.fornecedorName}>{fornecedor.nome}</h3>
                    <p>Estado: {fornecedor.estado_origem}</p>
                    <p>Custo por kWh: R${fornecedor.custo_kwh}</p>
                    <p>Clientes: {fornecedor.numero_total_clientes}</p>
                    <p>Avaliação: {fornecedor.avaliacao_media}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p style={styles.noResults}>Nenhum fornecedor disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f7', // Cinza claro para fundo
    padding: '20px',
    minHeight: '100vh',
  },
  title: {
    color: '#004e7c', // Azul escuro
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #c4c4c4',
    borderRadius: '4px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#004e7c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  results: {
    marginTop: '20px',
  },
  subtitle: {
    color: '#004e7c',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    marginRight: '15px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  fornecedorName: {
    margin: 0,
    color: '#004e7c',
  },
  noResults: {
    textAlign: 'center',
    color: '#7a7a7a',
  },
};

export default App;
