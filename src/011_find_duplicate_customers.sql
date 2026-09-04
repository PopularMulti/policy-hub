-- Popular Multiservice - Policy Hub
-- Migration 011: Find (and optionally remove) duplicate customer rows
--
-- This does NOT delete anything by itself. Run the SELECT first, review
-- the results, and only run the DELETE at the bottom if you're sure.

-- STEP 1: See every duplicate group (same name + phone), newest first
-- within each group. Run just this block first.
select id, name, phone, policy_number, created_at
from customers
where (name, phone) in (
  select name, phone
  from customers
  group by name, phone
  having count(*) > 1
)
order by name, phone, created_at asc;

-- STEP 2: Once you've confirmed the rows above are true duplicates
-- (identical name + phone), uncomment and run this to keep only the
-- OLDEST row in each duplicate group and delete the rest.
--
-- delete from customers a
-- using customers b
-- where a.name = b.name
--   and a.phone = b.phone
--   and a.created_at > b.created_at;
