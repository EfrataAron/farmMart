# SDLC Steps Followed - FarmMart Application

**Project:** FarmMart Agricultural E-Commerce Platform  
**Duration:** 13 weeks  
**Methodology:** Agile with Iterative Development

---

## 1. PLANNING PHASE

**Objective:** Create an agricultural marketplace connecting farmers directly with buyers while providing intelligent farming support tools.

**Key Activities:**
- Identified market gap in direct farmer-to-buyer transactions
- Defined project scope: e-commerce platform + AI assistance + agricultural tools
- Selected technology stack: Next.js 15, TypeScript, React, Redux Toolkit, Tailwind CSS, Groq AI
- Established resource allocation and timeline (13 weeks)

**Deliverable:** Approved project charter with modern tech stack and AI integration strategy.

---

## 2. REQUIREMENTS ANALYSIS PHASE

**Functional Requirements:**
- User authentication for farmers and buyers
- Product catalog with 10 categories (Vegetables, Fruits, Seeds, Tools, Fertilizers, Equipment, Drinks, etc.)
- Shopping cart and wishlist functionality
- AI-powered chatbot using Groq SDK (Llama 3.3 70B) for farming advice
- Price trends analysis with interactive Recharts visualization
- Crop planting calendar with monthly guides and reminders
- Community forum with categories, likes, and replies
- Product of the Day feature with countdown timer
- Night Harvest dark mode theme with theme toggle
- Global search and filtering functionality

**Non-Functional Requirements:**
- Performance: Page load < 3 seconds, AI response < 5 seconds
- Security: HTTPS, environment variables, secure authentication
- Usability: Responsive design (320px to 4K), WCAG 2.1 Level AA
- Scalability: Support 1000+ concurrent users
- Compatibility: Cross-browser (Chrome, Firefox, Safari, Edge)

**Deliverable:** Software Requirements Specification (SRS) document with detailed use cases.

---

## 3. DESIGN PHASE

**System Architecture:**
- Client-Server with Server-Side Rendering (Next.js 15 App Router)
- Redux Toolkit for centralized state management (5 slices: products, cart, user, blog, projects)
- Component-based architecture with 30+ reusable React components

