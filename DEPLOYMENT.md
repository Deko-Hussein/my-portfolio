# Deployment Guide

## Recommended Setup

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 1. Deploy Backend on Render

Render can read the included `render.yaml` file automatically.

Set these environment variables in Render:

- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGINS`

Example:

```env
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

After deploy, your backend URL will look like:

```text
https://your-backend-name.onrender.com
```

Your API base URL will then be:

```text
https://your-backend-name.onrender.com/api
```

## 2. Deploy Frontend on Vercel

Import the `frontend` folder into Vercel as the project root.

Set this environment variable in Vercel:

```env
VITE_API_URL=https://your-backend-name.onrender.com/api
```

The included `frontend/vercel.json` makes React Router routes work on refresh.

## 3. Important Notes

- Do not use `http://localhost:5000/api` in production
- Do not commit real `.env` files
- If the frontend loads but data does not appear, the cause is usually:
  - wrong `VITE_API_URL`
  - missing `CORS_ORIGINS`
  - backend not deployed yet

## 4. Example Final Pair

- Frontend: `https://your-portfolio.vercel.app`
- Backend: `https://your-api.onrender.com`
- Frontend env: `VITE_API_URL=https://your-api.onrender.com/api`
- Backend env: `CORS_ORIGINS=https://your-portfolio.vercel.app`
