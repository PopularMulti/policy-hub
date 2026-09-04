import { supabase } from "./supabaseClient";

// The app uses camelCase objects everywhere (customer.companyName, customer.driverDetails, etc).
// The database uses snake_case columns (company_name, driver_details, etc).
// These two functions translate between them so nothing else in the app has to change.

function rowToCustomer(row) {
  return {
    id: row.id,
    name: row.name,
    middleName: row.middle_name || "",
    companyName: row.company_name || "",
    phone: row.phone || "",
    email: row.email || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    zip: row.zip || "",
    office: row.office || "Rampart Office",
    policyType: row.policy_type || "Personal Auto",
    carrier: row.carrier || "",
    policyNumber: row.policy_number || "",
    effectiveDate: row.effective_date || "",
    expiryDate: row.expiry_date || "",
    insuredName: row.insured_name || "",
    otherDetails: row.other_details || "",
    policyAmount: row.policy_amount || "",
    downPayment: row.down_payment || "",
    needsPolicyNumber: row.needs_policy_number || false,
    driverDetails: row.driver_details || [],
    drivers: row.drivers || [],
    vehicles: row.vehicles || [],
    propertyInfo: row.property_info || {},
    documents: row.documents || [],
    notes: row.notes || [],
    policyHistory: row.policy_history || [],
    requotes: row.requotes || [],
    activityLog: row.activity_log || [],
    additionalPolicies: row.additional_policies || [],
    followUp: row.follow_up || false,
    followUpReason: row.follow_up_reason || "",
    followUpDate: row.follow_up_date || "",
    archived: row.archived || false,
    active: row.active || false,
    createdBy: row.created_by || "",
    createdAt: row.created_at || "",
  };
}

function customerToRow(customer) {
  const row = {};
  if ("name" in customer) row.name = customer.name;
  if ("middleName" in customer) row.middle_name = customer.middleName;
  if ("companyName" in customer) row.company_name = customer.companyName;
  if ("phone" in customer) row.phone = customer.phone;
  if ("email" in customer) row.email = customer.email;
  if ("address" in customer) row.address = customer.address;
  if ("city" in customer) row.city = customer.city;
  if ("state" in customer) row.state = customer.state;
  if ("zip" in customer) row.zip = customer.zip;
  if ("office" in customer) row.office = customer.office;
  if ("policyType" in customer) row.policy_type = customer.policyType;
  if ("carrier" in customer) row.carrier = customer.carrier;
  if ("policyNumber" in customer) row.policy_number = customer.policyNumber;
  if ("effectiveDate" in customer) row.effective_date = customer.effectiveDate;
  if ("expiryDate" in customer) row.expiry_date = customer.expiryDate;
  if ("insuredName" in customer) row.insured_name = customer.insuredName;
  if ("otherDetails" in customer) row.other_details = customer.otherDetails;
  if ("policyAmount" in customer) row.policy_amount = customer.policyAmount;
  if ("downPayment" in customer) row.down_payment = customer.downPayment;
  if ("needsPolicyNumber" in customer) row.needs_policy_number = customer.needsPolicyNumber;
  if ("driverDetails" in customer) row.driver_details = customer.driverDetails;
  if ("drivers" in customer) row.drivers = customer.drivers;
  if ("vehicles" in customer) row.vehicles = customer.vehicles;
  if ("propertyInfo" in customer) row.property_info = customer.propertyInfo;
  if ("documents" in customer) row.documents = customer.documents;
  if ("notes" in customer) row.notes = customer.notes;
  if ("policyHistory" in customer) row.policy_history = customer.policyHistory;
  if ("requotes" in customer) row.requotes = customer.requotes;
  if ("activityLog" in customer) row.activity_log = customer.activityLog;
  if ("additionalPolicies" in customer) row.additional_policies = customer.additionalPolicies;
  if ("followUp" in customer) row.follow_up = customer.followUp;
  if ("followUpReason" in customer) row.follow_up_reason = customer.followUpReason;
  if ("followUpDate" in customer) row.follow_up_date = customer.followUpDate;
  if ("archived" in customer) row.archived = customer.archived;
  if ("active" in customer) row.active = customer.active;
  if ("createdBy" in customer) row.created_by = customer.createdBy || null;
  return row;
}

export async function fetchCustomers() {
  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: true });
  if (error) {
    console.error("fetchCustomers failed:", error.message);
    return [];
  }
  return data.map(rowToCustomer);
}

export async function insertCustomer(customer) {
  const row = customerToRow(customer);
  const { data, error } = await supabase.from("customers").insert(row).select().single();
  if (error) {
    console.error("insertCustomer failed:", error.message);
    return null;
  }
  return rowToCustomer(data);
}

export async function updateCustomerById(id, patch) {
  const row = customerToRow(patch);
  const { data, error } = await supabase.from("customers").update(row).eq("id", id).select().single();
  if (error) {
    console.error("updateCustomerById failed:", error.message);
    return null;
  }
  return rowToCustomer(data);
}

export async function deleteCustomerById(id) {
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) {
    console.error("deleteCustomerById failed:", error.message);
    return false;
  }
  return true;
}
