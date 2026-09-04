-- Popular Multiservice - Policy Hub
-- Combined pending migrations — run this ONE file in Supabase:
-- Project -> SQL Editor -> New Query -> paste this whole file -> Run
--
-- This is the exact same statements as 006_invoice_pricing_mode.sql,
-- 007_invoice_client_description.sql, 008_invoice_payments.sql,
-- 009_customer_property_info.sql, and 010_customer_middle_name.sql,
-- combined into one file so there's only one thing to run.
-- If you already ran some of these individually, running this again is
-- safe — every line uses "if not exists" so it won't error or duplicate.

-- 006: Simple/itemized pricing mode on invoices
alter table invoices add column if not exists pricing_mode text default 'itemized';
alter table invoices add column if not exists manual_total numeric default 0;

-- 007: Business description on invoice_clients (replaces Tax ID / EIN)
alter table invoice_clients add column if not exists description text default '';

-- 008: Payments list on invoices (date + amount entries)
alter table invoices add column if not exists payments jsonb default '[]'::jsonb;

-- 009: Insured & property info for non-auto policies (Renters, Homeowners)
alter table customers add column if not exists property_info jsonb default '{}'::jsonb;

-- 010: Optional middle name on customers
alter table customers add column if not exists middle_name text default '';
