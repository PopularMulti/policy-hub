import { supabase } from "./supabaseClient";

function rowToInvoice(row) {
  return {
    id: row.id,
    invoiceClientId: row.invoice_client_id,
    invoiceNumber: row.invoice_number || "",
    docType: row.doc_type || "Invoice",
    issueDate: row.issue_date || "",
    dueDate: row.due_date || "",
    billToName: row.bill_to_name || "",
    billToEmail: row.bill_to_email || "",
    billToPhone: row.bill_to_phone || "",
    billToAddress: row.bill_to_address || "",
    lineItems: row.line_items || [],
    pricingMode: row.pricing_mode || "itemized",
    manualTotal: row.manual_total || 0,
    payments: row.payments || [],
    taxRate: row.tax_rate || 0,
    discount: row.discount || 0,
    notes: row.notes || "",
    createdBy: row.created_by || null,
    createdAt: row.created_at || "",
  };
}

function invoiceToRow(invoice) {
  const row = {};
  if ("invoiceClientId" in invoice) row.invoice_client_id = invoice.invoiceClientId;
  if ("invoiceNumber" in invoice) row.invoice_number = invoice.invoiceNumber;
  if ("docType" in invoice) row.doc_type = invoice.docType;
  if ("issueDate" in invoice) row.issue_date = invoice.issueDate;
  if ("dueDate" in invoice) row.due_date = invoice.dueDate;
  if ("billToName" in invoice) row.bill_to_name = invoice.billToName;
  if ("billToEmail" in invoice) row.bill_to_email = invoice.billToEmail;
  if ("billToPhone" in invoice) row.bill_to_phone = invoice.billToPhone;
  if ("billToAddress" in invoice) row.bill_to_address = invoice.billToAddress;
  if ("lineItems" in invoice) row.line_items = invoice.lineItems;
  if ("pricingMode" in invoice) row.pricing_mode = invoice.pricingMode;
  if ("manualTotal" in invoice) row.manual_total = invoice.manualTotal;
  if ("payments" in invoice) row.payments = invoice.payments;
  if ("taxRate" in invoice) row.tax_rate = invoice.taxRate;
  if ("discount" in invoice) row.discount = invoice.discount;
  if ("notes" in invoice) row.notes = invoice.notes;
  if ("createdBy" in invoice) row.created_by = invoice.createdBy;
  return row;
}

export async function fetchInvoices() {
  const { data, error } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("fetchInvoices failed:", error.message);
    return [];
  }
  return (data || []).map(rowToInvoice);
}

export async function insertInvoice(invoice) {
  const row = invoiceToRow(invoice);
  const { data, error } = await supabase.from("invoices").insert(row).select();
  if (error) {
    console.error("insertInvoice failed:", error.message);
    return null;
  }
  if (!data || data.length === 0) {
    console.error("insertInvoice: insert reported success but returned no row (check Row Level Security policies).");
    return null;
  }
  return rowToInvoice(data[0]);
}

export async function updateInvoiceById(id, patch) {
  const row = invoiceToRow(patch);
  const { data, error } = await supabase.from("invoices").update(row).eq("id", id).select();
  if (error) {
    console.error("updateInvoiceById failed:", error.message);
    return null;
  }
  if (!data || data.length === 0) {
    console.error(`updateInvoiceById: no row matched id ${id} (deleted, or blocked by Row Level Security).`);
    return null;
  }
  return rowToInvoice(data[0]);
}

export async function deleteInvoiceById(id) {
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) {
    console.error("deleteInvoiceById failed:", error.message);
    return false;
  }
  return true;
}
