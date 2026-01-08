# API Authentication Dashboard

A modern React application demonstrating API integration, authentication flow, and protected routes. This project simulates a real-world frontend application that handles user authentication and displays data from public APIs.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [API Integration](#-api-integration)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Error Handling](#-error-handling)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure login with token-based authentication
- 🛡️ **Protected Routes** - Dashboard accessible only after authentication
- 📊 **Data Dashboard** - Display users from ReqRes API with pagination
- 🔄 **Token Management** - Automatic token expiry handling (1 hour)
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for optimal development experience

### User Experience
- ✅ **Loading States** - Visual feedback during API calls
- ❌ **Error Handling** - Graceful error messages with retry functionality
- 🔄 **Auto Logout** - Automatic logout on token expiry
- 📱 **Responsive Design** - Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.5
- **Styling:** Tailwind CSS 3.4.19
- **Icons:** Lucide React
- **API:** ReqRes API (https://reqres.in)
- **State Management:** React Hooks
- **HTTP Client:** Native Fetch API

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd API_auth_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 💻 Usage

### Login

1. Open the application in your browser
2. Enter your credentials:
   - **Email:** `eve@reqres.in`
   - **Password:** `cityslicka`
3. Click "Sign In" or press Enter
4. You'll be redirected to the Dashboard upon successful login

### Dashboard

- View a list of users fetched from the ReqRes API
- Navigate between pages using the pagination controls
- Click "Logout" to end your session

### Logout

- Click the "Logout" button in the dashboard header
- Your session will be cleared and you'll be redirected to the login page

## 📁 Project Structure

```
API_auth_dashboard/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorMessage.jsx # Error display component
│   │   └── Loader.jsx      # Loading spinner component
│   ├── pages/               # Page components
│   │   ├── Login.jsx       # Login page
│   │   └── Dashboard.jsx   # Protected dashboard
│   ├── routes/              # Route protection
│   │   └── ProtectedRoute.jsx
│   ├── services/           # Business logic
│   │   ├── api.service.js  # API calls
│   │   └── auth.service.js # Authentication logic
│   ├── utils/              # Utilities and constants
│   │   └── constants.js    # App constants
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔐 Authentication Flow

### Login Process

1. User enters email and password
2. Credentials are validated (mocked authentication)
3. On success:
   - A token is generated and stored in `localStorage`
   - Token expiry time is set (1 hour from login)
   - User is redirected to Dashboard
4. On failure:
   - Error message is displayed
   - User can retry login

### Token Management

- **Storage:** Tokens are stored in `localStorage`
- **Expiry:** Tokens expire after 1 hour
- **Validation:** Token validity is checked on:
  - App initialization
  - Protected route access
  - Every API call
  - Periodic checks (every 60 seconds)

### Protected Routes

- Dashboard is protected by `ProtectedRoute` component
- Unauthenticated users are automatically redirected to Login
- Token expiry triggers automatic logout

## 🌐 API Integration

### ReqRes API

The application uses the [ReqRes API](https://reqres.in) for:
- **User Data:** Fetching paginated user lists
- **Base URL:** `https://reqres.in/api`

### API Service

The `api.service.js` handles:
- Automatic token injection in request headers
- Error handling for 401 (Unauthorized) responses
- Automatic logout on session expiry
- Centralized API configuration

### Example API Call

```javascript
// Fetch users with pagination
const users = await apiService.fetchUsers(page);
```

## ⚙️ Environment Configuration

### Current Configuration

API base URL is configured in `src/utils/constants.js`:

```javascript
export const API_BASE_URL = 'https://reqres.in/api';
```

### Token Settings

```javascript
TOKEN_EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour
```

## 📜 Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎯 Error Handling

The application includes comprehensive error handling:

### Error Types

- **Network Errors:** Connection issues
- **Authentication Errors:** Invalid credentials
- **API Errors:** Failed API requests
- **Validation Errors:** Missing form fields

### Error Display

- User-friendly error messages
- Retry functionality for failed requests
- Automatic error clearing on user action

## 🎨 UI/UX Features

### Design Highlights

- **Modern Gradient Backgrounds** - Beautiful color schemes
- **Smooth Animations** - Transitions and hover effects
- **Responsive Layout** - Mobile-first design
- **Loading States** - Visual feedback during operations
- **Error States** - Clear error messaging

### Components

- **Login Page:** Clean, centered form with demo credentials
- **Dashboard:** Card-based user grid with pagination
- **Loader:** Animated spinner with message
- **Error Message:** Styled error display with retry option

## 🔒 Security Features

- Token-based authentication
- Automatic token expiry
- Protected route access
- Secure token storage (localStorage)
- Session validation on app load

## 🧪 Testing Credentials

For testing purposes, use these credentials:

```
Email: eve@reqres.in
Password: cityslicka
```

## 🐛 Troubleshooting

### Common Issues

**Issue:** Tailwind CSS not working
- **Solution:** Ensure `tailwind.config.js` and `postcss.config.js` are properly configured

**Issue:** API calls failing
- **Solution:** Check internet connection and verify API_BASE_URL in constants.js

**Issue:** Token not persisting
- **Solution:** Check browser localStorage is enabled and not in private/incognito mode

## 📝 Code Quality

- **ESLint** configured for code quality
- **React Hooks** best practices
- **Separation of Concerns** - Services, components, and utilities
- **Error Boundaries** - Comprehensive error handling
- **Clean Code** - Readable and maintainable structure

## 🚧 Future Enhancements

Potential improvements:
- [ ] Environment-based configuration (.env files)
- [ ] Axios with HTTP interceptors
- [ ] Unit and integration tests
- [ ] Dark mode support
- [ ] User profile management
- [ ] Real-time data updates

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

or 

Emailto: syedmuneerzakk@gmail.com


---

**Built with ❤️ using React and Vite**
