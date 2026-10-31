# 🏫 School Website

A school website built with **Next.js** and **PostgreSQL**. It shares the school's vision and news, and has an admin page to manage extra-curricular activities.

## ✨ Features

- 🏠 **Home page**: school vision and a message from the King
- ℹ️ **About us** and 📞 **Contact us** pages
- 📝 **Apply form**: people can send their details
- 🎯 **Extra-curricular activities (CRUD)**:
  - ➕ Add a new activity
  - ✏️ Edit an activity
  - 🗑️ Delete an activity
  - 🔍 Search activities
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

```env
PD_USER=your_db_user
PD_PASS=your_db_password
PD_DB=school_website
PD_PORT=5432
```

**3. Create the tables, add sample data, and start**

```bash
npx knex migrate:latest
npx knex seed:run
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🔌 API routes

| Method | Route | What it does |
| --- | --- | --- |
| GET / POST | `/api/curricular` | List / add activities |
| PUT | `/api/update/[id]` | Edit an activity |
| DELETE | `/api/delete/[id]` | Delete an activity |
| GET | `/api/search/[id]` | Find an activity |
| GET / POST | `/api/contact` | Read / save contact details |

## 👤 Author

**Ashish Rai**: [LinkedIn](https://www.linkedin.com/in/ashish-rai-776022383/) · [GitHub](https://github.com/AshishRai-0197)
