-- Popular Multiservice - Policy Hub
-- Migration 012: Phone number on invoice "Bill To" info
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table invoices add column if not exists bill_to_phone text default '';
