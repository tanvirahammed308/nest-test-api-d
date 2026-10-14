& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\18\data" -l "C:\Program Files\PostgreSQL\18\data\server.log"

# E-Commerce Backend API

A RESTful e-commerce backend built with **NestJS, TypeScript, Prisma ORM, and PostgreSQL**. The project includes product and category management, user authentication dependencies, cart and order functionality, payment-related modules, and Cloudinary image uploads.

## 🚀 Tech Stack

- **Framework:** NestJS 12
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma ORM 7
- **Database Adapter:** `@prisma/adapter-pg`
- **Configuration:** `@nestjs/config`
- **Authentication:** Passport, JWT, bcrypt
- **Image Storage:** Cloudinary
- **Caching / Data Store:** Redis with ioredis
- **Validation:** class-validator and class-transformer
- **File Uploads:** Multer
- **Testing:** Jest and Supertest
- **Code Quality:** Oxlint and Prettier

## ✨ Features

- RESTful API architecture
- Product CRUD operations
- Category management
- User management
- Shopping cart functionality
- Order management
- Payment-related endpoints
- Image uploads through Cloudinary
- PostgreSQL database integration with Prisma
- Environment-based configuration
- Authentication dependencies for secure API development

> Feature availability depends on the implemented controllers, services, and authentication configuration.

## 📁 Project Structure

```text
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── prisma/
│   │   └── prisma.service.ts
│   ├── cloudinary/
│   │   ├── cloudinary.module.ts
│   │   ├── cloudinary.service.ts
│   │   └── uploaded-image.type.ts
│   ├── products/
│   │   ├── dto/
│   │   ├── products.controller.ts
│   │   └── products.service.ts
│   ├── categories/
│   ├── users/
│   ├── cart/
│   ├── orders/
│   └── payments/
├── test/
├── .env
├── package.json
└── README.md
```

*The structure above is illustrative. Adjust it to match your actual project files.*

## 🛠️ Prerequisites

Install the following before starting:

- Node.js (a version compatible with your NestJS and Prisma dependencies)
- npm
- PostgreSQL
- A Cloudinary account
- Redis, if your application uses Redis features

## ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd backend
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
PORT=7000

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ecommerce?schema=public"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

JWT_SECRET="your_strong_jwt_secret"

REDIS_HOST="localhost"
REDIS_PORT=6379
```

Add any other variables required by your actual application.

**Security:** Never commit `.env` to GitHub. Add it to `.gitignore`, and use your deployment platform's environment-variable settings in production.

## 🗄️ Database Setup

This project uses Prisma ORM 7 with PostgreSQL.

Make sure your Prisma configuration and PostgreSQL adapter are configured according to Prisma 7 requirements.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply development migrations:

```bash
npx prisma migrate dev --name init
```

If migrations already exist, use the existing migration history rather than creating an unnecessary initial migration.

## ▶️ Run the Application

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

By default, if configured in `main.ts`, the API will be available at:

```text
http://localhost:7000/api
```

## 🧪 Prisma Studio

Prisma Studio provides a graphical interface for inspecting and editing database records.

```bash
npx prisma studio
```

Open the local URL displayed in your terminal, commonly:

```text
http://localhost:5555
```

Use Prisma Studio to inspect products, categories, users, and other database records.

## 📡 API Endpoints

The following endpoints reflect the routes currently identified in the project. Authentication requirements and request schemas depend on your implementation.

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve a product by ID |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Other Modules

| Module | Base Endpoint | Typical purpose |
|---|---|---|
| Categories | `/api/categories` | Category management |
| Users | `/api/users` | User management |
| Cart | `/api/cart` | Shopping cart operations |
| Orders | `/api/orders` | Order management |
| Payments | `/api/payments` | Payment operations |

Check each controller for its exact methods, parameters, validation rules, and authentication requirements.

## 🖼️ Product Image Upload

Product image uploads use Cloudinary and Multer.

For creating or updating a product with an image, use Postman:

1. Select `POST` or `PATCH`.
2. Choose **Body → form-data**.
3. Add product fields such as `name`, `description`, `price`, and `stock` as text fields.
4. Add `image` as a **File** field.
5. Send the request.

Example:

```text
PATCH http://localhost:7000/api/products/7
```

The controller uses `FileInterceptor('image')`, so the file field must be named `image`.

When updating text fields without an image, send only the required text fields. The image is optional in the current controller.

## 🧹 Quality Checks

Format the code:

```bash
npm run format
```

Run lint checks:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## 📦 Build

```bash
npm run build
```

The production startup script runs the compiled application from `dist/main`.

## 🔒 Security Best Practices

- Keep secrets and database credentials out of source control.
- Validate and transform incoming request data.
- Protect private endpoints with appropriate authentication and authorization guards.
- Restrict upload file types and file sizes.
- Assign Cloudinary API keys only the permissions they require.
- Avoid exposing sensitive error details in production.
- Use HTTPS in production.
- Back up your database regularly.

## 📄 License

This project currently uses the `UNLICENSED` license setting in `package.json`. Do not redistribute it as an open-source project unless you intentionally change the licensing terms.