**UI/UX Design:**
- Orange primary color scheme (#EA580C) for agricultural branding
- Mobile-first responsive design with Tailwind CSS
- Custom components: Header with navigation/search/cart, Footer, Chatbot floating button, Product cards, Interactive charts

**Data Models:**
- Product: id, title, price, category, rating, image, inStock (63 products across 10 categories)
- User: id, name, email, role (farmer/buyer), location, joinDate
- ForumPost: id, author, role, title, content, category, likes, replies

**API Design:**
- `/api/chat` (POST) - AI chatbot interaction with conversation history
- Redux-based product data management

**Deliverable:** Architecture diagrams, UI mockups, component hierarchy, API specifications.

---

## 4. IMPLEMENTATION PHASE

**Development Phases:**

**Phase 1-2: Core Infrastructure & Layout**
- Next.js 15 setup with TypeScript, Tailwind CSS, Redux store
- Header (navigation, search, cart, theme toggle), Footer, responsive menu

**Phase 3: Product Features**
- Product catalog (TopProducts, PopularProducts, RecentViewed)
- Filtering by category and price, Product of the Day with countdown
- Shopping cart, wishlist, search with results page

**Phase 4: AI Integration**
- Groq AI SDK integration with Llama 3.3 70B model
- Chatbot UI with floating button, `/api/chat` route
- Context-aware responses with conversation history

**Phase 5: Agricultural Tools**
- Price trends with Recharts (tomatoes, maize, beans historical data)
- Selling recommendations based on price trends
- Crop calendar with monthly planting/harvesting guides, reminder system

**Phase 6-7: Community & User Management**
- Forum (post creation, categories, like/reply, search)
- Account page with profile editing, role-specific dashboards
- Farmer reporting interface

**Key Challenges Solved:**
- Redux state path mismatch (products.items vs products.products) - resolved with flexible selector
- Server-side vs client-side data loading - implemented ProductsInitializer component
- Theme provider integration - added ThemeProvider to root layout
- Color scheme consistency - systematic replacement from green to orange
- Search navigation - implemented proper Next.js router navigation

**Technology Stack:**
- Frontend: Next.js 15, React 18, TypeScript
- State: Redux Toolkit
- Styling: Tailwind CSS, SCSS Modules
- AI: Groq SDK (Llama 3.3 70B)
- Charts: Recharts
- Icons: Lucide React

**Deliverable:** Complete functional application with 8,000+ lines of code, 30+ components, 63 products.

---

## 5. TESTING PHASE

**Testing Approach:**

**Unit Testing:** Component rendering, state management, event handlers  
**Integration Testing:** Redux store, API routes, theme provider, router navigation  
**System Testing:** All features validated (✅ product browsing, AI chatbot, price trends, crop calendar, forum, theme switching, search)  
**Performance Testing:** Page load < 3s ✅, AI response < 5s ✅, image optimization ✅  
**Compatibility Testing:** Chrome, Firefox, Safari, Edge ✅; Mobile/Tablet/Desktop ✅  
**User Acceptance Testing:** Farmers, buyers, and general users validated all features ✅

**Major Issues Resolved:**
- Redux state path errors - fixed selector logic
- Missing components - created ProductSection and ProductFilters
- Theme provider not wrapping app - added to layout
- Search not navigating - implemented router.push
- Color inconsistencies - systematic updates
- Build errors - resolved TypeScript type mismatches

**Deliverable:** Fully tested application with all features working, zero critical bugs.

---

## 6. DEPLOYMENT PHASE

**Environment:** Vercel (optimized for Next.js), Node.js runtime

**Configuration:**
```
GROQ_API_KEY=<api_key>
NODE_ENV=production
```

**Deployment Process:**
1. Production build (`npm run build`)
2. Environment variables configured in Vercel
3. Application deployed to hosting platform
4. Post-deployment verification (all routes, AI chatbot, images, theme, search, charts, mobile responsiveness) ✅

**Deliverable:** Live production application accessible via web.

---

## 7. MAINTENANCE PHASE

**Ongoing Activities:**
- **Corrective:** Bug fixes, performance optimization, security patches
- **Adaptive:** Next.js updates, dependency updates, API changes
- **Perfective:** Feature enhancements, UI/UX improvements, code refactoring
- **Preventive:** Security audits, code reviews, performance monitoring

**Version Control:** Git with feature branches and pull request reviews

**Future Enhancements:** Payment gateway, email notifications, real-time tracking, mobile apps, multi-language support, advanced analytics

**Deliverable:** Maintained and continuously improved application.

---

## PROJECT METRICS & ACHIEVEMENTS

**Timeline:** Planning (1w) → Requirements (1w) → Design (2w) → Implementation (6w) → Testing (2w) → Deployment (1w) = **13 weeks total**

**Code Statistics:** 30+ components, 8,000+ lines of code, 5 Redux slices, 4+ API routes, 10+ pages, 63 products

**Key Achievements:**
✅ Functional e-commerce platform with complete shopping experience  
✅ AI integration with intelligent chatbot for farming advice  
✅ Agricultural tools (price trends, crop calendar) for informed decision-making  
✅ Community platform for knowledge sharing  
✅ Responsive design working on all devices (320px to 4K)  
✅ Modern tech stack with TypeScript for type safety  
✅ Centralized state management with Redux  
✅ Performance optimized (< 3s page load)  
✅ WCAG 2.1 Level AA accessibility compliance  

**Lessons Learned:**
- Agile methodology enabled iterative improvements and quick adaptation
- TypeScript caught errors early, improving code quality
- Next.js 15 provided excellent performance with SSR
- Component-based architecture enabled high reusability
- AI integration added significant value for users
- Redux state management required careful architecture planning
- Server-side vs client-side data loading needed special handling

---

## CONCLUSION

The FarmMart project successfully completed all seven phases of the SDLC, resulting in a modern, feature-rich agricultural e-commerce platform. The systematic approach through Planning, Requirements Analysis, Design, Implementation, Testing, Deployment, and Maintenance ensured a high-quality product that meets user needs while maintaining scalability and performance standards.

The application leverages cutting-edge technologies including Next.js 15, TypeScript, and AI integration (Groq SDK with Llama 3.3 70B) to provide farmers and buyers with a comprehensive marketplace solution that includes intelligent farming assistance, market intelligence tools, and community engagement features.

**Project Status:** ✅ Successfully Completed and Deployed

---

**Document Version:** 1.0 | **Date:** November 2025 | **Prepared By:** Development Team
