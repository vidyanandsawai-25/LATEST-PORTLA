-- Water Tax Management System - Database Schema
-- PostgreSQL Schema for Production Use

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE user_role AS ENUM ('citizen', 'officer', 'admin', 'fieldOfficer');
CREATE TYPE connection_status AS ENUM ('pending', 'under_verification', 'inspection_scheduled', 'inspection_completed', 'approved', 'rejected', 'active', 'disconnected', 'suspended');
CREATE TYPE connection_type AS ENUM ('domestic', 'commercial', 'industrial', 'institutional');
CREATE TYPE meter_type AS ENUM ('mechanical', 'digital', 'smart');
CREATE TYPE bill_status AS ENUM ('unpaid', 'partially_paid', 'paid', 'overdue');
CREATE TYPE payment_mode AS ENUM ('online', 'cash', 'cheque', 'dd', 'upi');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
CREATE TYPE grievance_category AS ENUM ('billing_issue', 'meter_issue', 'water_supply', 'connection_delay', 'quality_issue', 'leakage', 'other');
CREATE TYPE grievance_status AS ENUM ('submitted', 'acknowledged', 'under_review', 'in_progress', 'resolved', 'rejected', 'closed');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_type AS ENUM ('new_connection_verification', 'meter_installation', 'inspection', 'disconnection', 'reconnection', 'meter_reading', 'complaint_resolution');
CREATE TYPE task_status AS ENUM ('assigned', 'in_progress', 'completed', 'on_hold', 'cancelled');

-- =============================================
-- CORE TABLES
-- =============================================

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role user_role NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    consumer_id VARCHAR(50) UNIQUE,
    employee_id VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    designation VARCHAR(100),
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    mobile_verified BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_role_fields CHECK (
        (role = 'citizen' AND consumer_id IS NOT NULL) OR
        (role IN ('officer', 'admin', 'fieldOfficer') AND employee_id IS NOT NULL)
    )
);

CREATE INDEX idx_users_mobile ON users(mobile_number);
CREATE INDEX idx_users_consumer_id ON users(consumer_id);
CREATE INDEX idx_users_role ON users(role);

-- OTP Table
CREATE TABLE otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mobile_number VARCHAR(15),
    consumer_id VARCHAR(50),
    otp VARCHAR(10) NOT NULL,
    purpose VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    attempts INTEGER DEFAULT 0,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_otps_mobile ON otps(mobile_number);
CREATE INDEX idx_otps_expires ON otps(expires_at);

-- Zones Table
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_code VARCHAR(20) NOT NULL UNIQUE,
    zone_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wards Table
CREATE TABLE wards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id UUID REFERENCES zones(id),
    ward_number VARCHAR(20) NOT NULL UNIQUE,
    ward_name VARCHAR(100) NOT NULL,
    population INTEGER,
    area DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wards_zone ON wards(zone_id);

-- Water Connections Table
CREATE TABLE water_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consumer_id VARCHAR(50) NOT NULL UNIQUE,
    application_number VARCHAR(50) NOT NULL UNIQUE,
    user_id UUID REFERENCES users(id),
    property_id VARCHAR(50),
    connection_type connection_type NOT NULL,
    connection_status connection_status DEFAULT 'pending',
    
    -- Applicant Details
    applicant_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    email VARCHAR(255),
    aadhar_number VARCHAR(12) NOT NULL,
    
    -- Address
    address TEXT NOT NULL,
    ward_id UUID REFERENCES wards(id),
    zone_id UUID REFERENCES zones(id),
    landmark VARCHAR(255),
    pincode VARCHAR(10) NOT NULL,
    
    -- Property Details
    plot_number VARCHAR(50) NOT NULL,
    plot_area DECIMAL(10,2) NOT NULL,
    built_up_area DECIMAL(10,2) NOT NULL,
    property_type VARCHAR(50),
    
    -- Connection Details
    meter_number VARCHAR(50),
    meter_type meter_type,
    pipe_size VARCHAR(20) NOT NULL,
    estimated_monthly_consumption DECIMAL(10,2),
    
    -- Billing Details
    security_deposit DECIMAL(10,2) NOT NULL DEFAULT 0,
    connection_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    development_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Status Tracking
    applied_date DATE NOT NULL,
    approved_date DATE,
    rejection_reason TEXT,
    activation_date DATE,
    
    -- RTS Tracking
    rts_timeline INTEGER NOT NULL,
    rts_due_date DATE NOT NULL,
    is_rts_complied BOOLEAN DEFAULT false,
    
    -- Documents (JSON array of file URLs)
    documents JSONB,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_connections_user ON water_connections(user_id);
