-- Popular Multiservice - Policy Hub
-- Migration 006: Add simple/itemized pricing mode to invoices
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table invoices add column if not exists pricing_mode text default 'itemized';
alter table invoices add column if not exists manual_total numeric default 0;
