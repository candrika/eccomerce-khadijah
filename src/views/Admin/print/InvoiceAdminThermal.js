import React, { useRef } from 'react';

const InvoiceAdminThermal = ({ invoices }) => {
    const printWindowRef = useRef();

    const handleThermalPrintAll = (event) => {
        event.preventDefault();
        // Handle thermal print logic for all invoices
        // For example, set the font size for thermal printing
        document.body.style.fontSize = '12px'; // Example: Setting font size for A6

        const printWindow = window.open('', '_blank');
        printWindowRef.current = printWindow;

        printWindow.document.open();
        printWindow.document.write('<html><head><title>Invoice</title></head><body>');

        invoices.forEach((invoice) => {
            printWindow.document.write(`
        <div class="invoice p-4">
          <table class="w-full" style="border-collapse: collapse; border: 1px solid black;">
            <thead>
              <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Invoice Number</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Date</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid black; padding: 8px;">${invoice.invoiceNumber}</td>
                <td style="border: 1px solid black; padding: 8px;">${invoice.date}</td>
                <td style="border: 1px solid black; padding: 8px;">${invoice.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
            printWindow.document.write('<div style="page-break-after: always;"></div>'); // Page break after each invoice
        });

        printWindow.document.write('</body></html>');
        printWindow.document.close();

        // Wait for the print window to finish loading before triggering printing
        printWindow.addEventListener('load', () => {
            printWindow.print();
            printWindowRef.current = null; // Clear the reference to the printWindow after printing
        });

        // Reset the font size to the default after printing all invoices
        document.body.style.fontSize = '16px'; // Reset font size to the default
    };

    return (
        <div className="container mx-auto">
            <div style={{ display: 'none' }}>
                {/* Hidden print window that will be used for printing */}
                <iframe
                    title="printWindow"
                    ref={printWindowRef}
                    style={{ width: '1px', height: '1px', border: 'none' }}
                />
            </div>
            {invoices.map((invoice) => (
                <div key={invoice.id} className="invoice-content p-4 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold">Invoice {invoice.invoiceNumber}</h1>
                    <p className="text-lg">Date: {invoice.date}</p>
                    <p className="text-lg">Total: {invoice.total}</p>
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button className="btn" onClick={handleThermalPrintAll}>
                    Print All Invoices
                </button>
            </div>
            {/* Custom styles for thermal printing */}
            <style>
                {`
          @media print {
            .invoice-content {
              page-break-after: always;
            }
            table {
              page-break-inside: avoid;
            }
          }
        `}
            </style>
        </div>
    );
};

export default InvoiceAdminThermal;
