import { Transaction, Order } from "./types";

export function exportTransactionsToCSV(transactions: Transaction[], filename = "paysure-transactions.csv") {
  if (typeof window === "undefined") return;

  const headers = [
    "Transaction ID",
    "UPI Reference (UTR)",
    "Amount (INR)",
    "Status",
    "Date",
    "Time",
    "Payment Source",
    "Verification Source",
    "Payer Name",
    "Payer VPA",
    "Risk Score",
    "Notes",
  ];

  const rows = transactions.map((t) => [
    `"${t.id}"`,
    `"${t.utr}"`,
    t.amount,
    `"${t.status}"`,
    `"${new Date(t.timestamp).toLocaleDateString("en-IN")}"`,
    `"${new Date(t.timestamp).toLocaleTimeString("en-IN")}"`,
    `"${t.source}"`,
    `"${t.verificationSource}"`,
    `"${t.payerName}"`,
    `"${t.payerVpa}"`,
    t.riskScore,
    `"${t.notes || t.failureReason || ""}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportOrdersToCSV(orders: Order[], filename = "paysure-orders.csv") {
  if (typeof window === "undefined") return;

  const headers = [
    "Order ID",
    "Order #",
    "Customer / Token",
    "Total Amount (INR)",
    "Payment Status",
    "Order Status",
    "Items Summary",
    "Transaction ID",
    "Timestamp",
  ];

  const rows = orders.map((o) => {
    const itemsSummary = o.items.map((i) => `${i.quantity}x ${i.name}`).join(" | ");
    return [
      `"${o.id}"`,
      o.orderNumber,
      `"${o.customerName || o.tableOrToken || "Walk-in"}"`,
      o.totalAmount,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`,
      `"${itemsSummary}"`,
      `"${o.transactionId || "None"}"`,
      `"${new Date(o.timestamp).toLocaleString("en-IN")}"`,
    ];
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
