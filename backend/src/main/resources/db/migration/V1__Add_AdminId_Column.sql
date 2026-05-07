-- Add admin_id column to users table
ALTER TABLE users ADD COLUMN admin_id BIGINT NOT NULL;

-- Add admin_id column to projects table
ALTER TABLE projects ADD COLUMN admin_id BIGINT NOT NULL;

-- Add admin_id column to tasks table
ALTER TABLE tasks ADD COLUMN admin_id BIGINT NOT NULL;

-- Update existing data to assign admin_id based on current ownership
-- (This step assumes you have a way to determine the admin for existing data)
-- Example: UPDATE users SET admin_id = id WHERE role = 'ADMIN';