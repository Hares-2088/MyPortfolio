# Portfolio Project

![image](https://github.com/user-attachments/assets/c90f3cff-1e30-4c7d-9681-553a462804ea)

## 🚀 Overview
This is a **personal portfolio** built with **Vue.js** and **Tailwind CSS**, featuring project showcases, an admin interface for project management, and user interactions via GitHub Discussions. The backend is powered by **FastAPI**, with **MongoDB Atlas** for data storage, and the application is deployed on **DigitalOcean**.

## 🛠 Tech Stack
### Frontend
- **Vue.js** – Framework for building the UI
- **Tailwind CSS** – Styling framework
- **Comments** - My own Comments system
### Backend
- **FastAPI** – Python-based backend framework
- **MongoDB Atlas** – Cloud database for storing project data
- **Auth0** – Authentication for the admin panel

### Deployment
- **DigitalOcean** – Hosting for the frontend and backend

## 📂 Project Structure
```
/portfolio-project
│── frontend/        # Vue.js frontend
│── backend/         # FastAPI backend
│── README.md        # Project documentation
```

## 🔧 Setup & Installation
### Prerequisites
- Node.js & npm installed
- Python & pip installed
- DigitalOcean account (for deployment)
- MongoDB Atlas account

### Clone the Repository
```sh
git clone https://github.com/Hares-2088/portfolio.git
cd portfolio
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev  # Start Vue.js development server
```

### Backend Setup
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload  # Start FastAPI backend
```

## 🚀 Deployment
### Deploy Frontend on DigitalOcean
1. Build the Vue app:
   ```sh
   npm run build
   ```
2. Deploy using DigitalOcean App Platform or Droplet.
   
## 📌 Features
- **Showcase Projects** dynamically.
- **Admin Panel** to manage featured projects.
- **Auth0 Authentication** for admin access.
- **Comments** for user feedback.
- **MongoDB Atlas Database** to store project metadata.

## 📜 License
MIT License

## 🙌 Contributing
Pull requests are welcome! Feel free to fork the repo and submit improvements.

## 📧 Contact
For inquiries, reach out via [your email] or [Twitter/LinkedIn].
