
## Multi-Step Application Form (appro.ae-style Flow)

### Overview
Build a progressive multi-step application page at `/apply` that mirrors the appro.ae flow. The form guides users through selecting a financial product and providing their details step-by-step, with smooth animations, a progress bar, and full bilingual (EN/AR) support.

### Application Flow (7 Steps)

**Step 1 - Product Selection**
- Header: "LET'S GET THE BEST DEAL FOR YOU" / "Apply in 5 minutes"
- Filter tabs: All | Conventional | Islamic
- Product cards with images/icons: Credit Card, Personal Loan, Home Finance, Auto Loan
- Clicking a card sets the product and advances to Step 2

**Step 2 - Mobile Number + WhatsApp**
- Header: "LET'S GET STARTED WITH YOUR [PRODUCT] JOURNEY IN THE UAE."
- Mobile number input with +971 prefix
- "Is this number registered on WhatsApp?" toggle (Yes / No / I don't have WhatsApp)
- Next button

**Step 3 - Personal Details**
- Full Name
- Email Address
- Nationality (dropdown with common UAE nationalities)
- UAE Residency Status (Resident / Non-Resident)
- Date of Birth

**Step 4 - Employment and Financial Details**
- Employment Type (Salaried / Self-Employed / Business Owner)
- Monthly Salary (AED input)
- Employer Name
- Length of Service
- Salary Transfer Bank (optional dropdown)

**Step 5 - Product-Specific Preferences**
- Credit Card: "Select 3 benefits" from categorized chips (Cinema, Dining, Lifestyle, Cashback, Travel, Free add-ons) - matches the appro.ae benefits selection screen
- Personal Loan: Desired amount, preferred tenure
- Home Finance: Property value, down payment, property type (Ready/Off-plan)
- Auto Loan: Vehicle price, down payment, new/used

**Step 6 - Promo Code (Optional)**
- Promo code input dialog/section
- "I don't have a code" option to skip
- "If you are assisted by a salesperson, please check with him or her for the promo code."

**Step 7 - Document Upload + Review**
- Emirates ID upload (front and back) via file input (no camera scanning - not feasible in a web app without native APIs)
- Review summary of all entered data
- Terms and conditions checkbox
- Submit button with loading state
- Success confirmation screen with animation

### UI Design
- Progress bar at top (animated, filling as steps progress) matching appro.ae style
- "< Exit" link top-left, product name centered at top
- Conventional/Islamic toggle icons in header (Steps 2+)
- Bottom-fixed "Next" / "Back" navigation buttons
- Smooth slide transitions between steps using framer-motion
- Subtle curved decorative background shapes (matching appro.ae's wave/curve design)
- Fully responsive, works on desktop and mobile
- Full RTL support for Arabic

### Technical Details

**1. Database Migration**
Create `applications` table with columns:
- `id` (uuid, PK, default gen_random_uuid())
- `created_at` (timestamptz, default now())
- `product_type` (text) - credit_card, personal_loan, home_finance, auto_loan
- `finance_type` (text) - conventional, islamic
- `full_name` (text)
- `email` (text)
- `mobile` (text)
- `whatsapp_registered` (text)
- `nationality` (text)
- `residency_status` (text)
- `date_of_birth` (text, nullable)
- `employment_type` (text)
- `monthly_salary` (numeric)
- `employer_name` (text, nullable)
- `length_of_service` (text, nullable)
- `salary_transfer_bank` (text, nullable)
- `product_preferences` (jsonb, nullable) - stores benefits selections / product-specific fields
- `promo_code` (text, nullable)
- `eid_front_url` (text, nullable)
- `eid_back_url` (text, nullable)
- `status` (text, default 'pending')

RLS policy: Anonymous INSERT only (same pattern as contact_submissions). No public SELECT/UPDATE/DELETE.

Input validation trigger for email format and phone length.

A Supabase storage bucket `application-documents` for EID uploads, with a policy allowing anonymous uploads.

**2. New Files**
- `src/pages/Apply.tsx` - Main apply page with all step logic, sub-components for each step, framer-motion transitions, zod validation per step

**3. Updated Files**
- `src/App.tsx` - Add `/apply` route
- `src/components/Header.tsx` - Add "Apply" nav item linking to `/apply`
- `src/locales/en.json` - Add all apply page translations
- `src/locales/ar.json` - Add all Arabic apply page translations

**4. Validation**
- Client-side validation with zod per step
- Mobile number: must be valid UAE format (9 digits after +971)
- Email: valid email format
- Required fields checked before allowing "Next"
- Salary: positive number validation
- At least 3 benefits selected for credit card step
