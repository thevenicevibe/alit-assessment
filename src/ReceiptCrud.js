import React, { useState, useEffect } from 'react';
import { Button, Table, Input } from '@mui/material'; // Replace with your UI library components
import './style.css'
const ReceiptCRUD = ({onSave, onClose }) => {
  const [receipts, setReceipts] = useState([]);
  const [newReceipt, setNewReceipt] = useState({
    receiptNumber: generateReceiptNumber(),
    receiptDate: new Date().toISOString().split('T')[0],
    personName: '',
    rate: 0,
    qty: 0,
    amount: 0,
    remarks: '',
  });

  useEffect(() => {
    // Fetch existing receipts data from local storage
    const storedReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
    setReceipts(storedReceipts);
  }, []);

  function generateReceiptNumber() {

  }

  const handleInputChange = (name, value) => {
    setNewReceipt((prevReceipt) => ({ ...prevReceipt, [name]: value }));
  };

  const handleAddRow = () => {
    setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
    setNewReceipt({
      receiptNumber: generateReceiptNumber(),
      receiptDate: new Date().toISOString().split('T')[0],
      personName: '',
      rate: 0,
      qty: 0,
      amount: 0,
      remarks: '',
    });
  };

  const handleSave = () => {
   
    saveToLocalStorage(newReceipt);

    onClose(newReceipt);
  };

  const saveToLocalStorage = (receipt) => {
    // Retrieve existing receipts from local storage
    const existingReceipts = JSON.parse(localStorage.getItem('receipts')) || [];

    // Add the new receipt to the array
    const updatedReceipts = [...existingReceipts, receipt];

    // Save the updated array back to local storage
    localStorage.setItem('receipts', JSON.stringify(updatedReceipts));
  };

  const handleCancel = () => {
    // Close the CRUD modal without saving
    onClose();
  };

  // Auto-calculate amount, totalQty, totalAmount, and netAmount
  useEffect(() => {
    const updatedReceipts = receipts.map((receipt) => ({
      ...receipt,
      amount: receipt.rate * receipt.qty,
    }));

    setReceipts(updatedReceipts);
    setNewReceipt((prevReceipt) => ({
      ...prevReceipt,
      amount: newReceipt.rate * newReceipt.qty,
    }));
  }, [receipts, newReceipt.rate, newReceipt.qty]);

  return (
    
    <div>
      <div className='button-list'>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleCancel}>Delete</Button>
        <Button onClick={handleCancel}>Print</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Receipt Number</th>
            <th>Receipt Date</th>
            <th>Person's Name</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={index}>
              <td>{receipt.receiptNumber}</td>
              <td>{receipt.receiptDate}</td>
              <td>{receipt.personName}</td>
              <td>{receipt.rate}</td>
              <td>{receipt.qty}</td>
              <td>{receipt.amount}</td>
              <td>{receipt.remarks}</td>
            </tr>
          ))}
          {/* Blank row for adding new receipt */}
          <tr>
            <td>{newReceipt.receiptNumber}</td>
            <td>{newReceipt.receiptDate}</td>
            <td>
              <Input
                type="text"
                value={newReceipt.personName}
                onChange={(e) => handleInputChange('personName', e.target.value)}
              />
            </td>
            <td>
              <Input
                type="number"
                value={newReceipt.rate}
                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
              />
            </td>
            <td>
              <Input
                type="number"
                value={newReceipt.qty}
                onChange={(e) => handleInputChange('qty', parseFloat(e.target.value) || 0)}
              />
            </td>
            <td>{newReceipt.amount}</td>
            <td>
              <Input
                type="text"
                value={newReceipt.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <div>Total Qty: {receipts.reduce((sum, receipt) => sum + receipt.qty, 0)}</div>
      <div>Total Amount: {receipts.reduce((sum, receipt) => sum + receipt.amount, 0)}</div>

      
    </div>
  );
};

export default ReceiptCRUD;
