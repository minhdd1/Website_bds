# \# 41-internationalization.md

# 

# \# Internationalization Strategy

# 

# Project:

# Kayla Nguyen Editorial Real Estate Website

# 

# Languages:

# 

# \* Vietnamese (default)

# \* English

# 

# The platform MUST be designed as bilingual from day one.

# 

# The system MUST NOT assume Vietnamese-only content.

# 

# \---

# 

# \## Goals

# 

# Support:

# 

# \* Vietnamese readers

# \* Foreign residents in Vietnam

# \* International clients

# \* Expat office tenants

# \* Overseas property buyers

# 

# \---

# 

# \## Locale Structure

# 

# Supported locales:

# 

# \* vi

# \* en

# 

# Default locale:

# 

# \* vi

# 

# \---

# 

# \## URL Structure

# 

# Vietnamese

# 

# /vi

# /vi/properties

# /vi/offices

# /vi/areas

# /vi/journal

# /vi/about

# /vi/contact

# 

# English

# 

# /en

# /en/properties

# /en/offices

# /en/areas

# /en/journal

# /en/about

# /en/contact

# 

# \---

# 

# \## Root Route

# 

# The root route "/" should redirect based on:

# 

# 1\. User preference

# 2\. Browser language

# 3\. Default locale (vi)

# 

# \---

# 

# \## Next.js Structure

# 

# app/

# 

# \[locale]/

# 

# ├── page.tsx

# ├── properties/

# ├── offices/

# ├── areas/

# ├── journal/

# ├── about/

# └── contact/

# 

# \---

# 

# \## Fallback Rules

# 

# When English translation does not exist:

# 

# Display Vietnamese content.

# 

# Never show empty content.

# 

# Never show errors because of missing translations.

# 

# \---

# 

# \## SEO

# 

# Every page must support:

# 

# \* localized title

# \* localized description

# \* localized metadata

# 

# Example:

# 

# Vietnamese:

# Masteri Thảo Điền 2PN

# 

# English:

# Masteri Thao Dien 2 Bedroom Apartment

# 

# \---

# 

# \## Hreflang

# 

# All pages must generate:

# 

# hreflang="vi"

# hreflang="en"

# 

# for proper international SEO.

# 

# \---

# 

# \## Language Switcher

# 

# Required.

# 

# Must preserve current page context.

# 

# Example:

# 

# /vi/areas/thao-dien

# 

# switches to

# 

# /en/areas/thao-dien

# 

# without returning to homepage.

# 

# \---

# 

# \## Technical Recommendation

# 

# Use:

# 

# next-intl

# 

# for localization.

# 

# Avoid custom i18n solutions.

# 

# \---

# 

# \## CMS Requirements

# 

# All editable content must support:

# 

# \* Vietnamese

# \* English

# 

# inside Sanity.

# 

# No page should require code deployment to update translations.