CREATE INDEX idx_connections_status ON water_connections(connection_status);
CREATE INDEX idx_connections_ward ON water_connections(ward_id);
CREATE INDEX idx_connections_zone ON water_connections(zone_id);
CREATE INDEX idx_connections_application ON water_connections(application_number);

-- Water Bills Table
CREATE TABLE water_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_number VARCHAR(50) NOT NULL UNIQUE,
    connection_id UUID REFERENCES water_connections(id),
    user_id UUID REFERENCES users(id),
    
    -- Billing Period
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    bill_date DATE NOT NULL,
    due_date DATE NOT NULL,
    
    -- Meter Reading
    previous_reading DECIMAL(10,2) NOT NULL DEFAULT 0,
    current_reading DECIMAL(10,2) NOT NULL DEFAULT 0,
    consumption DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Charges
    water_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    sewerage_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    meter_rent DECIMAL(10,2) NOT NULL DEFAULT 0,
    development_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    environmental_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Discounts & Penalties
    rebate_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    penalty_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    late_payment_charges DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Totals
    gross_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    net_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    balance_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Status
    bill_status bill_status DEFAULT 'unpaid',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bills_connection ON water_bills(connection_id);
CREATE INDEX idx_bills_user ON water_bills(user_id);
CREATE INDEX idx_bills_status ON water_bills(bill_status);
CREATE INDEX idx_bills_due_date ON water_bills(due_date);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id VARCHAR(50) NOT NULL UNIQUE,
    bill_id UUID REFERENCES water_bills(id),
    connection_id UUID REFERENCES water_connections(id),
    user_id UUID REFERENCES users(id),
    
    amount DECIMAL(10,2) NOT NULL,
    payment_mode payment_mode NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    
    -- Payment Gateway
    transaction_id VARCHAR(100),
    gateway_response JSONB,
    
    -- Offline Payment
    cheque_number VARCHAR(50),
    cheque_date DATE,
    bank_name VARCHAR(100),
    
    -- Receipt
    receipt_number VARCHAR(50),
    receipt_date DATE,
    
    -- Collection Officer (for cash/cheque)
    collected_by UUID REFERENCES users(id),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_bill ON payments(bill_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(payment_status);

-- Meter Readings Table
CREATE TABLE meter_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id UUID REFERENCES water_connections(id),
    
    reading_date DATE NOT NULL,
    meter_reading DECIMAL(10,2) NOT NULL,
    consumption DECIMAL(10,2) NOT NULL,
    
    -- Reading Method
    reading_type VARCHAR(20) NOT NULL,
    submitted_by UUID REFERENCES users(id),
    
    -- Verification
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id),
    verification_date DATE,
    verification_remarks TEXT,
    
    -- Photo
    photo_url VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_readings_connection ON meter_readings(connection_id);
CREATE INDEX idx_readings_date ON meter_readings(reading_date);

-- Grievances Table
CREATE TABLE grievances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grievance_number VARCHAR(50) NOT NULL UNIQUE,
    user_id UUID REFERENCES users(id),
    connection_id UUID REFERENCES water_connections(id),
    application_number VARCHAR(50),
    
    -- Grievance Details
    category grievance_category NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority priority_level DEFAULT 'medium',
    
    -- Status
    status grievance_status DEFAULT 'submitted',
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    assigned_department VARCHAR(100),
    
    -- Resolution
    resolution_remarks TEXT,
    resolution_date DATE,
    resolved_by UUID REFERENCES users(id),
    
    -- Attachments
    attachments JSONB,
    
    -- RTS
    rts_timeline INTEGER NOT NULL,
    rts_due_date DATE NOT NULL,
    is_rts_complied BOOLEAN DEFAULT false,
    
    submitted_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_grievances_user ON grievances(user_id);
CREATE INDEX idx_grievances_connection ON grievances(connection_id);
CREATE INDEX idx_grievances_status ON grievances(status);
CREATE INDEX idx_grievances_assigned ON grievances(assigned_to);

