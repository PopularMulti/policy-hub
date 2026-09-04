import { supabase } from "./supabaseClient";

// Logos live in a PUBLIC bucket (unlike the private "documents" bucket) so
// their URL can be embedded directly in a generated invoice PDF without a
// signed-URL round trip every time.
export async function uploadLogoFile(file, clientId) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${clientId}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from("invoice-logos").upload(path, file, { upsert: true });
  if (error) {
    console.error("uploadLogoFile failed:", error.message);
    return null;
  }
  return path;
}

export function getLogoUrl(path) {
  if (!path) return "";
  const { data } = supabase.storage.from("invoice-logos").getPublicUrl(path);
  return data?.publicUrl || "";
}

export async function deleteLogoFile(path) {
  if (!path) return true;
  const { error } = await supabase.storage.from("invoice-logos").remove([path]);
  if (error) {
    console.error("deleteLogoFile failed:", error.message);
    return false;
  }
  return true;
}
