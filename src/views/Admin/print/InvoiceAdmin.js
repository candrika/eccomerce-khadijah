import React, { useState } from 'react';
import InvoiceAdminBasic from './InvoiceAdminBasic';
import InvoiceAdminThermal from './InvoiceAdminThermal';

const InvoiceAdmin = () => {
    const invoices = [
        // Your invoice data
        { id: 1, invoiceNumber: '#001', date: '2023-07-28', total: '$100.00' },
        { id: 2, invoiceNumber: '#002', date: '2023-07-29', total: '$120.00' },
        { id: 3, invoiceNumber: '#003', date: '2023-07-30', total: '$150.00' },
        { id: 4, invoiceNumber: '#004', date: '2023-07-31', total: '$80.00' },
        // Add more invoices here
    ];

    const [selectedOption, setSelectedOption] = useState('thermal');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <h1>Invoice Admin</h1>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="thermal"
                        checked={selectedOption === 'thermal'}
                        onChange={handleOptionChange}
                    />
                    Thermal Print
                </label>
                <label>
                    <input
                        type="radio"
                        value="basic"
                        checked={selectedOption === 'basic'}
                        onChange={handleOptionChange}
                    />
                    Basic Print
                </label>
            </div>
            {selectedOption === 'thermal' ? (
                <InvoiceAdminThermal invoices={invoices} />
            ) : (
                <InvoiceAdminBasic invoices={invoices} />
            )}
            <style>
                {`
          /* Styles for radio buttons and print buttons */
          .radio-buttons,
          .btn {
            display: block;
          }

          /* Styles to hide radio buttons and print buttons in print preview */
          @media print {
            .radio-buttons,
            .btn {
              display: none;
            }
          }
        `}
            </style>
        </div>
    );
};

export default InvoiceAdmin;
