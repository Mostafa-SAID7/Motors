/**
 * InsForge Configuration
 * Backend platform configuration for Motors application
 */

export const insforgeConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.VITE_INSFORGE_API_BASE_URL || 'https://9r3tw28e.us-east.insforge.app',
    apiKey: process.env.VITE_INSFORGE_API_KEY || 'ik_548d6430ef076e55cde193bb0a8ea1bc',
    version: 'v1',
  },

  // Database Configuration
  database: {
    tables: {
      cars: {
        name: 'cars',
        description: 'Car listings',
        columns: [
          'id',
          'brand',
          'model',
          'year',
          'price',
          'mileage',
          'condition',
          'color',
          'images',
          'description',
          'transmission',
          'fuelType',
          'engineSize',
          'rating',
          'reviews',
          'createdAt',
          'updatedAt',
        ],
      },
      users: {
        name: 'users',
        description: 'User profiles',
        columns: [
          'id',
          'email',
          'displayName',
          'photoURL',
          'emailVerified',
          'role',
          'createdAt',
          'updatedAt',
        ],
      },
      reviews: {
        name: 'reviews',
        description: 'Car reviews',
        columns: [
          'id',
          'carId',
          'userId',
          'author',
          'rating',
          'comment',
          'date',
          'createdAt',
        ],
      },
      favorites: {
        name: 'favorites',
        description: 'User favorites',
        columns: ['id', 'userId', 'carId', 'createdAt'],
      },
      bookings: {
        name: 'bookings',
        description: 'Car bookings',
        columns: [
          'id',
          'userId',
          'carId',
          'startDate',
          'endDate',
          'status',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  },

  // Storage Configuration
  storage: {
    buckets: {
      cars: {
        name: 'cars',
        description: 'Car images',
        public: true,
      },
      users: {
        name: 'users',
        description: 'User avatars',
        public: false,
      },
      reviews: {
        name: 'reviews',
        description: 'Review images',
        public: true,
      },
    },
  },

  // Authentication Configuration
  auth: {
    providers: ['email', 'google', 'github'],
    emailVerification: true,
    passwordReset: true,
    sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // API Endpoints
  endpoints: {
    database: {
      query: '/api/database/records',
      create: '/api/database/records',
      update: '/api/database/records',
      delete: '/api/database/records',
    },
    auth: {
      register: '/api/auth/users',
      login: '/api/auth/sessions',
      logout: '/api/auth/sessions/logout',
      getCurrentUser: '/api/auth/sessions/current',
      sendVerification: '/api/auth/email/send-verification',
      verify: '/api/auth/email/verify',
      sendReset: '/api/auth/email/send-reset-password',
      resetPassword: '/api/auth/email/reset-password',
    },
    storage: {
      upload: '/api/storage/buckets',
      download: '/api/storage/buckets',
      delete: '/api/storage/buckets',
    },
  },

  // Security Configuration
  security: {
    rls: {
      enabled: true,
      policies: {
        cars: {
          select: 'public',
          insert: 'authenticated',
          update: 'admin',
          delete: 'admin',
        },
        users: {
          select: 'authenticated',
          insert: 'authenticated',
          update: 'owner',
          delete: 'owner',
        },
        reviews: {
          select: 'public',
          insert: 'authenticated',
          update: 'owner',
          delete: 'owner',
        },
        favorites: {
          select: 'owner',
          insert: 'authenticated',
          update: 'owner',
          delete: 'owner',
        },
        bookings: {
          select: 'owner',
          insert: 'authenticated',
          update: 'owner',
          delete: 'owner',
        },
      },
    },
  },

  // Feature Flags
  features: {
    imageCompression: true,
    imageLazyLoading: true,
    offlineSupport: true,
    caching: true,
    realtime: false,
  },
};

export default insforgeConfig;
