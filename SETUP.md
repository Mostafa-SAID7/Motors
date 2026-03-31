# Motors - Car Showroom Application

A modern Angular 19 car showroom management system with Tailwind CSS and PrimeNG.

## Project Structure

```
src/app/
├── core/
│   ├── services/
│   │   └── car.service.ts
│   └── models/
│       └── car.model.ts
├── shared/
│   └── (reusable components, pipes, directives)
├── features/
│   ├── cars/
│   │   └── pages/
│   │       ├── cars-list.component.ts
│   │       ├── car-detail.component.ts
│   │       └── car-form.component.ts
│   └── dashboard/
│       └── dashboard.component.ts
├── layout/
│   ├── header/
│   │   └── header.component.ts
│   └── footer/
│       └── footer.component.ts
├── pages/
│   └── not-found.component.ts
├── app.ts
├── app.routes.ts
└── app.config.ts
```

## Features

- ✅ Dashboard with statistics
- ✅ Cars listing with advanced filters
- ✅ Car detail view with image gallery
- ✅ Add/Edit car form
- ✅ Responsive design (Mobile First)
- ✅ RTL support (Arabic)
- ✅ Tailwind CSS styling
- ✅ Standalone components
- ✅ Signal-based state management
- ✅ Mock data (ready for Firebase integration)

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Install additional packages (if not already installed):
```bash
npm install primeng primeicons tailwindcss postcss autoprefixer @angular/fire firebase ngx-translate @ngx-translate/core @ngx-translate/http-loader --legacy-peer-deps
```

## Development

Run the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`

## Build

Build for production:
```bash
ng build
```

## Tech Stack

- **Framework**: Angular 19 (Standalone Components)
- **Styling**: Tailwind CSS 4 + PrimeNG 19
- **State Management**: Angular Signals + Services
- **Forms**: Reactive Forms
- **Backend**: Firebase (ready for integration)
- **Internationalization**: ngx-translate (EN + AR)
- **HTTP**: Angular HttpClient

## Next Steps

1. **Firebase Integration**:
   - Set up Firebase project
   - Update `app.config.ts` with Firebase credentials
   - Replace mock data with Firestore queries

2. **PrimeNG Components**:
   - Add p-table for advanced data tables
   - Add p-fileUpload for image uploads
   - Add p-galleria for image gallery
   - Add p-toast for notifications

3. **Additional Features**:
   - User authentication
   - Booking system
   - Payment integration
   - Admin dashboard
   - Image optimization

## Color Scheme

- Primary: `#1a1a1a` (Dark Gray)
- Secondary: `#dc2626` (Red)
- Accent: `#6b7280` (Gray)

## License

MIT
