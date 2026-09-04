-- Popular Multiservice - Policy Hub
-- Migration 007: Replace tax_id with a business description on invoice_clients
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table invoice_clients add column if not exists description text default '';

-- tax_id is left in place (not dropped) in case any existing data is still
-- wanted for reference — the app no longer reads or writes it.
