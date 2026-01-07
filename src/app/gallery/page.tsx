import Header from '@/components/Header';
import Footer from '@/components/Footer';

const galleryItems = [
  { title: 'Fashion Week Gala', location: 'Paris', date: 'October 2023', span: 'md:col-span-2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzOX2YRmN4MDENt0PavDSsGUpYLzW2QAgbmbKJVSWqvvww4CV0Q1uN0fYaVDDtEYArlHULASt0BLso6ZG2HrcnLKwsvdFmDzByktnhCouUvHs10KiGmD-SgYBwbGo1mEYgUuF5oyqhghOj-SM1riBGZmoPzzjoB343p2OhojCqEfofSBssA6BVJuDpbiwk00JbzwSviB516twLx8e1HHN-QchYg7JOz8sQ1D54GUl-FuWeyFeformWMmY37X9Em4tXlTD21Mcg9Ioa' },
  { title: 'Signature Glass', location: 'Product', date: 'Limited Edition', span: 'md:row-span-2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdcMJDhaZTBS-YXCTRmBnmcpCvS6Awu00-rRG2MyqKO9_V7lRf0fGs6Asne2vyxSJOEvHAD343hGzfwtSj6ZmKeQaR9hjUbSGAwx32QQL6vEkwzyun961sbRri6xV62NbGmAv2hqw7pYTXn3ZIzZmCWk3DDcnhMQyRUKRKQXrqpkq8GNYjBdIHdYh6l_5E-QkLEtDHV5n_yNDQD2_jiZu83n_K59dotclKuewO3tysjmC02TuQD4q4JPgwGGx_rauau9qSszvZFejR' },
  { title: 'VIP Hosting', location: 'Service', date: '', span: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVth0DDLvuEtEbIy0LkookRDuu85Rs2g3RVkwBfaHdwENJXMaMWepWwUh21IP-jva8_Yt_95m0WarYzAvmhXiaiv1XHvqXa1HwpZbB_SjO42jtsbWYnoWxvtdEFMRGJLZI8r5yFPM-0_f0dki33Ut3-BUL9j-wMOvqmK3Jk0c9N1lLXLGY_yX10q8J3eUIeOEdYqe7ymHSWpTiXXHhIcLxBdIoG97CQ_OOn-hyGMium2RWM4qnj0BkduwzadngXJJwZ1dHN2SVlWx8' },
  { title: 'Glacial Source', location: 'Source', date: '', span: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwuZRsHL9gC0OwGtOn8Yjz3DPQ7lyS8D__JdlyLbGiZm1kgO39_F5sxeEVY0cbRpefcx23yWqYwCk9IUE9VMNX86waT1qkOwIscJz9wnD104O0v3V4rSYlQJ2VBDJFPU-wJtzNwnVpyJvym5_L86fit4H2OscfaoSMkE_4Vby3v3cnKLP-UenH1NtGmBwLVGaMzIq-C2u6tqPd8o8tmkVSHVK7t0PRGe7LuF360FUUqh0xPSppc8xVrI4JVrwjKVq-Rxk9Cg9TbnTs' },
  { title: 'Global Fleet', location: 'Logistics', date: 'Carbon Neutral Delivery', span: 'md:col-span-2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz8E-vIE-MvO3NkeFbsHI-zrVbB8WZ-vNmAT3_FtPcYCeaUtTKT31V734KU3GVJyJSc42uBPEq0WCRRw9uqLqGkErS7ZL3BznG4Jly-azriIrD3ADc40RNwL2HngEhc3EDeyDIH9hf2N8OGBv-NQqrNj8nX7axnIjDYqDzxQJN23pyOmgKIV0EOsHQey1CWGjwy1VAZFkh13IBE8ZOC_9LUHktmyUUG55jz4aasykbksePAzRpDyDszGYAEYJUH0ugzYlWXZ89vMlg' },
  { title: 'Corporate HQ', location: 'Installation', date: 'Tokyo, Japan', span: 'md:row-span-2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmamwih30HK7y0aYONITq8AB3N2iBgPTSxGbhHiet0asJB8HNzGEq5_KyuHPcX2Vzbnk5a2ZtB7Td1EcghDLak1_8USbE5VnyJAzRZ_k9LwgNQLldDLsRFqYqI8QYvfjfRS4BVVZWMsTLjoX5gP8wL2JHcXlTXHtThivjxGfTjoRpdSFQPzx1EgyT0LpqiN56rMwqNsoi29C1uWD34xl4wNzM2I3Qw8JHgNUFOxq6rkD7OnjzwK8jCEc7Zdy6Sl20QiR2bXf7oROn0' },
];

export default function GalleryPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
      <Header />

      <main className="flex-grow flex flex-col items-center w-full">
        {/* Hero */}
        <section className="w-full max-w-[1024px] px-6 pt-32 pb-12 text-center">
          <div className="flex flex-col gap-6 items-center">
            <span className="text-[#00C853] text-[10px] font-bold tracking-[0.3em] uppercase opacity-90">Our Portfolio</span>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1]">
              Curating Excellence <br />
              <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">in Hydration</span>
            </h1>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Moments of purity, trust, and scale captured from our journey around the globe. Witness the fluid elegance of SAVI in action.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="sticky top-24 z-40 w-full flex justify-center px-4 py-6 pointer-events-none">
          <div className="pointer-events-auto flex gap-1 p-1.5 glass-panel rounded-full overflow-x-auto scroll-hide max-w-full">
            <button className="flex h-10 items-center px-6 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg">
              All
            </button>
            <button className="flex h-10 items-center px-6 rounded-full hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium uppercase tracking-wider transition-all">
              Corporate
            </button>
            <button className="flex h-10 items-center px-6 rounded-full hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium uppercase tracking-wider transition-all">
              Private
            </button>
            <button className="flex h-10 items-center px-6 rounded-full hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium uppercase tracking-wider transition-all">
              Logistics
            </button>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 pb-32 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '300px' }}>
            {galleryItems.map((item, i) => (
              <div key={i} className={`group relative bg-[#242424] overflow-hidden cursor-pointer border border-white/5 rounded-3xl shadow-xl ${item.span}`}>
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-white/5 transition-colors duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.8)]" />
                    <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">{item.location}</span>
                  </div>
                  <h3 className="text-white text-2xl font-light tracking-wide">{item.title}</h3>
                  {item.date && <p className="text-gray-400 text-xs mt-2 font-mono tracking-wide uppercase opacity-70">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <button className="group flex items-center gap-3 text-white border border-white/20 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
              Load More Memories
              <span className="text-gray-500 group-hover:text-[#00C853] transition-colors">🔄</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
