import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Adivinanza from '../adivinanza';

describe('Adivinanza Component', () => {

// Mockear la función useState
  const useStateMock = jest.spyOn(React, 'useState');

  beforeEach(() => {
    // Mockear el estado targetNumber
    useStateMock.mockReturnValueOnce([42, jest.fn()]);
  });

  afterEach(() => {
    // Restaurar la función original después de cada prueba
    useStateMock.mockReset();
  });


  it('should render without errors', () => {
    const { getByText, getByPlaceholderText } = render(<Adivinanza />);
    
    // Verifica que el componente se renderice correctamente
    expect(getByText('Adivina un número del 1 al 100')).toBeInTheDocument();
    expect(getByPlaceholderText('Tu adivinanza...')).toBeInTheDocument();
    expect(getByText('Adivinar')).toBeInTheDocument();
  });

  it('should display a success message when the guess is correct', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Adivinanza />);
    const input = getByPlaceholderText('Tu adivinanza...');
    const button = getByText('Adivinar');
    

    // Ingresa un número correcto
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(button);

    // Verifica que se muestre el mensaje correcto
    expect(getByTestId('message')).toHaveTextContent('¡El número es correcto!');
  });

  it('should display a "too low" message when the guess is too low', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Adivinanza />);
    const input = getByPlaceholderText('Tu adivinanza...');
    const button = getByText('Adivinar');
    
    // Ingresa un número demasiado bajo
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(button);

    // Verifica que se muestre el mensaje correcto
    expect(getByTestId('message')).toHaveTextContent('Demasiado bajo');
  });

  it('should display a "too high" message when the guess is too high', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Adivinanza />);
    const input = getByPlaceholderText('Tu adivinanza...');
    const button = getByText('Adivinar');
    
    // Ingresa un número demasiado alto
    fireEvent.change(input, { target: { value: '75' } });
    fireEvent.click(button);

    // Verifica que se muestre el mensaje correcto
    expect(getByTestId('message')).toHaveTextContent('Demasiado alto');
  });
});
