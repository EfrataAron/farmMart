# FarmMart 🌾

A modern agricultural e-commerce platform connecting farmers directly with buyers. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### For Buyers
- 🛒 **Shopping Cart & Wishlist** - Save and purchase products
- 🔍 **Smart Search** - Find products quickly with advanced filtering
- 💬 **AI Chatbot** - Get instant help with farming advice and product recommendations
- 📊 **Price Trends** - Track historical crop prices to make informed decisions
- 📅 **Crop Calendar** - View optimal planting and harvesting times
- 👥 **Community Forum** - Connect with farmers and share knowledge
- 📦 **Order Tracking** - Monitor your orders in real-time

### For Farmers
- 📈 **Dashboard** - Comprehensive analytics and insights
- 🌱 **Product Management** - Add, edit, and manage your products
- 📊 **Reports** - Track sales, revenue, and performance
- 💼 **Profile Management** - Showcase your farm and products
- 📬 **Order Management** - Handle customer orders efficiently
- ⚙️ **Settings** - Customize your preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/farmmart.git
cd farmmart
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
API_KEY_FARM=your_groq_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.10, SASS
- **State Management:** Redux Toolkit
- **UI Components:** Lucide React, React Icons
- **Charts:** Recharts
- **Forms:** React Hook Form
- **AI Integration:** Groq SDK (Llama 3.3)

## 📁 Project Structure

```
farmmart/
├── src/
│   ├── app/
│   │   ├── (main)/          # Main marketplace pages
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── products/    # Product listings
│   │   │   ├── community/   # Community forum
│   │   │   ├── price-trends/# Price analytics
│   │   │   ├── crop-calendar/# Planting calendar
│   │   │   └── account/     # User account
│   │   ├── farmer/          # Farmer dashboard
│   │   │   ├── dashboard/
│   │   │   ├── addproduct/
│   │   │   ├── productlist/
│   │   │   ├── orders/
│   │   │   ├── report/
│   │   │   └── settings/
│   │   └── api/
│   │       └── chat/        # AI chatbot API
│   ├── components/
│   │   ├── shared/          # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Chatbot.tsx
│   │   ├── farmer/          # Farmer components
│   │   └── product-section/ # Product displays
│   ├── contexts/            # React contexts
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── ThemeContext.tsx
│   ├── store/               # Redux store
│   │   ├── authSlice.ts
│   │   ├── productsSlice.ts
│   │   ├── blogSlice.ts
│   │   └── projectsSlice.ts
│   └── data/                # Mock data
├── public/
│   └── images/
├── .env
├── package.json
└── README.md
```

## 🎨 Key Features Explained

### AI Chatbot
Powered by Groq's Llama 3.3 model, the chatbot provides:
- Farming advice and tips
- Product recommendations
- Order and shipping information
- General customer support

### Price Trends
Interactive charts showing:
- Historical crop prices
- Monthly price changes
- Sell recommendations based on trends
- Market insights

### Crop Calendar
Helps farmers plan with:
- Monthly planting schedules
- Harvesting timelines
- Growing tips for each crop
- Reminder system

### Community Forum
Connect and share:
- Ask questions
- Share farming tips
- Find buyers/suppliers
- Category-based discussions

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run lint:fix # Fix linting issues
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY_FARM` | Groq API key for AI chatbot | Yes |

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For support or inquiries, reach out at support@farmmart.com

---

Built with ❤️ for farmers and agricultural communities
