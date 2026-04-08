-- Admin user seed script
-- Password: admin123 (hashed with bcrypt)
-- Run this SQL on your production database

INSERT INTO User (email, password, firstName, lastName, role, isActive, createdAt, updatedAt) 
VALUES (
    'admin@beaulii.com', 
    '$2b$10$WqNWyzocDn9VCKJiO0fezey/XqbyVra7z9yoIHf1Cxy3zpc6rab6O', 
    'Admin', 
    'User', 
    'SUPER_ADMIN', 
    true, 
    NOW(), 
    NOW()
) 
ON DUPLICATE KEY UPDATE email = email;
