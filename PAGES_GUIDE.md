# EMYTALENT Website — Complete Page Structure

## Overview
This website now includes the main landing page plus dedicated pages for services, company information, and legal documents.

---

## Main Pages

### **1. Home Page**
- **File:** `index.html` (root)
- **Content:** Landing page with hero, about, services overview, testimonials, and contact
- **Access:** Direct root URL

---

## Service Pages

### **2. HR Advisory & Business Partnering**
- **File:** `services/hr-advisory.html`
- **Access:** `/services/hr-advisory.html`
- **Content:** Detailed service description, key offerings (6 sub-services), benefits, CTA

### **3. Payroll Management**
- **File:** `services/payroll-management.html`
- **Access:** `/services/payroll-management.html`
- **Content:** Payroll service details, coverage areas, compliance, outsourcing benefits

### **4. Recruitment & Talent Acquisition**
- **File:** `services/recruitment.html`
- **Access:** `/services/recruitment.html`
- **Content:** Recruitment approach, service levels (executive, mid-level, graduate), process overview

### **5. Training & Development**
- **File:** `services/training-development.html`
- **Access:** `/services/training-development.html`
- **Content:** Training programs (4 categories), learning approach, program formats

### **6. EMYTALENT Academy**
- **File:** `services/emytalent-academy.html`
- **Access:** `/services/emytalent-academy.html`
- **Content:** Academy overview, differentiators, leadership development programs

### **7. HR Outsourcing**
- **File:** `services/hr-outsourcing.html`
- **Access:** `/services/hr-outsourcing.html`
- **Content:** Flexible HR support, on-boarding/off-boarding, policies, temporary staffing

---

## Company Pages

### **8. About Us**
- **File:** `pages/about.html`
- **Access:** `/pages/about.html`
- **Content:** Company mission, vision, 5 core values with detailed descriptions, company purpose

---

## Legal Pages

### **9. Privacy Policy**
- **File:** `legal/privacy-policy.html`
- **Access:** `/legal/privacy-policy.html`
- **Content:** Data collection, usage, security, user rights, contact information

### **10. Terms of Service**
- **File:** `legal/terms-of-service.html`
- **Access:** `/legal/terms-of-service.html`
- **Content:** Terms of use, disclaimer, limitations, governing law, modifications

---

## Navigation Structure

### Footer Links:
- **Company Section:**
  - Home → `/`
  - About Us → `/pages/about.html`
  - Services → `/#services` (home page)
  - Contact → `/#contact` (home page)

- **Services Section:**
  - HR Advisory → `/services/hr-advisory.html`
  - Payroll Management → `/services/payroll-management.html`
  - Recruitment → `/services/recruitment.html`
  - Training & Development → `/services/training-development.html`
  - EMYTALENT Academy → `/services/emytalent-academy.html`
  - HR Outsourcing → `/services/hr-outsourcing.html`

- **Legal Section:**
  - Privacy Policy → `/legal/privacy-policy.html`
  - Terms of Service → `/legal/terms-of-service.html`

---

## Service Pages Features

Each service page includes:
1. ✅ Navbar (dynamic theme toggle, menu)
2. ✅ Hero section with headline and overview
3. ✅ Service details cards
4. ✅ Key benefits section
5. ✅ Call-to-action button
6. ✅ Footer (company info, links, socials)

All service pages are fully functional with:
- Dark/Light theme support
- Responsive mobile design
- Image optimization (srcset, lazy loading)
- Scroll reveal animations
- Back-to-top button

---

## File Organization

```
emyv5/
├── index.html                          (Main landing page)
├── services/
│   ├── hr-advisory.html
│   ├── payroll-management.html
│   ├── recruitment.html
│   ├── training-development.html
│   ├── emytalent-academy.html
│   └── hr-outsourcing.html
├── pages/
│   └── about.html
├── legal/
│   ├── privacy-policy.html
│   └── terms-of-service.html
├── src/
│   ├── css/
│   │   ├── variables.css
│   │   ├── main.css
│   │   └── bootstrap.min.css
│   ├── js/
│   │   ├── main.js
│   │   ├── bootstrap.bundle.min.js
│   │   ├── animations.js
│   │   ├── forms.js
│   │   └── navigation.js
│   ├── components/
│   │   ├── navbar.html
│   │   ├── about.html
│   │   ├── services.html
│   │   ├── testimonials.html
│   │   ├── contact.html
│   │   └── footer.html
│   └── assets/
│       ├── icon/
│       │   ├── favicon.ico
│       │   ├── favicon-16x16.png
│       │   ├── favicon-32x32.png
│       │   ├── apple-touch-icon.png
│       │   ├── icon-192x192.png
│       │   └── icon-512x512.png
│       └── images/
│           └── logos/
│               ├── EMY TALENTS LOGO BLACK.png
│               ├── EMY TALENTS LOGO WHITE.png
│               └── EMY TALENTS LOGO only.png
```

---

## Deployment Notes

### Relative Path Handling:
- **From `/` (root):** Links use relative paths starting with `./`
- **From `/services/` and `/pages/`:** Links use `../` to go up to root
- **From `/legal/`:** Links use `../` to go up to root

All pages include:
- `<link href="../src/assets/icon/...">` for favicons
- `<link href="../src/css/...">` for stylesheets
- `<script src="../src/js/...">` for JavaScript

The navbar and footer load dynamically from `../src/components/` on each page.

---

## To Add New Pages:

1. Create file in appropriate directory (`services/`, `pages/`, or `legal/`)
2. Copy HTML structure from existing page of same type
3. Update page title and meta description
4. Update favicon and asset paths to use `../src/...`
5. Add navbar and footer: 
   ```html
   <div id="navbar"></div>
   ... page content ...
   <div id="footer"></div>
   ```
6. Include loading script:
   ```html
   <script src="../src/js/main.js"></script>
   <script>
       (async () => {
           await loadComponent('navbar', '../src/components/navbar.html');
           await loadComponent('footer', '../src/components/footer.html');
           // ... other initializations
       })();
   </script>
   ```
7. Add link in footer for visibility

---

## Testing Checklist

- ✅ All service pages load with correct content
- ✅ Navbar and footer render on every page
- ✅ Theme toggle works (dark/light mode)
- ✅ Links in footer work correctly
- ✅ Service card links point to correct pages
- ✅ Images load with proper srcset and lazy loading
- ✅ Mobile responsive design works
- ✅ Back-to-top button appears on scroll
- ✅ Animations trigger on scroll

