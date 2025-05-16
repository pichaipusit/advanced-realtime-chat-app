A full-stack real-time chat application built with Next.js, Convex, and Clerk — designed to be fast, interactive, and scalable. This project demonstrates my skills in full-stack development, real-time data, authentication

## 🚀 Features
🧑‍🤝‍🧑 Real-time messaging

📌 Pin messages and scroll to them instantly

❤️ Emoji reactions

🗑️ Edit and unsend (delete) messages

🔐 Auth & user management with Clerk (Google login)

🧭 Responsive and mobile-friendly UI

## 📸 Demo
Live app: <a href="https://advanced-realtime-chat-app.vercel.app/" target="_blank">advanced-realtime-chat-app</a>
Try logging in with Google and messaging yourself!
<img width="552" alt="Screenshot 2568-05-17 at 06 02 14" src="https://github.com/user-attachments/assets/053cc93e-0825-410e-a7d1-c6814e311354" />

## 🔧 Local Setup
Configure .env.local with your Clerk and Convex keys
```
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# convex clerk
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=
```
```
npm install
npx convex dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


