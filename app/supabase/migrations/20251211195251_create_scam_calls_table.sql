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

  - Table is public (no RLS policies)
  - Anyone can read, insert, update, or delete data
  - Intended for public-facing educational database

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_scam_calls_call_date ON scam_calls(call_date DESC);
CREATE INDEX IF NOT EXISTS idx_scam_calls_category ON scam_calls(scam_category);
CREATE INDEX IF NOT EXISTS idx_scam_calls_vulnerability ON scam_calls(vulnerability_type);