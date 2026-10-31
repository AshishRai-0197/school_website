# 🏫 School Website

A school website built with **Next.js** and **PostgreSQL**. It shares the school's vision and news, and has an admin page to manage extra-curricular activities.

## ✨ Features

- 🏠 **Home page**: school vision and a message from the King
- ℹ️ **About us** and 📞 **Contact us** pages
- 📝 **Apply form**: people can send their details
- 🎯 **Extra-curricular activities**: everyone can view the list
- 🔐 **Admin login**: only the admin can ➕ add, ✏️ edit and 🗑️ delete activities
  - Signed, HTTP-only session cookie (8 hours)
  - Pages and APIs are protected on the server (`proxy.ts`), not just hidden in the UI
- 🗄️ Data saved in PostgreSQL with Knex migrations and seed data

## 🛠 Built with

| Part | Tech |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Next.js API routes (REST) |
| Database | PostgreSQL + Knex.js (migrations & seeds) |

## 🚀 Run it locally

**1. Clone and install**

```bash
git clone https://github.com/AshishRai-0197/school_website.git
cd school_website
npm install
```

**2. Create a `.env` file**

```bash
cp .env.example .env
```

Then fill it in:

```env
PD_USER=your_db_user
PD_PASS=your_db_password
PD_DB=school_website
PD_PORT=5432

ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_strong_password
ADMIN_SESSION_SECRET=at_least_32_random_characters   # openssl rand -hex 32
```

**3. Create the tables, add sample data, and start**

```bash
npx knex migrate:latest
npx knex seed:run
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**4. Log in as admin**

Click **Admin** in the top menu and use the username and password from your `.env`.
After logging in you will see **Add Programme**, **Update Details** and **Delete** on the Extra-Curricular page.

## 🔌 API routes

| Method | Route | What it does |
| --- | --- | --- |
| GET | `/api/curricular` | List activities |
| POST 🔐 | `/api/curricular` | Add an activity |
| GET | `/api/curricular/[id]` | One activity |
| PUT 🔐 / DELETE 🔐 | `/api/curricular/[id]` | Edit / delete an activity |
| GET / POST | `/api/contact` | List / save contact details |
| GET | `/api/search/[name]` | Find contact details by name |
| PUT 🔐 | `/api/update/[id]` | Edit contact details |
| DELETE 🔐 | `/api/delete/[id]` | Delete contact details |
| POST | `/api/admin/login` · `/api/admin/logout` | Admin log in / out |
| GET | `/api/admin/me` | Is the visitor an admin? |

🔐 = admin login required

## 👤 Author

**Ashish Rai**: [LinkedIn](https://www.linkedin.com/in/ashish-rai-776022383/) · [GitHub](https://github.com/AshishRai-0197)
