/*
  # Initial Schema for Svastha Healthcare

  1. New Tables
    - `profiles`
      - Stores user profile information for all user types
      - Links to Supabase auth.users
    - `appointments`
      - Manages doctor appointments
      - Tracks status and details
    - `medications`
      - Stores medication information
      - Tracks inventory for chemists
    - `prescriptions`
      - Links patients with medications
      - Includes dosage and instructions
    - `medical_records`
      - Stores patient medical records
      - Links to appointments and prescriptions

  2. Security
    - Enable RLS on all tables
    - Add policies for each user role
    - Secure access to sensitive information

  3. Enums
    - appointment_status
    - user_role
    - prescription_status
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'chemist');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE prescription_status AS ENUM ('active', 'completed', 'cancelled');

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL,
  full_name text NOT NULL,
  phone_number text,
  date_of_birth date,
  specialization text, -- For doctors
  license_number text, -- For doctors and chemists
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id),
  doctor_id uuid REFERENCES profiles(id),
  scheduled_at timestamptz NOT NULL,
  status appointment_status DEFAULT 'pending',
  reason text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medications table
CREATE TABLE medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  dosage_form text NOT NULL, -- e.g., tablet, capsule, syrup
  strength text NOT NULL, -- e.g., 500mg, 10ml
  manufacturer text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medication inventory
CREATE TABLE medication_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id),
  chemist_id uuid REFERENCES profiles(id),
  quantity integer NOT NULL DEFAULT 0,
  batch_number text,
  expiry_date date NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prescriptions table
CREATE TABLE prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id),
  doctor_id uuid REFERENCES profiles(id),
  appointment_id uuid REFERENCES appointments(id),
  status prescription_status DEFAULT 'active',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prescription details
CREATE TABLE prescription_medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid REFERENCES prescriptions(id),
  medication_id uuid REFERENCES medications(id),
  dosage text NOT NULL,
  frequency text NOT NULL,
  duration text NOT NULL,
  instructions text,
  created_at timestamptz DEFAULT now()
);

-- Medical records table
CREATE TABLE medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id),
  doctor_id uuid REFERENCES profiles(id),
  appointment_id uuid REFERENCES appointments(id),
  record_type text NOT NULL,
  description text NOT NULL,
  attachments jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Doctors can view patient profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'doctor'
    )
  );

-- Appointments policies
CREATE POLICY "Patients can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

-- Medications policies
CREATE POLICY "Anyone can view medications"
  ON medications FOR SELECT
  TO authenticated
  USING (true);

-- Medication inventory policies
CREATE POLICY "Chemists can manage their inventory"
  ON medication_inventory FOR ALL
  TO authenticated
  USING (chemist_id = auth.uid())
  WITH CHECK (chemist_id = auth.uid());

CREATE POLICY "Others can view inventory"
  ON medication_inventory FOR SELECT
  TO authenticated
  USING (true);

-- Prescriptions policies
CREATE POLICY "Patients can view their prescriptions"
  ON prescriptions FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can manage prescriptions"
  ON prescriptions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'doctor'
    )
  );

-- Medical records policies
CREATE POLICY "Patients can view their records"
  ON medical_records FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can manage medical records"
  ON medical_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'doctor'
    )
  );