-- Field Tasks Table
CREATE TABLE field_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_number VARCHAR(50) NOT NULL UNIQUE,
    task_type task_type NOT NULL,
    
    connection_id UUID REFERENCES water_connections(id),
    application_number VARCHAR(50),
    grievance_id UUID REFERENCES grievances(id),
    
    -- Assignment
    assigned_to UUID REFERENCES users(id) NOT NULL,
    assigned_by UUID REFERENCES users(id) NOT NULL,
    
    -- Schedule
    scheduled_date DATE NOT NULL,
    scheduled_time TIME,
    
    -- Location
    address TEXT NOT NULL,
    ward_id UUID REFERENCES wards(id),
    zone_id UUID REFERENCES zones(id),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Details
    description TEXT,
    priority priority_level DEFAULT 'medium',
    status task_status DEFAULT 'assigned',
    
    -- Completion
    completion_date DATE,
    completion_remarks TEXT,
    photos JSONB,
    
    -- RTS
    rts_due_date DATE NOT NULL,
    is_rts_complied BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_assigned ON field_tasks(assigned_to);
CREATE INDEX idx_tasks_connection ON field_tasks(connection_id);
CREATE INDEX idx_tasks_status ON field_tasks(status);

-- Tariff Slabs Table
CREATE TABLE tariff_slabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_type connection_type NOT NULL,
    slab_number INTEGER NOT NULL,
    min_consumption DECIMAL(10,2) NOT NULL,
    max_consumption DECIMAL(10,2) NOT NULL,
    rate_per_kl DECIMAL(10,2) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tariffs_connection_type ON tariff_slabs(connection_type);
CREATE INDEX idx_tariffs_effective ON tariff_slabs(effective_from, effective_to);

-- RTS Services Table
CREATE TABLE rts_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_code VARCHAR(20) NOT NULL UNIQUE,
    service_name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    timeline INTEGER NOT NULL,
    description TEXT,
    documents_required JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- System Configuration Table
CREATE TABLE system_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_zones_updated_at BEFORE UPDATE ON zones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_wards_updated_at BEFORE UPDATE ON wards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON water_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON water_bills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_readings_updated_at BEFORE UPDATE ON meter_readings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_grievances_updated_at BEFORE UPDATE ON grievances
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON field_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tariffs_updated_at BEFORE UPDATE ON tariff_slabs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_config_updated_at BEFORE UPDATE ON system_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- VIEWS
-- =============================================

-- Active Connections View
CREATE VIEW v_active_connections AS
SELECT 
    wc.*,
    u.name as user_name,
    u.mobile_number as user_mobile,
    w.ward_name,
    z.zone_name
FROM water_connections wc
LEFT JOIN users u ON wc.user_id = u.id
LEFT JOIN wards w ON wc.ward_id = w.id
LEFT JOIN zones z ON wc.zone_id = z.id
WHERE wc.connection_status = 'active';

-- Pending Bills View
CREATE VIEW v_pending_bills AS
SELECT 
    wb.*,
    wc.consumer_id,
    wc.applicant_name,
    wc.mobile_number,
    wc.address
FROM water_bills wb
JOIN water_connections wc ON wb.connection_id = wc.id
WHERE wb.bill_status IN ('unpaid', 'partially_paid');

-- Overdue Bills View
CREATE VIEW v_overdue_bills AS
SELECT 
    wb.*,
    wc.consumer_id,
    wc.applicant_name,
    wc.mobile_number
FROM water_bills wb
JOIN water_connections wc ON wb.connection_id = wc.id
WHERE wb.bill_status IN ('unpaid', 'partially_paid')
AND wb.due_date < CURRENT_DATE;

-- Active Grievances View
CREATE VIEW v_active_grievances AS
SELECT 
    g.*,
    u.name as complainant_name,
    u.mobile_number as complainant_mobile,
    a.name as assigned_to_name
FROM grievances g
LEFT JOIN users u ON g.user_id = u.id
LEFT JOIN users a ON g.assigned_to = a.id
WHERE g.status NOT IN ('resolved', 'closed');

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_bills_period ON water_bills(billing_period_start, billing_period_end);
CREATE INDEX idx_payments_date ON payments(created_at);
CREATE INDEX idx_grievances_date ON grievances(submitted_date);
CREATE INDEX idx_tasks_date ON field_tasks(scheduled_date);
