-- InsForge Backend Schema Setup for Motors

-- Cars Table
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    mileage INTEGER NOT NULL,
    condition TEXT NOT NULL, -- e.g., 'new', 'used'
    color TEXT,
    images TEXT[] DEFAULT '{}',
    description TEXT,
    transmission TEXT, -- e.g., 'automatic', 'manual'
    fuelType TEXT, -- e.g., 'gasoline', 'electric', 'hybrid'
    engineSize TEXT,
    rating NUMERIC DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Users Table (Profiles)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY, -- Links to auth.users.id
    email TEXT UNIQUE NOT NULL,
    displayName TEXT,
    photoURL TEXT,
    emailVerified BOOLEAN DEFAULT false,
    role TEXT DEFAULT 'user', -- 'user', 'admin'
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    carId UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    userId UUID NOT NULL, -- Ideally REFERENCES public.users(id)
    author TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    date TIMESTAMPTZ DEFAULT now(),
    createdAt TIMESTAMPTZ DEFAULT now()
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL,
    carId UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    createdAt TIMESTAMPTZ DEFAULT now(),
    UNIQUE(userId, carId)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL,
    carId UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    startDate TIMESTAMPTZ NOT NULL,
    endDate TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Simple Policies (Permissive for Dev)
CREATE POLICY "Public read cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own profile" ON public.users FOR ALL USING (id = auth.uid());
CREATE POLICY "Users can manage their own favorites" ON public.favorites FOR ALL USING (userId = auth.uid());
CREATE POLICY "Users can manage their own bookings" ON public.bookings FOR ALL USING (userId = auth.uid());
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
