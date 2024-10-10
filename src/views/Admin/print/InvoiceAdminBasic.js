import React, { useRef } from 'react';

const InvoiceAdminBasic = ({ invoices }) => {
    const printWindowRef = useRef();

    const handleBasicPrint = () => {
        if (invoices.length === 1) {
            // Print only one invoice with A6 size
            const printWindow = window.open('', '_blank');
            printWindowRef.current = printWindow;

            printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              /* Custom styles for A6 size printing */
              @media print {
                body {
                  width: 148mm; /* A6 width in millimeters */
                  height: 105mm; /* A6 height in millimeters */
                }

                .invoice {
                  page-break-after: always;
                }

                /* Add more styles for A6 size here */
              }
            </style>
          </head>
          <body>
            <div className="invoice p-4 border border-gray-400 rounded-md shadow-md">
              {/* Render the single invoice */}
              {invoices.map((invoice) => (
                <div key={invoice.id}>
                  <h1 className="text-2xl font-bold mb-2">Invoice {invoice.invoiceNumber}</h1>
                  <p className="text-lg mb-1">Date: {invoice.date}</p>
                  <p className="text-lg">Total: {invoice.total}</p>
                  {/* Table for this invoice */}
                  <div className="table-container mt-4">
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="text-sm">Item</th>
                          <th className="text-sm">Quantity</th>
                          <th className="text-sm">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Replace the following with your invoice item data */}
                        <tr>
                          <td>Item 1</td>
                          <td>2</td>
                          <td>$20.00</td>
                        </tr>
                        <tr>
                          <td>Item 2</td>
                          <td>1</td>
                          <td>$15.00</td>
                        </tr>
                        {/* End of invoice item data */}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </body>
        </html>
      `);

            printWindow.document.close();

            // Wait for the print window to finish loading before triggering printing
            printWindow.addEventListener('load', () => {
                printWindow.print();
                printWindowRef.current = null; // Clear the reference to the printWindow after printing
            });
        } else {
            // Apply necessary styles for basic printing with flex (multiple invoices)
            document.body.style.display = 'flex';
            document.body.style.flexWrap = 'wrap';
            document.body.style.justifyContent = 'space-between'; // Or 'space-around' for more space
            document.body.style.alignContent = 'flex-start'; // Adjust to your preference

            // Call window.print() to trigger printing
            window.print();

            // Reset the display style to the default after printing
            document.body.style.display = 'block';
        }
    };

    return (
        <div className="container mx-auto">
            <div className="invoice-container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="invoice p-4 border border-gray-400 rounded-md shadow-md"
                    >
                        <h1 className="text-2xl font-bold mb-2">Invoice {invoice.invoiceNumber}</h1>
                        <p className="text-lg mb-1">Date: {invoice.date}</p>
                        <p className="text-lg">Total: {invoice.total}</p>
                        {/* Table for this invoice */}
                        <div className="table-container mt-4">
                            <table className="table-auto">
                                <thead>
                                <tr>
                                    <th className="text-sm">Item</th>
                                    <th className="text-sm">Quantity</th>
                                    <th className="text-sm">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* Replace the following with your invoice item data */}
                                <tr>
                                    <td>Item 1</td>
                                    <td>2</td>
                                    <td>$20.00</td>
                                </tr>
                                <tr>
                                    <td>Item 2</td>
                                    <td>1</td>
                                    <td>$15.00</td>
                                </tr>
                                {/* End of invoice item data */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button className="btn" onClick={handleBasicPrint}>
                    Print with Basic Printer (Flex)
                </button>
            </div>
        </div>
    );
};

export default InvoiceAdminBasic;
