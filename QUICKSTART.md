# Motors - Quick Start Guide

## 🚀 Getting Started

### 1. Start the Development Server

**Option A: Using npm (Recommended)**
```bash
npm start
```

**Option B: Using Enhanced Startup Script (Handles Issues)**

Windows PowerShell:
```powershell
.\start-dev-enhanced.ps1
```

Windows CMD:
```cmd
start-dev-enhanced.bat
```

**Option C: Manual ng serve**
```bash
ng serve --port 4200
```

The app will be available at `http://localhost:4200`

**If you get ERR_CONNECTION_REFUSED:**
1. See `DIAGNOSTIC_GUIDE.md` for complete troubleshooting
2. Try: `.\start-dev-enhanced.ps1 -CleanStart`
3. Or use different port: `ng serve --port 4300`

### 2. Project Structure Overview

**Core Layer** (`src/app/core/`)
- `services/car.service.ts` - Car data management with Signals
- `models/car.model.ts` - TypeScript interfaces

**Features Layer** (`src/app/features/`)
- `cars/` - Car listing, detail, and form pages
- `dashboard/` - Home page with statistics

**Layout** (`src/app/layout/`)
- `header/` - Navigation header
- `footer/` - Footer component

**Routing** (`src/app/app.routes.ts`)
- Lazy-loaded feature modules
- 404 page handling

### 3. Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Home page with stats |
| `/cars` | CarsList | Browse all cars |
| `/cars/:id` | CarDetail | View car details |
| `/cars/add` | CarForm | Add new car |
| `/cars/:id/edit` | CarForm | Edit existing car |

### 4. Key Features

✅ **Dashboard**
- Total cars count
- New vs Used cars statistics
- Featured cars preview

✅ **Cars List**
- Advanced filtering (brand, price, condition)
- Grid/Table view toggle
- Responsive design

✅ **Car Detail**
- Image gallery
- Full specifications
- Booking/Contact buttons

✅ **Add/Edit Form**
- Reactive Forms validation
- Image URL input
- All car specifications

### 5. Styling

- **Tailwind CSS** - Utility-first CSS framework
- **PrimeNG** - Enterprise UI components (ready to integrate)
- **Color Scheme**:
  - Primary: Dark Gray (#1a1a1a)
  - Secondary: Red (#dc2626)
  - Accent: Gray (#6b7280)

### 6. State Management

Using **Angular Signals** (built-in, no external library needed):
```typescript
private cars = signal<Car[]>([]);
```

Benefits:
- Fine-grained reactivity
- No RxJS learning curve
- Automatic change detection

### 7. Mock Data

Currently using mock data in `CarService`. To switch to Firebase:

1. Set up Firebase project
2. Update `app.config.ts` with Firebase config
3. Replace service methods with Firestore queries

### 8. Internationalization (i18n)

Translation files in `src/assets/i18n/`:
- `en.json` - English
- `ar.json` - Arabic (RTL ready)

To add more languages:
1. Create new JSON file in `src/assets/i18n/`
2. Update language selector in header

### 9. Build for Production

```bash
npm run build
```

Output will be in `dist/Motors/`

### 10. Next Steps

1. **Add PrimeNG Components**
   ```bash
   npm install primeng primeicons
   ```
   - p-table for advanced tables
   - p-fileUpload for image uploads
   - p-galleria for image gallery

2. **Firebase Integration**
   - Create Firestore database
   - Set up Storage for images
   - Add Authentication

3. **Advanced Features**
   - User authentication
   - Booking system
   - Payment gateway
   - Admin dashboard

## 📁 File Organization

```
Motors/
├── src/
│   ├── app/
│   │   ├── core/           # Services, models, guards
│   │   ├── features/       # Feature modules
│   │   ├── layout/         # Header, footer
│   │   ├── pages/          # Standalone pages
│   │   ├── app.ts          # Root component
│   │   ├── app.routes.ts   # Route definitions
│   │   └── app.config.ts   # App configuration
│   ├── assets/
│   │   └── i18n/           # Translation files
│   ├── styles.css          # Global styles
│   └── main.ts             # Bootstrap
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json
```

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#your-color",
  secondary: "#your-color",
  accent: "#your-color",
}
```

### Add New Feature
1. Create folder in `src/app/features/`
2. Add pages, components, services
3. Update `app.routes.ts` with new routes

### Add New Component
```bash
ng generate component features/cars/components/car-card
```

## 🐛 Troubleshooting

**Port 4200 already in use?**
```bash
ng serve --port 4300
```

**Dependencies conflict?**
```bash
npm install --legacy-peer-deps
```

**Clear cache:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📚 Resources

- [Angular 19 Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [PrimeNG](https://primeng.org)
- [Firebase](https://firebase.google.com)
- [ngx-translate](https://github.com/ngx-translate/core)

---

Happy coding! 🚗
