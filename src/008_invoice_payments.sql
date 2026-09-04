-- Popular Multiservice - Policy Hub
-- Migration 008: Add a payments list to invoices (date + amount entries)
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table invoices add column if not exists payments jsonb default '[]'::jsonb;
