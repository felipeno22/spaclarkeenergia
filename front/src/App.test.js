import { fireEvent, render, screen , waitFor} from '@testing-library/react';
import App from './App';


test('renders title',()=>{
  render(<App />);
  const titleElement = screen.getByText(/Escolha de Fornecedor/i);
  expect(titleElement).toBeInTheDocument();
})

test("submit", async ()=>{
    render(<App/>);
    //const inputElement=screen.getByPlaceholderText(/Consumo mensal (kWh)/i);
    const inputElement = await screen.findByPlaceholderText('Consumo mensal (kWh)');

    fireEvent.change(inputElement,{target:{value:'30000'}});

    const buttonElement=screen.getByText(/Enviar/i);
    fireEvent.click(buttonElement);

     // Aguarde o texto aparecer após a requisição
  await waitFor(() => {
    expect(screen.getByText(/Fornecedores disponíveis/i)).toBeInTheDocument();
  });
}

)