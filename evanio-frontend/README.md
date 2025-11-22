# Evanio Frontend

Standalone React/Vite frontend application for Evanio platform.

## Features

- React 18 with Vite
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls
- Context API for state management (Auth, Theme, Dark Mode)
- i18next for internationalization
- PWA support
- Responsive design
- Dark mode support

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

1. Clone the repository and navigate to frontend:
```bash
cd evanio-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Development Server

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
evanio-frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # Reusable components
│   ├── context/     # React contexts (Auth, Theme, etc.)
│   ├── data/        # Static data
│   ├── i18n/        # Internationalization
│   ├── pages/       # Page components
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (required)
- `VITE_UPLOADTHING_TOKEN` - UploadThing token (optional)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (optional)

## Deployment

### Vercel

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables
5. Deploy

### Other Static Hosting

Build the project and deploy the `dist/` folder to any static hosting service.

## License

ISC

