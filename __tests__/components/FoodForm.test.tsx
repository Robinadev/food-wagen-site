import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FoodForm } from '../../components/forms/FoodFOrm';
import test, { describe } from 'node:test';

describe('FoodForm', () => {
  test('validates required fields', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();
    
    render(
      <FoodForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
        isLoading={false} 
      />
    );

    fireEvent.click(screen.getByText('Add Food'));

    await waitFor(() => {
      expect(screen.getByText('Food Name is required')).toBeInTheDocument();
      expect(screen.getByText('Food Image URL is required')).toBeInTheDocument();
      expect(screen.getByText('Restaurant Name is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();
    
    render(
      <FoodForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
        isLoading={false} 
      />
    );

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/food name/i), {
      target: { value: 'Test Food' }
    });
    fireEvent.change(screen.getByLabelText(/food rating/i), {
      target: { value: '4.5' }
    });
    fireEvent.change(screen.getByLabelText(/food image url/i), {
      target: { value: 'https://example.com/image.jpg' }
    });
    fireEvent.change(screen.getByLabelText(/restaurant name/i), {
      target: { value: 'Test Restaurant' }
    });
    fireEvent.change(screen.getByLabelText(/restaurant logo url/i), {
      target: { value: 'https://example.com/logo.jpg' }
    });

    fireEvent.click(screen.getByText('Add Food'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});