import { supabase } from "./supabaseClient";

function rowToEmployee(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    office: row.office || "Rampart Office",
    role: row.role || "Employee",
    status: row.status || "Active",
  };
}

export async function fetchEmployees() {
  const { data, error } = await supabase.from("employees").select("*").order("name", { ascending: true });
  if (error) {
    console.error("fetchEmployees failed:", error.message);
    return [];
  }
  return data.map(rowToEmployee);
}

// Only role/office/status can be changed from the app. Creating a brand-new
// employee requires a real Supabase Auth account first (Authentication -> Users),
// which needs elevated permissions the browser app intentionally doesn't have -
// that step still happens in the Supabase dashboard, same as initial setup.
export async function updateEmployeeById(id, patch) {
  const row = {};
  if ("role" in patch) row.role = patch.role;
  if ("office" in patch) row.office = patch.office;
  if ("status" in patch) row.status = patch.status;
  const { data, error } = await supabase.from("employees").update(row).eq("id", id).select().single();
  if (error) {
    console.error("updateEmployeeById failed:", error.message);
    return null;
  }
  return rowToEmployee(data);
}
