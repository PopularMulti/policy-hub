import { supabase } from "./supabaseClient";

function rowToInvoiceClient(row) {
  return {
    id: row.id,
    businessName: row.business_name || "",
    logoPath: row.logo_path || "",
    contactName: row.contact_name || "",
    phone: row.phone || "",
    email: row.email || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    zip: row.zip || "",
    description: row.description || "",
    office: row.office || "",
    createdBy: row.created_by || null,
    createdAt: row.created_at || "",
  };
}

function invoiceClientToRow(client) {
  const row = {};
  if ("businessName" in client) row.business_name = client.businessName;
  if ("logoPath" in client) row.logo_path = client.logoPath;
  if ("contactName" in client) row.contact_name = client.contactName;
  if ("phone" in client) row.phone = client.phone;
  if ("email" in client) row.email = client.email;
  if ("address" in client) row.address = client.address;
  if ("city" in client) row.city = client.city;
  if ("state" in client) row.state = client.state;
  if ("zip" in client) row.zip = client.zip;
  if ("description" in client) row.description = client.description;
  if ("office" in client) row.office = client.office;
  if ("createdBy" in client) row.created_by = client.createdBy;
  return row;
}

export async function fetchInvoiceClients() {
  const { data, error } = await supabase.from("invoice_clients").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("fetchInvoiceClients failed:", error.message);
    return [];
  }
  return (data || []).map(rowToInvoiceClient);
}

export async function insertInvoiceClient(client) {
  const row = invoiceClientToRow(client);
  const { data, error } = await supabase.from("invoice_clients").insert(row).select();
  if (error) {
    console.error("insertInvoiceClient failed:", error.message);
    return null;
  }
  if (!data || data.length === 0) {
    console.error("insertInvoiceClient: insert reported success but returned no row (check Row Level Security policies).");
    return null;
  }
  return rowToInvoiceClient(data[0]);
}

export async function updateInvoiceClientById(id, patch) {
  const row = invoiceClientToRow(patch);
  const { data, error } = await supabase.from("invoice_clients").update(row).eq("id", id).select();
  if (error) {
    console.error("updateInvoiceClientById failed:", error.message);
    return null;
  }
  if (!data || data.length === 0) {
    console.error(`updateInvoiceClientById: no row matched id ${id} (deleted, or blocked by Row Level Security).`);
    return null;
  }
  return rowToInvoiceClient(data[0]);
}

export async function deleteInvoiceClientById(id) {
  const { error } = await supabase.from("invoice_clients").delete().eq("id", id);
  if (error) {
    console.error("deleteInvoiceClientById failed:", error.message);
    return false;
  }
  return true;
}
