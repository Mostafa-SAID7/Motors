# Motors - API Integration Guide

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Firestore Database
4. Enable Storage
5. Enable Authentication

### 2. Get Firebase Config

Copy your config from Firebase Console:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
};
```

### 3. Initialize Firebase

```typescript
// src/app/app.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);
```

## Firestore Collections

### Cars Collection

```
cars/
├── id: string
├── brand: string
├── model: string
├── year: number
├── price: number
├── mileage: number
├── condition: 'new' | 'used'
├── color: string
├── images: string[]
├── description: string
├── transmission: string
├── fuelType: string
├── engineSize: string
├── createdAt: timestamp
└── updatedAt: timestamp
```

## Storage Structure

```
gs://bucket/
└── cars/
    ├── {carId}/
    │   ├── image-1.jpg
    │   ├── image-2.jpg
    │   └── ...
```

## API Endpoints (REST)

### GET /cars
Get all cars with filters

### GET /cars/:id
Get car by ID

### POST /cars
Create new car

### PUT /cars/:id
Update car

### DELETE /cars/:id
Delete car

## Error Handling

```typescript
try {
  const cars = await getDocs(collection(db, 'cars'));
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error
}
```

## Authentication

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
await signInWithEmailAndPassword(auth, email, password);
```

## Real-time Updates

```typescript
import { onSnapshot } from 'firebase/firestore';

onSnapshot(collection(db, 'cars'), (snapshot) => {
  const cars = snapshot.docs.map(doc => doc.data());
  this.cars.set(cars);
});
```
