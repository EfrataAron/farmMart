This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AgriLink folder structure
/node_modules/              # Auto-generated directory containing all project dependencies installed via npm.
├── public/
│   ├── favicon.ico         # The website’s favicon, displayed in browser tabs.
│   └── images/             # A subdirectory for static images (e.g., logos, placeholders).
├── src/
│   ├── api/
│   │   ├── auth.ts         # Defines functions for authentication-related API requests (e.g., login, register).
│   │   └── user.ts         # Handles API calls related to user data (e.g., profile updates).
│   ├── components/
│   │   ├── AdminDashboard.tsx # Component for the admin dashboard UI.
│   │   ├── BuyerDashboard.tsx # Component for the buyer dashboard UI.
│   │   ├── FarmerDashboard.tsx # Component for the farmer dashboard UI.
│   │   ├── Card.tsx        # A reusable card component for displaying products or orders.
│   │   ├── Navbar.tsx      # Navigation bar with role-based links.
│   │   └── Shared/
│   │       ├── Header.tsx  # The header layout, importing Navbar for navigation
│   │       ├── Header.scss # Sass file for Header
│   │       ├── Footer.tsx  # The footer layout with site-wide information.
│   │       └── Footer.scss # Sass file for Footer
│   ├── pages/
│   │   ├── _app.tsx        # The app wrapper, importing Header and Footer for all pages.
│   │   ├── Home.tsx        # The public home page, accessible to all users.
│   │   ├── about.tsx       # Page for about information (optional, to be implemented).
│   │   ├── Contact.tsx     # Page for contact information (optional, to be implemented).
│   │   ├── Login.tsx       # Page using Login.tsx component for authentication.
│   │   ├── Register.tsx    # Page for user signup (Buyers and Farmers only).
│   │   ├── Products.tsx    # Page for managing products.
│   │   ├── Profile.tsx     # Page for farmer profile management.
│   │   ├── Search.tsx      # Page for product search.
│   │   ├── Orders.tsx      # Page for order history.
│   │   ├── Users.tsx       # Page for user management.
│   │   └── Reports.tsx     # Page for analytics and reports.
│   ├── services/
│   │   ├── authService.ts  # Handles authentication logic (login, register).
│   │   ├── productService.ts # Manages product-related operations.
│   │   ├── orderService.ts # Handles order-related operations.
│   │   └── messagingService.ts # Manages messaging functionality (e.g., farmer-buyer communication).
│   ├── utils/
│   │   ├── api.ts          # Utility functions for API request handling.
│   │   └── helpers.ts      # Miscellaneous helper functions (e.g., formatting, validation).
│   ├── styles/
│   │   ├── globals.css     # Global Tailwind styles (optional, keep as is)
│   │   └── globals.scss    # Optional: Global Sass file with Tailwind directives
│   └── tests/              # Optional directory for unit and integration tests.
│       ├── component.test.tsx # Tests for React components.
│       └── service.test.ts # Tests for service functions.
├── server/
│   ├── controllers/
│   │   ├── authController.ts # Handles authentication logic (login, register).
│   │   ├── productController.ts # Manages product CRUD operations.
│   │   ├── orderController.ts # Handles order management.
│   │   └── messagingController.ts # Manages messaging operations.
│   ├── models/
│   │   ├── User.ts         # Defines the User model.
│   │   ├── Product.ts      # Defines the Product model.
│   │   ├── Order.ts        # Defines the Order model.
│   │   └── Message.ts      # Defines the Message model.
│   ├── routes/
│   │   ├── authRoutes.ts   # Defines authentication routes.
│   │   ├── productRoutes.ts # Defines product routes.
│   │   ├── orderRoutes.ts  # Defines order routes.
│   │   └── messagingRoutes.ts # Defines messaging routes.
│   ├── middleware/
│   │   └── authMiddleware.ts # Middleware for authentication checks.
│   ├── config/
│   │   └── db.ts           # Database connection configuration.
│   └── server.ts           # Main Express server file, integrating routes and middleware.
├── .env                    # Stores environment variables (e.g., database URL, API keys).
├── tsconfig.json           # TypeScript configuration file.
├── next.config.js          # Next.js configuration file.
├── package.json            # Project metadata, dependencies, and scripts.
├── package-lock.json       # Locks dependency versions for consistency.
├── postcss.config.js       # PostCSS configuration for Tailwind CSS.
├── tailwind.config.js      # Tailwind CSS customization file.
└── README.md               # Project documentation. 