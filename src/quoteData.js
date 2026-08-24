import { supabase } from "./supabaseClient";

// Same translation pattern as customerData.js - camelCase in the app, snake_case in the database.

function rowToQuote(row) {
  return {
    id: row.id,
    quoteNumber: row.quote_number,
    driverName: row.driver_name || "",
    phone: row.phone || "",
    email: row.email || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    zip: row.zip || "",
    office: row.office || "Rampart Office",
    carrier: row.carrier || "",
    policyType: row.policy_type || "Personal Auto",
    policyAmount: row.policy_amount || "",
    downPayment: row.down_payment || "",
    dateQuoted: row.date_quoted || "",
    drivers: row.drivers || [],
    vehicles: row.vehicles || [],
    existingCustomer: row.existing_customer || false,
    bound: row.bound || false,
    createdBy: row.created_by || "",
    createdAt: row.created_at || "",
  };
}

function quoteToRow(quote) {
  const row = {};
  if ("quoteNumber" in quote) row.quote_number = quote.quoteNumber;
  if ("driverName" in quote) row.driver_name = quote.driverName;
  if ("phone" in quote) row.phone = quote.phone;
  if ("email" in quote) row.email = quote.email;
  if ("address" in quote) row.address = quote.address;
  if ("city" in quote) row.city = quote.city;
  if ("state" in quote) row.state = quote.state;
  if ("zip" in quote) row.zip = quote.zip;
  if ("office" in quote) row.office = quote.office;
  if ("carrier" in quote) row.carrier = quote.carrier;
  if ("policyType" in quote) row.policy_type = quote.policyType;
  if ("policyAmount" in quote) row.policy_amount = quote.policyAmount;
  if ("downPayment" in quote) row.down_payment = quote.downPayment;
  if ("dateQuoted" in quote) row.date_quoted = quote.dateQuoted;
  if ("drivers" in quote) row.drivers = quote.drivers;
  if ("vehicles" in quote) row.vehicles = quote.vehicles;
  if ("existingCustomer" in quote) row.existing_customer = quote.existingCustomer;
  if ("bound" in quote) row.bound = quote.bound;
  if ("createdBy" in quote) row.created_by = quote.createdBy || null;
  return row;
}

export async function fetchQuotes() {
  const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("fetchQuotes failed:", error.message);
    return [];
  }
  return data.map(rowToQuote);
}

export async function insertQuote(quote) {
  const row = quoteToRow(quote);
  const { data, error } = await supabase.from("quotes").insert(row).select().single();
  if (error) {
    console.error("insertQuote failed:", error.message);
    return null;
  }
  return rowToQuote(data);
}

export async function updateQuoteById(id, patch) {
  const row = quoteToRow(patch);
  const { data, error } = await supabase.from("quotes").update(row).eq("id", id).select().single();
  if (error) {
    console.error("updateQuoteById failed:", error.message);
    return null;
  }
  return rowToQuote(data);
}

export async function deleteQuoteById(id) {
  const { error } = await supabase.from("quotes").delete().eq("id", id);
  if (error) {
    console.error("deleteQuoteById failed:", error.message);
    return false;
  }
  return true;
}
