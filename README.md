📊 Project Description – Expenso
Expenso is a fullstack expense management application built using PERN stack without ORM.

⚙️ Tech Stack
Frontend: React + TypeScript + Redux Toolkit Query + ShadCN UI
Backend: Node.js + Express + PostgreSQL
Database: PostgreSQL
Tools: Docker, Docker Compose, pgAdmin

🔑 Key Features
• Add, edit, delete, and filter expenses by category, amount, and date
• Sorting and pagination for efficient browsing
• Category management with custom icons
• Dashboard showing monthly spending trends and top 3 spending days

🧠 React Architecture Highlights

Smart & Dumb Components
• Smart components handle logic, API, and state (e.g., Dashboard, CategoryList)
• Dumb components are purely presentational (e.g., CategoryCard, ExpenseRow)

Custom Hooks
• Encapsulate reusable logic like category form handling, filtering, and API abstraction

Modular Design
Code organized by features:
• /components
• /hooks
• /features/expense, /features/category
• /types, /utils

Readable & Maintainable Code
• Descriptive naming
• Clear separation of concerns
• Comments added where logic is conditional or complex

🚀 How to Start the Project
Make sure Docker and Git are installed.

1. Clone the Repository
git clone https://github.com/rahul-patel-24/expenso.git
cd expenso

2. Start All Services
docker compose up --build

This will start:
• Frontend: http://localhost:5173
• Backend (API): http://localhost:5000
• Database: PostgreSQL on localhost:5432
• pgAdmin: http://localhost:5050

<img width="964" alt="create_category" src="https://github.com/user-attachments/assets/ef4e065e-125a-437f-bf0e-abf7398942b8" />
<img width="967" alt="expenso_category" src="https://github.com/user-attachments/assets/5c18dd99-c3ee-4462-ac63-bfc85405c604" />
<img width="964" alt="expenso_login" src="https://github.com/user-attachments/assets/160e83e9-5396-4efe-a140-85453ea51be2" />
<img width="959" alt="expenso_filter" src="https://github.com/user-attachments/assets/18e37ce6-7874-46b6-8145-0dba98a5a203" />
<img width="961" alt="expenses_light" src="https://github.com/user-attachments/assets/2f8c4788-d9d8-4559-ae43-f2c890546afe" />
<img width="962" alt="expenso_add_expenses" src="https://github.com/user-attachments/assets/8a428597-d196-4f47-84b3-06f0242f3fbf" />
<img width="967" alt="expenso_dark" src="https://github.com/user-attachments/assets/df627999-5269-4689-a486-dedb4cc070ef" />
<img width="949" alt="expenso_dash_light" src="https://github.com/user-attachments/assets/f683d6e6-05a9-47a8-8885-f03ff3fa932d" />
<img width="962" alt="expenso_dash" src="https://github.com/user-attachments/assets/47f5431b-7802-439e-b534-cfa31a091b2c" />

