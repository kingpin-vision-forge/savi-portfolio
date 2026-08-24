/**
 * One-time seed script — populates Firestore with initial product data.
 *
 * Run with:  npx tsx scripts/seed-products.ts
 */

import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function env(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: env('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: env('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: env('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: env('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: env('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: env('NEXT_PUBLIC_FIREBASE_APP_ID'),
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const products = [
  {
    id: 'savi-200ml-case',
    name: 'SAVI 200ML',
    size: '200ml × 48',
    price: 250,
    pack: 'Case (48 Bottles)',
    image: '/images/200ml.png',
    images: ['/images/200ml.png'],
    sortOrder: 1,
  },
  {
    id: 'savi-250ml-case',
    name: 'SAVI 250ML',
    size: '250ml × 36',
    price: 140,
    pack: 'Case (36 Bottles)',
    image: '/images/250ml.png',
    images: ['/images/250ml.png'],
    sortOrder: 2,
  },
  {
    id: 'savi-300ml-case',
    name: 'SAVI 300ML',
    size: '300ml × 30',
    price: 150,
    pack: 'Case (30 Bottles)',
    image: '/images/250ml.png',
    images: ['/images/250ml.png'],
    sortOrder: 3,
  },
  {
    id: 'savi-500ml-case',
    name: 'SAVI 500ML',
    size: '500ml × 24',
    price: 170,
    pack: 'Case (24 Bottles)',
    image: '/images/500ml-1.png',
    images: ['/images/500ml-1.png'],
    sortOrder: 4,
  },
  {
    id: 'savi-1000ml-case',
    name: 'SAVI 1000ML',
    size: '1000ml × 12',
    price: 120,
    pack: 'Case (12 Bottles)',
    image: '/images/1lrwhite.png',
    images: ['/images/1lrwhite.png', '/images/1lrblack.png'],
    sortOrder: 5,
  },
  {
    id: 'savi-2000ml-case',
    name: 'SAVI 2000ML',
    size: '2000ml × 6',
    price: 120,
    pack: 'Case (6 Bottles)',
    image: '/images/1lrwhite.png',
    images: ['/images/1lrwhite.png'],
    sortOrder: 6,
  },
  {
    id: 'savi-20ltr-can',
    name: 'SAVI 20LTR',
    size: '20 Litre',
    price: 50,
    pack: 'Can',
    image: '/images/20ltr.png',
    images: ['/images/20ltr.png'],
    sortOrder: 7,
  },
  {
    id: 'savi-20ltr-ph8-can',
    name: 'SAVI 20LTR pH 8+ Balance Water',
    size: '20 Litre',
    price: 120,
    pack: 'Can',
    image: '/images/20ltr.png',
    images: ['/images/20ltr.png'],
    sortOrder: 8,
  },
];

async function seed() {
  const email = process.argv[2] || process.env.FIREBASE_ADMIN_EMAIL;
  const password = process.argv[3] || process.env.FIREBASE_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('🔐 Admin authentication required to seed Firestore.');
    console.error('Please run with your admin credentials:\n');
    console.error('  npx tsx scripts/seed-products.ts <admin-email> <admin-password>\n');
    console.error('OR set environment variables:');
    console.error('  FIREBASE_ADMIN_EMAIL=admin@example.com FIREBASE_ADMIN_PASSWORD=yourpassword npx tsx scripts/seed-products.ts\n');
    process.exit(1);
  }

  console.log(`🔐 Signing in as ${email}...`);
  await signInWithEmailAndPassword(auth, email, password);
  console.log('✅ Authenticated successfully.');

  console.log('\n🌱 Seeding products into Firestore...\n');

  for (const product of products) {
    const { id, ...data } = product;
    await setDoc(doc(db, 'products', id), data);
    console.log(`  ✅ ${product.name} — ₹${product.price}`);
  }

  console.log('\n🎉 Done! All products have been seeded.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
