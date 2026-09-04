-- Popular Multiservice - Policy Hub
-- Migration 009: Insured & property info for non-auto policies (Renters, Homeowners)
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table customers add column if not exists property_info jsonb default '{}'::jsonb;
