-- Popular Multiservice - Policy Hub
-- Migration 005: Add notes to quotes
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table quotes add column if not exists notes jsonb default '[]'::jsonb;
