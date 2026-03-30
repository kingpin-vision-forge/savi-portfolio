'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Lock, LogOut, Save, Loader2, CheckCircle2, AlertCircle, Package, IndianRupee } from 'lucide-react';
import { SignInPage } from '@/components/ui/sign-in';

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  pack: string;
  image: string;
  images: string[];
  sortOrder: number;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <SignInPage
        title={<span className="font-light text-foreground tracking-tighter">Admin Login</span>}
        description={error || "Sign in to manage your SAVI products and pricing"}
        onSignIn={handleSignIn}
        onResetPassword={() => alert('Please contact the administrator to reset your password.')}
      />
    </div>
  );
}

function AdminDashboard({ user }: { user: User }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'products'), orderBy('sortOrder'));
        const snapshot = await getDocs(q);
        const prods: Product[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Product[];
        setProducts(prods);

        // Pre-fill the editable prices
        const prices: Record<string, number> = {};
        prods.forEach((p) => { prices[p.id] = p.price; });
        setEditedPrices(prices);
      } catch {
        showToast('error', 'Failed to load products. Please refresh.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handlePriceChange = (id: string, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setEditedPrices((prev) => ({ ...prev, [id]: num }));
    } else if (value === '') {
      setEditedPrices((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const hasChanges = products.some((p) => editedPrices[p.id] !== p.price);

  const saveAllPrices = async () => {
    setSaving(true);
    try {
      const updates = products
        .filter((p) => editedPrices[p.id] !== p.price)
        .map((p) => updateDoc(doc(db, 'products', p.id), { price: editedPrices[p.id] }));

      await Promise.all(updates);

      // Update local state to match saved prices
      setProducts((prev) =>
        prev.map((p) => ({ ...p, price: editedPrices[p.id] ?? p.price }))
      );

      showToast('success', `${updates.length} price${updates.length > 1 ? 's' : ''} updated successfully!`);
    } catch {
      showToast('error', 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border transition-all animate-[slideIn_0.3s_ease-out] ${
          toast.type === 'success'
            ? 'bg-[#1a1a1a] border-[#00C853]/30 text-[#00C853]'
            : 'bg-[#1a1a1a] border-red-500/30 text-red-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-[#00C853] flex items-center justify-center">
              <Package className="size-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">SAVI Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-xl hover:bg-white/5"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-white text-3xl font-extrabold tracking-tight mb-1">Manage Prices</h1>
            <p className="text-gray-500 text-sm">Update product prices — changes reflect instantly on the marketplace.</p>
          </div>
          {hasChanges && (
            <button
              onClick={saveAllPrices}
              disabled={saving}
              className="flex items-center gap-2 bg-[#00C853] hover:bg-[#00E676] disabled:bg-gray-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-[#00C853]/20"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </button>
          )}
        </div>

        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 animate-pulse">
                <div className="h-5 bg-[#2d2d2d] rounded-lg w-2/3 mb-3" />
                <div className="h-4 bg-[#2d2d2d] rounded-lg w-1/2 mb-6" />
                <div className="h-14 bg-[#2d2d2d] rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => {
              const currentPrice = editedPrices[product.id] ?? product.price;
              const isChanged = currentPrice !== product.price;

              return (
                <div
                  key={product.id}
                  className={`bg-[#1a1a1a] rounded-2xl p-6 border transition-all ${
                    isChanged ? 'border-[#00C853]/40 shadow-lg shadow-[#00C853]/5' : 'border-white/5'
                  }`}
                >
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-white font-bold text-lg">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.pack}</p>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-14 object-contain opacity-60"
                    />
                  </div>

                  <p className="text-gray-600 text-xs mb-4">{product.size}</p>

                  {/* Price Input */}
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={currentPrice}
                      onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      className={`w-full h-14 pl-16 pr-5 rounded-xl bg-[#2d2d2d] text-white text-lg font-bold border outline-none transition-all ${
                        isChanged
                          ? 'border-[#00C853]/50 focus:ring-2 focus:ring-[#00C853]/20'
                          : 'border-white/5 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20'
                      }`}
                    />
                  </div>

                  {/* Change Indicator */}
                  {isChanged && (
                    <div className="flex items-center gap-1.5 mt-3 text-[#00C853] text-xs font-medium">
                      <div className="size-1.5 rounded-full bg-[#00C853] animate-pulse" />
                      Changed from ₹{product.price} → ₹{currentPrice}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Save Bar (appears when changes exist) */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] border border-[#00C853]/30 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4 animate-[slideUp_0.3s_ease-out]">
          <div className="size-2 rounded-full bg-[#00C853] animate-pulse" />
          <span className="text-white text-sm font-medium">
            {products.filter((p) => editedPrices[p.id] !== p.price).length} unsaved change(s)
          </span>
          <button
            onClick={saveAllPrices}
            disabled={saving}
            className="flex items-center gap-2 bg-[#00C853] hover:bg-[#00E676] text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="size-8 text-[#00C853] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={() => { /* handled by onAuthStateChanged */ }} />;
  }

  return <AdminDashboard user={user} />;
}
