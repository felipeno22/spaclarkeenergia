import React, { useState } from 'react';

function App() {
  const [consumo, setConsumo] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const fornecedoresPorPagina = 5; // Número de fornecedores por página

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (consumo > 0 && !isNaN(consumo)) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://spaclarkeenergia-1.onrender.com/fornecedores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ consumo_mensal_kwh: parseFloat(consumo) }),
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar fornecedores');
        }

        const data = await response.json();
        setFornecedores(data);
        setCurrentPage(1); // Volta para a primeira página ao fazer uma nova busca
      } catch (err) {
        setError(err.message || 'Erro ao buscar fornecedores.');
      } finally {
        setLoading(false);
      }
    } else {
      alert("Informe um valor válido para o consumo.");
    }
  };

  // Função para obter fornecedores da página atual
  const fornecedoresDaPaginaAtual = fornecedores.slice(
    (currentPage - 1) * fornecedoresPorPagina,
    currentPage * fornecedoresPorPagina
  );

  // Controle da paginação
  const totalPages = Math.ceil(fornecedores.length / fornecedoresPorPagina);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </form>

      <div style={styles.results}>
        {error && <p style={styles.error}>{error}</p>}
        {fornecedoresDaPaginaAtual.length > 0 ? (
          <>
            <h2 style={styles.subtitle}>Fornecedores disponíveis</h2>
            <ul style={styles.list}>
              {fornecedoresDaPaginaAtual.map((fornecedor, index) => (
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
            {/* Navegação de página */}
            <div style={styles.pagination}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={styles.pageButton}
              >
                Anterior
              </button>
              <span style={styles.pageInfo}>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={styles.pageButton}
              >
                Próxima
              </button>
            </div>
          </>
        ) : (
          !loading && <p style={styles.noResults}>Nenhum fornecedor disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f7',
    padding: '20px',
    minHeight: '100vh',
  },
  title: {
    color: '#004e7c',
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
  error: {
    textAlign: 'center',
    color: 'red',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    padding: '10px 20px',
    backgroundColor: '#004e7c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 10px',
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  pageInfo: {
    fontWeight: 'bold',
    color: '#004e7c',
  },
};

export default App;
