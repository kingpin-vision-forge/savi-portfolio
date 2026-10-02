import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';

// Keep Auth out of public routes that only need Firestore. Firebase Auth validates
// the API key as soon as it is initialized, which should not be able to crash the
// marketplace before its local product fallback can render.
export const auth = getAuth(app);
