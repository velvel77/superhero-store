Grundläggande Krav (MVP)
Readme: Projektet ska dokumenteras och presenteras med en snygg och informativ readme.
Produktsida: Visa alla produkter i ett snyggt grid. Kunna klicka in på varje produkt.
Detaljsida: Dynamiska routes (/products/[id]) för att visa mer info om en specifik vara.
Sök & Filter: Fortsatt användning av searchParams för att filtrera kategorier eller söka på namn.
Paginering För att bläddra mellan sidorna på produktsidan/överssiktssidan
Varukorg: En statisk sida med varukorg. Som den kan se ut när du vill lägga till och ta bort produkter och få översikt, men utan funktionalitet (vill ni ha den funktionell så är det valbart, se nedan).

Tech stack:
Backend Express
Frontend Node.js 
Databas: Postgres + Supabase
UX/UI: Loveable
Versionshantering: Git+GitHub
Agile Scrum: Github Projects

Level up Prio 1:
🔐 Autentisering: Implementera inloggning för kunder (t.ex. via Clerk, Kinde, Auth0 eller NextAuth). Koppla detta till att skydda vissa rutter (som "Mina sidor"), kundvagn eller favoriter.
☁️ Database Migration: Flytta er data från JSON-server till en riktig molndatabas som Supabase eller Neon (PostgreSQL). Ev kan ni också använda ORM som Prisma eller Drizzle för att koppla till er kod. Alternativt kan ni göra ett eget API med Express.
〽️ Optimering: Lägg in suspense på strömmande delar och se till att cachning fungerar optimalt (ev använd cache components). Implementera useTransition/startTransition och useOptimistic för UI-uppdateringar.
📦 Varukorg: Hantera varukorgen med persistens via cookies/databas (alt localstorage) eller globala state via Zustand (alt useContext).
🌍 Deployment: Driftsätt applikationen på Vercel eller liknande och se till att API:et fungerar i produktion (detta kräver dock annat API än json-server om ni inte har en speciell server för detta).
🎨 UI-Library: Bygg ett enhetligt och professionellt UI med Shadcn/ui och Tailwind CSS.

Level up Prio 2:
📨 Kontakt & Mail: Skapa ett kontaktformulär som faktiskt skickar ett mail (t.ex. via Resend eller Nodemailer).
⚙️ Testning: Implementera E2E-testning via Playwright/Cypress och/eller unit testning med Jest/Vitest
