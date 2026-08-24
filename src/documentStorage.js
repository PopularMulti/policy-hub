import { supabase } from "./supabaseClient";

// Uploads a file to the "documents" bucket under a folder per customer,
// so files stay organized and are easy to find/clean up per customer.
export async function uploadDocumentFile(file, customerId) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${customerId}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from("documents").upload(path, file);
  if (error) {
    console.error("uploadDocumentFile failed:", error.message);
    return null;
  }
  return path;
}

// Generates a temporary (1 hour) signed link so an employee can view/download
// a file. Files are private, so this is the only way to actually open one.
export async function getDocumentUrl(path) {
  const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, 60 * 60);
  if (error) {
    console.error("getDocumentUrl failed:", error.message);
    return null;
  }
  return data.signedUrl;
}

export async function deleteDocumentFile(path) {
  const { error } = await supabase.storage.from("documents").remove([path]);
  if (error) {
    console.error("deleteDocumentFile failed:", error.message);
    return false;
  }
  return true;
}
