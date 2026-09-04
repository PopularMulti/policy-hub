-- Popular Multiservice - Policy Hub
-- Migration 010: Optional middle name on customers
-- Run this in Supabase: Project → SQL Editor → New Query → paste → Run

alter table customers add column if not exists middle_name text default '';
