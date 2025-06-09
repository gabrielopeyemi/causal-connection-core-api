# 🚀 NestJS Boilerplate with MongoDB & Swagger

A scalable **NestJS** boilerplate with **MongoDB**, **Swagger documentation**, **CORS whitelist**, and **environment validation**.

## 📂 Project Structure
```sh
/src
  ├── /types               # Type definitions
  │     ├── env.types.ts
  │     ├── cors.types.ts
  │     ├── mongoose.types.ts
  │     ├── index.ts
  ├── app.module.ts        # Main application module
  ├── main.ts              # Entry point
  ├── app.controller.ts    # API controller
  ├── app.service.ts       # Business logic
.env                       # Environment variables
```

## ⚡ Features
✅ **NestJS** - Modular and scalable architecture  
✅ **MongoDB (Mongoose)** - Database integration  
✅ **Swagger** - API documentation (`/api/docs`)  
✅ **CORS Whitelist** - Secure API access  
✅ **Environment Variable Validation** - Prevent misconfigurations  
✅ **TypeScript** - Strongly typed codebase  

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-repo/nest-mongodb-boilerplate.git
cd nest-mongodb-boilerplate
```

### 2️⃣ **Install Dependencies**
```sh
yarn install
```
_(or `npm install`)_

### 3️⃣ **Setup Environment Variables**
Create a `.env` file in the root:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydatabase
CORS_WHITELIST=http://localhost:3000,http://example.com
```

### 4️⃣ **Run the Application**
```sh
yarn start:dev
```
_(or `npm run start:dev`)_

App will run at: **`http://localhost:3000`**  
Swagger API Docs: **`http://localhost:3000/api/docs`**

---

## 🛠 API Documentation (Swagger)
Swagger UI is available at:  
📌 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**  

To customize, edit `main.ts`:
```ts
const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .build();
```

---

## 🚦 Available Scripts

| Command              | Description                           |
|----------------------|---------------------------------------|
| `yarn start`        | Start the app in production mode      |
| `yarn start:dev`    | Run the app in development mode       |
| `yarn build`        | Build the app for production         |
| `yarn test`         | Run unit tests                       |

---

## 🛠 Tech Stack
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger](https://swagger.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📝 License
This project is licensed under the **MIT License**.

---

### 🚀 Happy Coding! 💻🎯
