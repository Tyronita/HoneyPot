/*
  # UK Scam Calls Intelligence Database

  ## Overview
  Creates database schema for storing and analyzing anonymized UK scam call data
  captured by AI voice agents. This public-facing system helps protect vulnerable
  people by sharing insights about fraud techniques.

  ## New Tables
  
  ### `scam_calls`
  Stores anonymized scam call records with analysis data
  - `id` (uuid, primary key) - Unique identifier for each scam call
  - `call_date` (timestamptz) - When the scam call occurred
  - `scam_category` (text) - Type of scam (e.g., Banking Fraud, HMRC Impersonation)
  - `vulnerability_type` (text) - Target vulnerability (e.g., Elderly, Financial Pressure)
  - `call_duration_seconds` (integer) - Length of the call in seconds
  - `summary` (text) - Brief description of the scam attempt
  - `techniques` (text[]) - Array of manipulation techniques used
  - `unique_aspect` (text) - What made this scam attempt notable
  - `transcript` (text) - Anonymized conversation transcript
  - `created_at` (timestamptz) - When the record was created

  ## Security
  
  ### Row Level Security (RLS)
  - Enabled on `scam_calls` table
  - Public read access: Anyone can view scam data (anonymized, educational purpose)
  - Restricted write access: Only authenticated service accounts can insert/update data
  
  ### Policies
  1. **Public Read Access** - Allows anyone to view scam call data for educational purposes
  2. **Authenticated Insert** - Only authenticated users can add new scam records
  3. **Authenticated Update** - Only authenticated users can update existing records
  4. **Authenticated Delete** - Only authenticated users can delete records

  ## Notes
  - All data is anonymized to protect privacy
  - Public access is intentional to raise awareness about scam tactics
  - Timestamps use UTC timezone
  - Techniques stored as array for flexible filtering
*/

-- Create scam_calls table
CREATE TABLE IF NOT EXISTS scam_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_date timestamptz NOT NULL,
  scam_category text NOT NULL,
  vulnerability_type text NOT NULL,
  call_duration_seconds integer NOT NULL DEFAULT 0,
  summary text NOT NULL,
  techniques text[] NOT NULL DEFAULT '{}',
  unique_aspect text NOT NULL,
  transcript text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scam_calls ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read scam data (public educational purpose)
CREATE POLICY "Public can view scam data"
  ON scam_calls
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert scam data"
  ON scam_calls
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update scam data"
  ON scam_calls
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete scam data"
  ON scam_calls
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_scam_calls_call_date ON scam_calls(call_date DESC);
CREATE INDEX IF NOT EXISTS idx_scam_calls_category ON scam_calls(scam_category);
CREATE INDEX IF NOT EXISTS idx_scam_calls_vulnerability ON scam_calls(vulnerability_type);