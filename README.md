<<<<<<< HEAD
# React + Vite
=======
# 🎓 ScholarStream - Scholarship Management Platform (Client)

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](YOUR_LIVE_URL_HERE)
[![GitHub](https://img.shields.io/badge/github-client-blue)](https://github.com/Eshrat48/ScholarStream-Client)
[![React](https://img.shields.io/badge/react-19.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-7.2.4-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.1.17-cyan)](https://tailwindcss.com/)

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Live URLs](#-live-urls)
- [Key Features](#-key-features)
- [Technologies Used](#-technologies-used)
- [NPM Packages](#-npm-packages)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Pages & Routes](#-pages--routes)
- [Features in Detail](#-features-in-detail)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Scripts](#-scripts)
>>>>>>> e27cff0 (Add all requirements and comprehensive documentation)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

<<<<<<< HEAD
Currently, two official plugins are available:
=======
**ScholarStream** is a comprehensive full-stack MERN (MongoDB, Express, React, Node.js) scholarship management platform that bridges the gap between students seeking educational funding and universities/organizations offering scholarships. The platform streamlines the entire scholarship lifecycle—from discovery and application to review and approval.

### Purpose
- **For Students**: Discover, apply for, and track scholarship applications with secure payment processing
- **For Universities/Organizations**: Efficiently post and manage scholarship opportunities
- **For Moderators**: Review applications, provide feedback, and update application status
- **For Administrators**: Comprehensive analytics, user management, and full platform control

### Why ScholarStream?
Finding financial aid for education is complex and time-consuming. ScholarStream:
- ✅ Centralizes scholarship opportunities in one platform
- ✅ Simplifies the application process with secure online payments
- ✅ Provides real-time application tracking and feedback
- ✅ Offers analytics for data-driven decision-making
- ✅ Streamlines the review process for administrators

## 🌐 Live URLs

- **Client (Frontend)**: [YOUR_LIVE_URL_HERE]
- **Server (Backend)**: [YOUR_SERVER_URL_HERE]
- **GitHub Client**: [https://github.com/Eshrat48/ScholarStream-Client](https://github.com/Eshrat48/ScholarStream-Client)
- **GitHub Server**: [YOUR_SERVER_REPO_URL_HERE]
>>>>>>> e27cff0 (Add all requirements and comprehensive documentation)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<<<<<<< HEAD
## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
### 🎯 Core Functionality

#### For Students
- 🔍 **Advanced Search & Filter**: Search by name, university, degree with real-time filtering
- 🎓 **Browse Scholarships**: Filter by category (Full Fund, Partial, Self-fund), subject, country
- 💳 **Secure Payment**: Stripe-integrated payment for application fees
- 📊 **Application Tracking**: Real-time status updates (Pending → Processing → Completed)
- 📝 **Review System**: Rate and review scholarships after application completion
- 🎯 **Personal Dashboard**: Manage profile, applications, and reviews
- 💰 **Retry Payments**: Re-attempt failed payment transactions
- ✏️ **Edit Applications**: Modify pending applications before review

#### For Moderators
- 📋 **Application Management**: Review all submitted applications with detailed information
- ✍️ **Feedback System**: Provide constructive feedback to applicants
- 🔄 **Status Updates**: Change application status (Pending/Processing/Completed/Rejected)
- ⭐ **Review Moderation**: Monitor and delete inappropriate reviews
- 📊 **Comprehensive Overview**: Access to all platform applications

#### For Administrators
- ➕ **Scholarship CRUD**: Create, read, update, and delete scholarship listings
- 👥 **User Management**: Manage user roles (Student ↔ Moderator ↔ Admin)
- 📈 **Analytics Dashboard**: 
  - Total users, scholarships, and fees collected
  - Application distribution by university (Bar Chart using Recharts)
  - Application distribution by category (Pie Chart using Recharts)
- 🗑️ **Complete Control**: Delete users and manage entire platform
- 📊 **Data Visualization**: Interactive charts for quick insights

### 🎨 UI/UX Features
- ✨ **Smooth Animations**: Framer Motion animations throughout
- 📱 **Fully Responsive**: Optimized for xs, sm, md, lg, xl screens with mobile hamburger menu
- 🌙 **Clean Design**: Modern, professional interface with DaisyUI components
- ⚡ **Fast Loading**: Skeleton loaders on all data-fetching pages
- 🔒 **Protected Routes**: Secure authentication with Firebase
- 🎭 **Custom 404 Page**: Beautiful error handling

### 🔐 Security Features
- 🔑 **JWT Authentication**: Secure token-based authentication
- 🛡️ **Role-Based Access Control**: Three-tier permission system (Student/Moderator/Admin)
- 🔒 **Environment Variables**: Secure configuration for Firebase and Stripe keys
- ✅ **Password Validation**: Min 6 chars, capital letter, special character
- 🚪 **Middleware Protection**: verifyToken, verifyAdmin, verifyModerator on server

### 🚀 Advanced Features
- 🔍 **Server-Side Search**: Fast and efficient scholarship search
- 🎯 **Advanced Filtering**: Multiple filter criteria (category, subject, country, degree)
- 📊 **Sorting Options**: Sort by fees, deadline, post date
- 📄 **Pagination**: Server-side pagination for optimal performance
- 💾 **Payment Recovery**: Save unsuccessful payment attempts for retry
- 📧 **Social Login**: Google authentication support

## 🛠️ Technologies Used

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | Component-based UI library |
| **React Router** | 7.10.1 | Client-side routing and navigation |
| **Vite** | 7.2.4 | Lightning-fast build tool and dev server |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS framework |
| **DaisyUI** | 5.5.8 | Tailwind CSS component library |
| **Framer Motion** | 12.23.25 | Animation library for smooth transitions |
| **Firebase** | 12.6.0 | Authentication and user management |
| **Stripe** | 20.0.0 / 8.5.3 | Payment processing integration |
| **React Icons** | 5.5.0 | Comprehensive icon library |
| **Recharts** | 3.5.1 | Chart library for analytics visualization |

### Development Tools
- **ESLint** - Code linting and quality control
- **@vitejs/plugin-react** - React support for Vite
- **Nodemon** (server) - Auto-restart development server

## 📦 NPM Packages

### Dependencies
```json
{
  "@stripe/react-stripe-js": "^5.4.1",      // Stripe React components
  "@stripe/stripe-js": "^8.5.3",             // Stripe.js client library
  "@tailwindcss/vite": "^4.1.17",            // Tailwind CSS Vite plugin
  "firebase": "^12.6.0",                     // Firebase SDK for auth
  "framer-motion": "^12.23.25",              // Animation library
  "react": "^19.2.0",                        // React core library
  "react-dom": "^19.2.0",                    // React DOM rendering
  "react-icons": "^5.5.0",                   // Icon components (FaXxx, FiXxx)
  "react-router": "^7.10.1",                 // Router core
  "react-router-dom": "^7.10.1",             // Router DOM bindings
  "recharts": "^3.5.1",                      // Charting library
  "stripe": "^20.0.0",                       // Stripe Node.js library
  "tailwindcss": "^4.1.17"                   // Tailwind CSS framework
}
```

### Dev Dependencies
```json
{
  "@eslint/js": "^9.39.1",                   // ESLint JavaScript config
  "@types/react": "^19.2.5",                 // React TypeScript definitions
  "@types/react-dom": "^19.2.3",             // React DOM TypeScript definitions
  "@vitejs/plugin-react": "^5.1.1",          // Vite React plugin
  "daisyui": "^5.5.8",                       // DaisyUI component library
  "eslint": "^9.39.1",                       // ESLint linter
  "eslint-plugin-react-hooks": "^7.0.1",     // React Hooks linting rules
  "eslint-plugin-react-refresh": "^0.4.24",  // React Refresh linting
  "globals": "^16.5.0",                      // Global identifiers
  "vite": "^7.2.4"                           // Vite build tool
}
```

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control
- **Firebase Account** - For authentication ([Firebase Console](https://console.firebase.google.com/))
- **Stripe Account** - For payment processing ([Stripe Dashboard](https://dashboard.stripe.com/))
- **MongoDB Atlas Account** - For database (server-side requirement)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/Eshrat48/ScholarStream-Client.git
cd ScholarStream-Client
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration (Get from Firebase Console → Project Settings)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration (Point to your backend server)
VITE_API_URL=http://localhost:5000/api/v1

# Stripe Configuration (Get from Stripe Dashboard → Developers → API Keys)
# Use Publishable Key (pk_test_... for test mode, pk_live_... for production)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

**Environment Variables Explained:**

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Firebase Console → Project Settings → General |
| `VITE_API_URL` | Backend API base URL | Your server URL (local or deployed) |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key (safe for frontend) | Stripe Dashboard → Developers → API Keys |

#### 4. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select existing)
3. Enable **Authentication**:
   - Click **Authentication** → **Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (configure OAuth consent screen)
4. Copy configuration values from **Project Settings** → **General** → **Your apps** → **Web app**
5. Add authorized domains:
   - Go to **Authentication** → **Settings** → **Authorized domains**
   - Add `localhost` (already there by default)
   - Add your deployed domain (e.g., `your-app.netlify.app` or `your-app.vercel.app`)

#### 5. Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or log in
3. Navigate to **Developers** → **API Keys**
4. Copy **Publishable key** (pk_test_... for test mode)
5. Add to `.env.local` as `VITE_STRIPE_PUBLIC_KEY`

**Test Cards for Stripe (Test Mode):**
- Success: `4242 4242 4242 4242` (any future date, any CVC)
- Decline: `4000 0000 0000 0002`
- Requires Authentication: `4000 0025 0000 3155`

#### 6. Start Development Server
```bash
npm run dev
```
The application will be available at **http://localhost:5173**

#### 7. Build for Production
```bash
npm run build
```
Production files will be in the `dist/` folder.

#### 8. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
scholar-stream-client/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images and media
│   │   └── scholars/               # Scholarship-related images
│   ├── components/                  # Reusable components
│   │   ├── BrandLogo.jsx           # Application logo
│   │   ├── PrivateRoute.jsx        # Protected route wrapper
│   │   └── ScrollToTop.jsx         # Scroll restoration
│   ├── config/
│   │   └── firebase.js             # Firebase configuration & initialization
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication context provider
│   ├── hooks/
│   │   └── useAuth.js              # Custom authentication hook
│   ├── layouts/
│   │   ├── RootLayout.jsx          # Main layout (Navbar + Footer + Outlet)
│   │   └── DashboardLayout.jsx     # Dashboard layout with sidebar
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx                   # Home page wrapper
│   │   │   ├── HomeBanner.jsx             # Hero section with search CTA
│   │   │   ├── TopScholarships.jsx        # Top 6 scholarships section
│   │   │   ├── HearFrom.jsx               # Success stories/testimonials
│   │   │   └── FAQ.jsx                    # FAQ accordion section
│   │   ├── AllScholarships.jsx            # Scholarship listing (search/filter/sort/pagination)
│   │   ├── ScholarshipDetails.jsx         # Individual scholarship page with reviews
│   │   ├── Checkout.jsx                   # Stripe payment page
│   │   ├── PaymentSuccess.jsx             # Payment success confirmation
│   │   ├── PaymentFailed.jsx              # Payment failure page
│   │   ├── Login.jsx                      # Login page (email/password + Google)
│   │   ├── Register.jsx                   # Registration page with validation
│   │   ├── Error.jsx                      # Custom 404 error page
│   │   ├── Dashboard/
│   │   │   ├── StudentDashboard.jsx       # Student dashboard home
│   │   │   ├── MyProfile.jsx              # User profile page
│   │   │   ├── MyApplications.jsx         # Student applications (edit/delete/pay)
│   │   │   ├── MyReviews.jsx              # Student reviews (edit/delete)
│   │   │   ├── ManageApplications.jsx     # Moderator application management
│   │   │   ├── AllReviews.jsx             # Moderator review management
│   │   │   ├── AddScholarship.jsx         # Admin scholarship creation form
│   │   │   ├── ManageScholarships.jsx     # Admin scholarship management (edit/delete)
│   │   │   ├── ManageUsers.jsx            # Admin user management (role change/delete)
│   │   │   └── Analytics.jsx              # Admin analytics with Recharts
│   │   └── Shared/
│   │       ├── NavBar/Navbar.jsx          # Responsive navigation bar
│   │       └── Footer/Footer.jsx          # Footer component
│   ├── routes/
│   │   └── router.jsx                     # Route configuration (React Router)
│   ├── utils/
│   │   ├── apiClient.js                   # API client with JWT token handling
│   │   ├── constants.js                   # Application constants
│   │   └── validators.js                  # Form validation functions
│   ├── main.jsx                           # Application entry point
│   └── index.css                          # Global styles (Tailwind imports)
├── .env.local                             # Environment variables (CREATE THIS!)
├── .gitignore                             # Git ignore file
├── package.json                           # Project dependencies and scripts
├── vite.config.js                         # Vite configuration
├── tailwind.config.js                     # Tailwind CSS configuration
├── eslint.config.js                       # ESLint configuration
├── index.html                             # HTML entry point
└── README.md                              # This file
```

## 👥 User Roles & Permissions

The platform implements a three-tier role-based access control system:

### 🎓 Student (Default Role)
**Description:** All registered users start as Students.

**Permissions:**
- ✅ Browse and search all scholarships
- ✅ Apply for scholarships with Stripe payment
- ✅ Track application status (Pending/Processing/Completed/Rejected)
- ✅ View moderator feedback on applications
- ✅ Edit pending applications (before review)
- ✅ Retry failed payments from dashboard
- ✅ Delete pending applications
- ✅ Leave reviews on completed applications (rating + comment)
- ✅ Manage personal reviews (edit/delete)

**Dashboard Access:**
- 📊 My Profile
- 📝 My Applications
- ⭐ My Reviews

### 🔍 Moderator (Management Role)
**Description:** Promoted by Admins to review and manage applications.

**Permissions:**
- ✅ All Student permissions
- ✅ View all applications across the platform
- ✅ Update application status (Pending → Processing → Completed)
- ✅ Provide feedback to applicants (modal input)
- ✅ Cancel/reject applications
- ✅ View all reviews on the platform
- ✅ Delete inappropriate reviews (content moderation)

**Dashboard Access:**
- 📊 My Profile
- 📋 Manage Applications
- ⭐ All Reviews

### 👑 Admin (Full Control)
**Description:** Highest permission level with complete platform access.

**Permissions:**
- ✅ All Moderator permissions
- ✅ Add new scholarships (comprehensive form)
- ✅ Edit existing scholarships
- ✅ Delete scholarships
- ✅ Manage user roles (promote Student → Moderator → Admin, or demote)
- ✅ Delete user accounts
- ✅ View analytics dashboard with charts
- ✅ Access to all platform features

**Dashboard Access:**
- 📊 My Profile
- ➕ Add Scholarship
- 📚 Manage Scholarships
- 👥 Manage Users
- 📈 Analytics Dashboard

## 🗺️ Pages & Routes

### Public Routes (No Authentication Required)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero banner, top 6 scholarships, testimonials, FAQ |
| `/scholarships` | All Scholarships | Browse all scholarships with search, filter, sort, pagination |
| `/scholarships/:id` | Scholarship Details | Detailed scholarship info, reviews, and "Apply" button |
| `/login` | Login | Email/password login + Google social login |
| `/register` | Register | User registration with password validation |
| `*` | Error 404 | Custom error page for invalid routes |

### Private Routes (Authentication Required)
| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/checkout/:id` | Checkout | All Authenticated Users | Stripe payment for scholarship application |
| `/payment-success` | Payment Success | All Authenticated Users | Payment confirmation with scholarship details |
| `/payment-failed` | Payment Failed | All Authenticated Users | Payment failure notification with retry option |

### Dashboard Routes (Role-Based Access)
| Route | Page | Role | Description |
|-------|------|------|-------------|
| `/dashboard` | Dashboard Home | All Users | Redirects based on role |
| `/dashboard/my-profile` | My Profile | All Users | User profile information |
| `/dashboard/my-applications` | My Applications | Student | View/edit/delete applications, retry payments |
| `/dashboard/my-reviews` | My Reviews | Student | View/edit/delete reviews |
| `/dashboard/manage-applications` | Manage Applications | Moderator, Admin | Review applications, update status, add feedback |
| `/dashboard/all-reviews` | All Reviews | Moderator, Admin | Moderate all reviews |
| `/dashboard/add-scholarship` | Add Scholarship | Admin | Create new scholarship |
| `/dashboard/manage-scholarships` | Manage Scholarships | Admin | Edit/delete scholarships |
| `/dashboard/manage-users` | Manage Users | Admin | Change user roles, delete users |
| `/dashboard/analytics` | Analytics | Admin | Platform statistics with Recharts (Bar/Pie charts) |

## 🎯 Features in Detail

### 🏠 Home Page
- **Animated Hero Banner**: 
  - Framer Motion entrance animations
  - Gradient background
  - "Search Scholarships" CTA button
- **Top 6 Scholarships**: 
  - Fetched dynamically (sorted by lowest application fees)
  - Responsive grid layout (1 col mobile → 2 cols tablet → 3 cols desktop)
  - "View Details" button on each card
- **Success Stories/Testimonials**: Static section with student experiences
- **FAQ Section**: Accordion-style frequently asked questions
- **Fully Responsive**: Mobile-first design with Tailwind breakpoints

### 📚 All Scholarships Page
**Search Functionality:**
- Server-side search implementation
- Search fields: Scholarship name, University name, Degree level
- Real-time search with debouncing

**Filter Options:**
- Scholarship category (Full Fund, Partial, Self-fund)
- Subject category (Engineering, Business, Medical, Arts, etc.)
- University country
- Degree level (Diploma, Bachelor, Masters)

**Sort Options:**
- Application fees: Low to High / High to Low
- Post date: Newest First / Oldest First
- Deadline: Soonest / Latest

**Additional Features:**
- **Pagination**: Server-side pagination (10 scholarships per page)
- **Skeleton Loaders**: Loading states while fetching data
- **Responsive Grid**: 1/2/3 columns based on screen size
- **Card Information**: University image, name, category, location, fees, "View Details" button

### 🎓 Scholarship Details Page
**Information Displayed:**
- University image (large hero image)
- Scholarship name and category badge
- University world rank
- Location (city, country)
- Subject and degree level
- Tuition fees (if applicable)
- Application fees + service charge
- Application deadline (formatted date)
- Comprehensive scholarship description
- Stipend/coverage details

**Actions:**
- **Apply for Scholarship** button (redirects to `/checkout/:id`)
- Protected route (login required)

**Reviews Section:**
- All student reviews for this scholarship
- Display: Reviewer photo, name, date, rating (stars), comment
- Sorted by most recent
- Fetched from Reviews Collection

### 💳 Payment System (Stripe Integration)
**Checkout Page (`/checkout/:id`):**
- Scholarship summary card
- Total amount breakdown:
  - Application Fee
  - Service Charge
  - **Total** (calculated)
- Stripe CardElement for secure card input
- Real-time validation
- Processing state with spinner

**Payment Flow:**
1. Student clicks "Apply" on Scholarship Details page
2. Redirected to `/checkout/:scholarshipId` (protected route)
3. Backend creates Stripe PaymentIntent via `/api/v1/payments/create-payment-intent`
4. Student enters card details (Stripe securely handles card data)
5. **On Success**:
   - Application saved to Applications Collection with `paymentStatus: "paid"`
   - Redirect to `/payment-success` with scholarship data
6. **On Failure**:
   - Application saved to Applications Collection with `paymentStatus: "unpaid"`
   - Redirect to `/payment-failed` with error message

**Payment Success Page:**
- ✅ Success message with icon
- Scholarship name and university
- Amount paid (formatted currency)
- "Go to My Applications" button

**Payment Failed Page:**
- ❌ Failure message
- Scholarship name
- Error reason (from Stripe)
- "Return to Dashboard" button (to retry payment from My Applications)

### 📊 Student Dashboard

#### **My Applications Page**
- **Table View** of all applications
- **Columns**: University, Address, Subject, Application Fees, Status, Actions
- **Status Indicators**:
  - 🟡 Pending (yellow badge)
  - 🔵 Processing (blue badge)
  - 🟢 Completed (green badge)
  - 🔴 Rejected (red badge)
- **Actions** (conditional based on status):
  - **Details**: Opens modal with full application details
  - **Edit**: Modify application (visible only if status = "pending")
  - **Pay**: Retry payment (visible only if status = "pending" AND paymentStatus = "unpaid")
  - **Delete**: Remove application (visible only if status = "pending")
  - **Add Review**: Write review (visible only if status = "completed")

#### **My Reviews Page**
- **Table View** of all reviews written by student
- **Columns**: Scholarship Name, University, Rating, Comment, Date, Actions
- **Actions**:
  - **Edit**: Opens modal to update rating and comment
  - **Delete**: Remove review (with confirmation)

#### **Add Review Modal** (from My Applications)
- Triggered when clicking "Add Review" on completed application
- **Inputs**:
  - Star rating selector (1-5 stars)
  - Comment textarea
- **Submit**: Saves to Reviews Collection
- Links to scholarshipId for display on Scholarship Details page

### 🔍 Moderator Dashboard

#### **Manage Applications Page**
- **Comprehensive Table** of all applications across platform
- **Columns**: Applicant Name, Email, University, Feedback, Status, Payment Status, Actions
- **Filter**: Dropdown to filter by status (All/Pending/Processing/Completed/Rejected)
- **Actions**:
  - **Details**: Opens modal with full applicant and scholarship details
  - **Feedback**: Opens modal to write/update feedback (saved to application document)
  - **Status Update**: Dropdown or buttons to change status:
    - Pending → Processing
    - Processing → Completed
  - **Cancel**: Reject application (changes status to "rejected")

#### **All Reviews Page**
- **Table View** of all reviews on the platform
- **Columns**: Student Name, Scholarship Name, Rating, Comment, Date, Actions
- **Actions**:
  - **Delete**: Remove inappropriate reviews (content moderation)

### 👑 Admin Dashboard

#### **Add Scholarship Page**
- **Comprehensive Form** with all required fields:
  - Scholarship Name
  - University Name
  - University Image URL
  - Country, City
  - University World Rank
  - Subject Category (dropdown)
  - Scholarship Category (Full Fund/Partial/Self-fund)
  - Degree (Diploma/Bachelor/Masters)
  - Tuition Fees (optional, number input)
  - Application Fees (required)
  - Service Charge (required)
  - Application Deadline (date picker)
- **Auto-populated**:
  - Scholarship Post Date (current date)
  - Posted User Email (from logged-in admin)
- **Validation**: Client-side and server-side validation
- **Submit**: Saves to Scholarships Collection

#### **Manage Scholarships Page**
- **Table View** of all scholarships
- **Columns**: Scholarship Name, University, Category, Fees, Deadline, Actions
- **Actions**:
  - **Update**: Opens modal/form to edit scholarship details
  - **Delete**: Removes scholarship (with confirmation dialog)

#### **Manage Users Page**
- **Table View** of all registered users
- **Columns**: Name, Email, Photo, Current Role, Actions
- **Filter**: Dropdown to filter by role (All/Student/Moderator/Admin)
- **Actions**:
  - **Change Role**: Dropdown to change user role:
    - Student → Moderator
    - Moderator → Admin
    - Admin → Moderator
    - Moderator → Student
  - **Delete User**: Remove user account (with confirmation)

#### **Analytics Dashboard**
- **Statistics Cards** (with icons and colors):
  - 👥 Total Users
  - 🎓 Total Scholarships
  - 💰 Total Fees Collected (sum of all paid application fees)
- **Bar Chart** (Recharts):
  - X-axis: University names
  - Y-axis: Number of applications
  - Shows application distribution by university
- **Pie Chart** (Recharts):
  - Segments: Scholarship categories (Full Fund, Partial, Self-fund)
  - Shows application distribution by category
- **Responsive Layout**: Grid system adapts to screen size

### 🔐 Authentication System

**Registration Flow:**
1. User fills registration form (Name, Email, Photo URL, Password)
2. **Password Validation**:
   - Minimum 6 characters
   - At least one capital letter
   - At least one special character (!@#$%^&*)
3. Firebase creates user account
4. Backend API called to save user in MongoDB:
   - POST `/api/v1/users`
   - Body: `{ name, email, photoURL, role: "Student" }`
5. JWT token generated and stored in localStorage
6. Redirect to home page

**Login Flow:**
1. User enters email and password
2. Firebase authenticates user
3. Backend generates JWT token:
   - POST `/api/v1/auth/jwt`
   - Body: `{ email }`
   - Returns: `{ token }`
4. Token stored in localStorage
5. User role fetched from MongoDB
6. Redirect to dashboard or intended page

**Google Login Flow:**
1. User clicks "Sign in with Google"
2. Google OAuth popup
3. Firebase returns user object
4. Backend checks if user exists in MongoDB:
   - If not, creates new user with role "Student"
5. JWT token generated and stored
6. Redirect to dashboard

**Security Measures:**
- Protected routes use PrivateRoute component
- JWT token sent with all API requests in Authorization header
- Token verification on server for protected endpoints
- Automatic logout on token expiration
- Secure credential storage via environment variables

## 🚀 Deployment

### Prerequisites
- Server deployed and running (backend must be deployed first)
- Firebase project configured
- Stripe account with live or test keys

### Frontend Deployment Options

#### Option 1: Netlify

**Step-by-Step Guide:**

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Option A: Drag & Drop
     - Go to [Netlify Drop](https://app.netlify.com/drop)
     - Drag `dist/` folder to upload
   
   - Option B: Netlify CLI
     ```bash
     npm install -g netlify-cli
     netlify login
     netlify deploy --prod --dir=dist
     ```

   - Option C: GitHub Integration
     - Connect your GitHub repository
     - Set build command: `npm run build`
     - Set publish directory: `dist`

3. **Configure Environment Variables**
   - Go to **Site Settings** → **Build & Deploy** → **Environment**
   - Add all variables from `.env.local`:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_API_URL` (your deployed server URL)
     - `VITE_STRIPE_PUBLIC_KEY`

4. **Add Redirect Rule for SPA**
   - Create `public/_redirects` file:
     ```
     /*    /index.html   200
     ```
   - Or add to `netlify.toml`:
     ```toml
     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```

5. **Trigger Redeploy**

#### Option 2: Vercel

**Step-by-Step Guide:**

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via GitHub Integration** (recommended)
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **New Project**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variables (same as Netlify)
   - Click **Deploy**

3. **Or Deploy via CLI**
   ```bash
   vercel login
   vercel
   # Follow prompts
   vercel --prod
   ```

4. **Configure Environment Variables**
   - In Vercel dashboard → **Settings** → **Environment Variables**
   - Add all `VITE_*` variables

### Post-Deployment Configuration

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Authentication** → **Settings** → **Authorized Domains**
3. Add your deployed domain:
   - Netlify: `your-app-name.netlify.app`
   - Vercel: `your-app-name.vercel.app`
   - Custom domain: `yourdomain.com`

#### Server CORS Configuration
Ensure your backend server allows requests from your deployed frontend:
```javascript
// server/index.js
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app-name.netlify.app',  // Add this
  'https://yourdomain.com'               // Add custom domain
];
```

### Deployment Checklist
- ✅ Server deployed and accessible
- ✅ All environment variables set in hosting platform
- ✅ `VITE_API_URL` points to production server
- ✅ Firebase authorized domains updated
- ✅ Server CORS configured for frontend domain
- ✅ SPA redirect rule added (Netlify/Vercel)
- ✅ Stripe keys updated (test or live)
- ✅ Test all routes (especially private routes)
- ✅ Test payment flow with Stripe test cards
- ✅ Verify authentication (email/password and Google)
- ✅ Check mobile responsiveness
- ✅ Test error handling (404, payment failures)

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 🔥 Firebase Authentication Error
**Error:**
```
Firebase: Error (auth/network-request-failed)
```
**Solutions:**
1. Check if all Firebase env variables are set in `.env.local`
2. Verify Firebase API key is correct
3. Add domain to Firebase authorized domains (Console → Authentication → Settings)
4. Clear browser cache and localStorage
5. Check browser console for specific error messages

#### 🌐 CORS Error
**Error:**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```
**Solutions:**
1. Ensure backend server is running
2. Check server CORS configuration includes your frontend URL
3. Verify `VITE_API_URL` in `.env.local` is correct
4. Check if server is listening on correct port
5. Clear browser cache

#### 💳 Stripe Payment Fails
**Error:**
```
PaymentIntent creation failed
```
**Solutions:**
1. Verify Stripe public key (`VITE_STRIPE_PUBLIC_KEY`) is correct
2. Check server has Stripe secret key configured
3. Ensure payment amount is >= $0.50 (Stripe minimum)
4. Use Stripe test cards for testing (4242 4242 4242 4242)
5. Check browser console and server logs for specific error
6. Verify Stripe account is active and not restricted

#### 🔄 Page Refresh Redirects to Login
**Problem:** Logged-in users are redirected to login on page refresh

**Solutions:**
1. Check if Firebase is initialized properly in `config/firebase.js`
2. Verify `onAuthStateChanged` listener in `AuthContext.jsx`
3. Ensure token is saved in localStorage
4. Check `PrivateRoute.jsx` logic
5. Clear browser cache and try again

#### 📄 404 on Deployed Site (Netlify/Vercel)
**Problem:** Direct URL access or refresh gives 404 error

**Solutions:**
1. Add redirect rule for SPA:
   - **Netlify**: Create `public/_redirects` with `/* /index.html 200`
   - **Vercel**: Add `vercel.json` with rewrites
2. Redeploy after adding redirect rule

#### 🖼️ Images Not Loading
**Problem:** Images show broken or don't load

**Solutions:**
1. Check image URLs are valid and accessible
2. Verify images are in `public/` folder or `src/assets/`
3. Use correct import syntax for images in `src/assets/`:
   ```javascript
   import logo from './assets/logo.png';
   ```
4. For external URLs, check CORS and image hosting

#### ⚡ Slow Performance
**Solutions:**
1. Enable pagination on data-heavy pages
2. Implement lazy loading for images
3. Use React.lazy for code splitting
4. Optimize images (compress, use WebP)
5. Minimize bundle size (check with `npm run build`)

## 📝 Scripts

```bash
# Development
npm run dev          # Start Vite development server (http://localhost:5173)

# Production
npm run build        # Build optimized production bundle → dist/
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint to check code quality
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

**How to Contribute:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Guidelines:**
- Follow existing code style and conventions
- Write clear commit messages
- Update documentation if needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the **MIT License**.

## 👨‍💻 Developer

**Eshrat Jahan**
- GitHub: [@Eshrat48](https://github.com/Eshrat48)
- Project: ScholarStream - Scholarship Management Platform
- Repository: [ScholarStream-Client](https://github.com/Eshrat48/ScholarStream-Client)

## 🙏 Acknowledgments

- **Firebase** - For seamless authentication
- **Stripe** - For secure payment processing
- **Tailwind CSS & DaisyUI** - For beautiful, responsive UI components
- **Framer Motion** - For smooth animations
- **Recharts** - For data visualization
- **Vite** - For lightning-fast development experience
- **MongoDB Atlas** - For cloud database hosting
- **Programming Hero** - For project inspiration and learning

## 📚 Related Documentation

- **Server Repository**: [YOUR_SERVER_REPO_URL_HERE]
- **API Documentation**: See server repository README
- **Firebase Docs**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Stripe Docs**: [https://stripe.com/docs](https://stripe.com/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Router**: [https://reactrouter.com/](https://reactrouter.com/)

---

**Made with ❤️ for students seeking educational opportunities worldwide**

*Empowering students to find and apply for scholarships with ease.*
>>>>>>> e27cff0 (Add all requirements and comprehensive documentation)
