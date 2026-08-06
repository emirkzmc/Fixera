-- Dükkanlar / İşletmeler
CREATE TABLE IF NOT EXISTS workshops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    theme_color VARCHAR(10) DEFAULT '#3B82F6',
    sms_enabled BOOLEAN DEFAULT false,
    whatsapp_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcılar / Ustalar
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id UUID NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

-- Müşteriler (CRM)
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id UUID NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

-- İş Emirleri / Araçlar
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id UUID NOT NULL,
    customer_id UUID,
    customer_name VARCHAR(100), -- Geriye dönük uyumluluk veya misafir müşteri için opsiyonel
    item_identifier VARCHAR(50) NOT NULL, 
    issue_description TEXT,               
    status VARCHAR(50) DEFAULT 'waiting', 
    price DECIMAL(10,2) DEFAULT 0.00,
    tracking_code VARCHAR(20) UNIQUE NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Stok ve Yedek Parça (Inventory)
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id UUID NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    stock_quantity INT DEFAULT 0,
    critical_level INT DEFAULT 5,
    price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

-- Kullanılan Parçalar (Job Parts)
CREATE TABLE IF NOT EXISTS job_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    inventory_id UUID NOT NULL,
    quantity_used INT NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE
);

-- Ödemeler (Payments)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id UUID NOT NULL,
    job_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed', -- pending, completed vs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);