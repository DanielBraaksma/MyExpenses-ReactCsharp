import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Bill } from './Bill';
import { deleteBill } from '../slices/billSlice';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../slices/billSlice', () => ({
  deleteBill: jest.fn(),
}));

describe('Bill component', () => {
  it('should call deleteBill function on button click', () => {
    const props = {
      bill: {
        id: '1',
        name: 'Test Bill',
        date: '2023-04-29T08:00:00.000Z',
        amount: 50,
      },
      handleEditBill: jest.fn(),
    };
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    const { getByText } = render(<Bill {...props} />);
    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);

    expect(dispatch).toHaveBeenCalledWith(deleteBill('1'));
  });

  it('should call handleEditBill function on button click', () => {
    const props = {
      bill: {
        id: '1',
        name: 'Test Bill',
        date: '2023-04-29T08:00:00.000Z',
        amount: 50,
      },
      handleEditBill: jest.fn(),
    };

    const { getByText } = render(<Bill {...props} />);
    const editButton = getByText('Edit');

    fireEvent.click(editButton);

    expect(props.handleEditBill).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Bill',
      date: '2023-04-29T08:00:00.000Z',
      amount: 50,
    });
  });
});
