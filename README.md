# 📝 Superhero Store

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-black?logo=resend)
![Lovable](https://img.shields.io/badge/Lovable-FF3B6B?logo=lovable&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)
![MIT](https://img.shields.io/badge/License-MIT-yellow)

Med ambitionen "Gemensam utveckling, gott samarbete och att lära sig nya tekniker - på egen hand och av varandra", har vi
tagit fram en webbshop som kan vara bra att hålla nära till hands. Just därför ligger den just nu på {URL Render}, redo för din bokning av superhjälten du behöver!

Vi hade i uppdrag att bygga en webbshop med valfri inriktning (vi valde superhjältar med tillbehör) som tillägg till ett tidigare projekt där vi redan byggt en admindashboard. I tillhörande MVP så skulle det finnas en readme, produktsida, detaljsida, sök & filter, paginering samt en varukorg, samtliga har implementerats.
Detta projekt är under ständig utveckling via ett **Agile Scrum** ramverk, där all planering kan följas på tillhörande Github Projects.

---

## 📑 Innehåll

- 📖 [Om projektet](#-om-projektet)
- ✨ [Funktioner](#-funktioner)
- 🛠 [Teknologier](#-teknologier)
- 📸 [UI](#-UI)
- ⚙️ [Installation](#-installation)
- 🚀 [Användning](#-användning)
- 📂 [Projektstruktur](#-projektstruktur)
- 📈 [Arbetsflöde](#-arbetsflöde)
- 🗓 [Sprintplan](#-sprintplan)
- 🤝 [Bidra](#-bidra)
- 📚 [Lärdomar](#-lärdomar)
- 📜 [Licens](#-licens)
- ✍️ [Kontakt](#-kontakt)

---

## 📖 Om projektet

Vi hade i uppdrag att bygga en webbshop med valfri inriktning (vi valde superhjältar med tillbehör) som tillägg till ett tidigare projekt där vi redan byggt en admindashboard. I tillhörande MVP så skulle det finnas en readme, produktsida, detaljsida, sök & filter, paginering samt en varukorg, samtliga har implementerats.

## ✨ Funktioner

- ✅ Startsida med huvudfunktioner
- ✅ Produktsida
- ✅ Detaljsida
- ✅ Shopsida
- ✅ Sökfunktion
- ✅ Paginering
- ✅ Filtrering
- ✅ Kundvagn
- ✅ Registrering
- ✅ Login

---

## 📸 UI

UX/UI:
<img width="1168" height="1274" alt="image" src="https://github.com/user-attachments/assets/3f1253d6-62d0-4bd6-9375-373247f3b54b" />
<img width="1108" height="427" alt="image" src="https://github.com/user-attachments/assets/1a9c5a86-da85-499e-857e-eb028137c7c5" />
<img width="955" height="751" alt="image" src="https://github.com/user-attachments/assets/8895c2b2-6216-4ffc-828e-ecd6f35616b1" />
<img width="1207" height="937" alt="image" src="https://github.com/user-attachments/assets/1f638b91-711a-4e87-8ace-f7d73446b080" />
<img width="1060" height="1271" alt="image" src="https://github.com/user-attachments/assets/dca58b1c-08a9-483c-9eda-2a3d92c5d72e" />
<img width="1034" height="837" alt="image" src="https://github.com/user-attachments/assets/3e63d555-6b43-4713-bcf0-3b6464cd9cb2" />
<img width="1088" height="1192" alt="image" src="https://github.com/user-attachments/assets/d6b15405-b6d4-4d8a-806c-0df8476c9cf7" />
<img width="515" height="953" alt="image" src="https://github.com/user-attachments/assets/468b9c6e-002c-474b-87a1-0a57eb3d038f" />
<img width="1082" height="1265" alt="image" src="https://github.com/user-attachments/assets/9e4b50f1-9863-445d-b60b-445ff4cbada8" />

**App:**

---

## 🛠 Teknologier

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Github](https://github.com/)
- [WAVE](https://wave.webaim.org/)
- [Resend](https://resend.com/)
- [Supabase](https://supabase.com/)
- [Azure-DevOps](https://azure.microsoft.com/en-us/products/devops)
- [Tailwind](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Lovable](https://lovable.dev/)

---

## ✅ Förutsättningar

**Följande krävs inför installation:**

- Node.js
- PostgreSQL
- npm

## ⚙️ Installation

```bash

# Klona repo
git clone https://github.com/velvel77/superhero-store

# Gå in i projektmappen
cd superhero-store

# Installera beroenden
npm install

# Skapa en ".env"-fil i root-foldern och kopiera över all info från .env.example, ändra utefter egna inställningar

# Starta utvecklingsserver
npm run dev:full

# Appen körs på:
http://localhost:3000

# Deployment körs på:
https://superhero-store.onrender.com/


```

---

## 🚀 Användning

- Bläddra produkter
- Sök efter specifika produkter
- Filtrera produkter
- Se detaljer för produkter
- Lägg till produkter i varukorg

---

## 📂 Projektstruktur

```
SUPERHERO-STORE/
├── .next/
├── api/
│   ├── dist/
│   ├── node_modules/
│   ├── routes/
│   ├── db.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
├── app/
│   ├── admin/
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── image/
│   │   ├── products/
│   │   │   └── route.ts
│   │   └── send/
│   │       └── route.ts
│   ├── cart/
│   ├── contact/
│   │   ├── action.ts
│   │   └── page.tsx
│   ├── login/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── products/
│   │   ├── [id]/
│   │   ├── add-product/
│   │   ├── edit/
│   │   └── page.tsx
│   ├── register/
│   ├── shop/
│   │   └── page.tsx
│   ├── superheroes/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── welcome/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── page.tsx
│   └── types.ts
├── components/
│   ├── ui/
│   └── toast-listener.tsx
├── context/
│   └── CartContext.tsx
├── data/
├── lib/
├── node_modules/
├── public/
├── server/
├── supabase/
│   ├── .temp/
│   ├── .gitignore
│   └── config.toml
├── types/
├── utils/
├── .env
├── .env.example
├── .gitignore
├── azure-pipelines.yml
├── biome.json
├── checklist.md
├── gruppkontrakt.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## 📈 Arbetsflöde

- 👥 Grupprojekt i fyra agila sprintar (SCRUM)
- 🛠️ Daily standups
- 📋 Planering och uppgiftshantering via GitHub Projects
- 🎨 Design och prototyper skapade i Loveable
- 🌱 Feature branches
- 🔍 PR + kodgranskning

---

## 🗓 Sprintplan

### Sprint 1 - Grundläggande struktur

-
-

### Sprint 2 - Grundläggande struktur

-
-

### Sprint 3 - Grundläggande struktur

-
-

### Sprint 4 - Grundläggande struktur

-
- ***

## 🤝 Bidra

Vill du bidra?

1. Forka projektet
2. Skapa en feature-branch (`git checkout feature/my-feature`)
3. Commit & push
4. Skicka en Pull Request

---

## 📚 Lärdomar

- Skillnaden mellan Server & Client Components i Next.js
- Integration med resend
- Wave och WCAG
- Ibland behöver man sova på saken
- Att agera både utvecklare, produktägare och SCRUM master i grupparbete
- Arbetsflöde via Github Projects

---

## 📜 Licens

Copyright (c) 2026 Velvet Paul, Henrietta Jeansson Alalehto, Mattias Alm and Jessica Fredin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## ✍️ Kontakt

- https://www.linkedin.com/in/velvetpaul/
- https://www.linkedin.com/in/mattias-alm/
