
-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  product_type TEXT NOT NULL,
  finance_type TEXT NOT NULL DEFAULT 'conventional',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  whatsapp_registered TEXT,
  nationality TEXT,
  residency_status TEXT,
  date_of_birth TEXT,
  employment_type TEXT,
  monthly_salary NUMERIC,
  employer_name TEXT,
  length_of_service TEXT,
  salary_transfer_bank TEXT,
  product_preferences JSONB,
  promo_code TEXT,
  eid_front_url TEXT,
  eid_back_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only
CREATE POLICY "Anyone can submit application"
ON public.applications
FOR INSERT
WITH CHECK (true);

-- Input validation trigger
CREATE OR REPLACE FUNCTION public.validate_application()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  IF length(NEW.mobile) < 9 OR length(NEW.mobile) > 15 THEN
    RAISE EXCEPTION 'Invalid mobile number length';
  END IF;
  IF NEW.monthly_salary IS NOT NULL AND NEW.monthly_salary < 0 THEN
    RAISE EXCEPTION 'Salary must be positive';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_application_trigger
BEFORE INSERT ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.validate_application();

-- Storage bucket for EID documents
INSERT INTO storage.buckets (id, name, public) VALUES ('application-documents', 'application-documents', false);

-- Allow anonymous uploads to application-documents bucket
CREATE POLICY "Anyone can upload application documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'application-documents');
