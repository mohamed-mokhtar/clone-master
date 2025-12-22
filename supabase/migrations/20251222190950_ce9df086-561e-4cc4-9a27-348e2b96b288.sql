-- Remove the overly permissive SELECT policy
-- Contact form submissions should not be viewable by regular users
-- When an admin panel is implemented, a proper role-based policy can be added
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;