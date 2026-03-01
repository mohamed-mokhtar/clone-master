
-- 1. Validation trigger for contact_submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $$
BEGIN
  -- Email format validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  -- Name length validation
  IF length(trim(NEW.name)) < 2 OR length(trim(NEW.name)) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  -- Message length validation
  IF length(trim(NEW.message)) < 10 OR length(trim(NEW.message)) > 5000 THEN
    RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
  END IF;
  -- Phone validation (optional)
  IF NEW.phone IS NOT NULL AND (length(trim(NEW.phone)) < 7 OR length(trim(NEW.phone)) > 20) THEN
    RAISE EXCEPTION 'Phone number must be between 7 and 20 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();

-- 2. Restrict storage uploads to allowed file types and add path structure
DROP POLICY IF EXISTS "Anyone can upload application documents" ON storage.objects;

CREATE POLICY "Restricted application document uploads"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'application-documents'
  AND char_length(name) < 200
  AND lower((storage.extension(name))) IN ('jpg', 'jpeg', 'png', 'pdf')
);

-- 3. Set file size limit on the bucket (5MB)
UPDATE storage.buckets
SET file_size_limit = 5242880
WHERE id = 'application-documents';
