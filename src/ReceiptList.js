// ReceiptList.js
import React, { useState, useEffect } from 'react';
import ReceiptCRUD from './ReceiptCrud';
import AuthService from './AuthService';
import "./style.css";
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReceiptList = () => {
  const [showCRUD, setShowCRUD] = useState(false);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    // Load receipts from local storage when component mounts
    const storedReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
    setReceipts(storedReceipts);
  }, []);


  const handleAddClick = () => {
    setShowCRUD(true);
  };

  const handlePrintClick = () => {
    const pdf = new jsPDF();
    pdf.text('Receipts', 15, 10);
    
    const columns = ['Receipt Number', 'Receipt Date', "Person's Name", 'Total Qty', 'Net Amount', 'Remark'];
    const data = receipts.map((receipt) => [
      receipt.receiptNumber,
      receipt.receiptDate,
      receipt.personName,
      receipt.qty,
      receipt.amount,
      receipt.remarks,
    ]);

    pdf.autoTable({
      head: [columns],
      body: data,
    });

    pdf.save('receipts.pdf');
  };

  const handleEditClick = (index) => {
    setShowCRUD(true);
  };

  const handleDeleteClick = (index) => {
    const updatedReceipts = [...receipts];
    updatedReceipts.splice(index, 1);
    setReceipts(updatedReceipts);
  };

  const handleRefreshClick=() =>{}

  const handleExitClick=() =>{
    AuthService.logout();
    // history.push('/login');
  }

  return (
    <div>
      <div className='button-list'>
      <Button variant='outlined' onClick={handleAddClick}>Add</Button>
      <Button variant='outlined' onClick={handlePrintClick}>Print</Button>
      <Button variant='outlined' onClick={handleRefreshClick}>Refresh</Button>
      <Button variant='outlined' onClick={handleExitClick}>Exit</Button>
      </div>
      

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receipt Number</TableCell>
              <TableCell>Receipt Date</TableCell>
              <TableCell>Person's Name</TableCell>
              <TableCell>Total Qty</TableCell>
              <TableCell>Net Amount</TableCell>
              <TableCell>Remark</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt, index) => (
              <TableRow key={index}>
                <TableCell>{receipt.receiptNumber}</TableCell>
                <TableCell>{receipt.receiptDate}</TableCell>
                <TableCell>{receipt.personName}</TableCell>
                <TableCell>{receipt.qty}</TableCell>
                <TableCell>{receipt.amount}</TableCell>
                <TableCell>{receipt.remarks}</TableCell>
                {/* Add more cells based on your data structure */}
                <TableCell>
                  <Button onClick={() => handleEditClick(index)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>Record Count: {receipts.length}</div>

      {showCRUD && <ReceiptCRUD onClose={() => setShowCRUD(false)} />}
    </div>
  );
};

export default ReceiptList;
