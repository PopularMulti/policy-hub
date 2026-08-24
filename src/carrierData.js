import { supabase } from "./supabaseClient";

function rowToCarrier(row) {
  return { id: row.id, name: row.name, portalUrl: row.portal_url || "" };
}

export async function fetchCarriers() {
  const { data, error } = await supabase.from("carriers").select("*").order("name", { ascending: true });
  if (error) {
    console.error("fetchCarriers failed:", error.message);
    return [];
  }
  return data.map(rowToCarrier);
}

export async function insertCarrier(name) {
  const { data, error } = await supabase.from("carriers").insert({ name, portal_url: "" }).select().single();
  if (error) {
    console.error("insertCarrier failed:", error.message);
    return null;
  }
  return rowToCarrier(data);
}

export async function updateCarrierById(id, portalUrl) {
  const { data, error } = await supabase.from("carriers").update({ portal_url: portalUrl }).eq("id", id).select().single();
  if (error) {
    console.error("updateCarrierById failed:", error.message);
    return null;
  }
  return rowToCarrier(data);
}

export async function deleteCarrierById(id) {
  const { error } = await supabase.from("carriers").delete().eq("id", id);
  if (error) {
    console.error("deleteCarrierById failed:", error.message);
    return false;
  }
  return true;
}
