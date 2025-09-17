import { cookies } from "next/headers";
import { Suspense } from "react";

// Komponen yang akan di-prerender (static)
function StaticHeader() {
  return (
    <header className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 dark:from-emerald-600 dark:via-teal-700 dark:to-cyan-800 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 dark:bg-black/20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 dark:bg-white/10 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-3xl">⚡</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 dark:from-white dark:to-emerald-200 bg-clip-text text-transparent">
          PPR Demo
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          Partial Pre-rendering dengan Next.js
          <span className="block text-lg mt-2 opacity-75">Kombinasi Sempurna Static & Dynamic Content</span>
        </p>
      </div>
      <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800"></div>
    </header>
  );
}

// Komponen yang akan di-render dinamis
async function DynamicContent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await cookies();
  const currentTime = new Date().toLocaleString("id-ID");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🔄</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Konten Dinamis</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            ⏰ Waktu server:
            <span className="font-mono bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-md ml-2 border border-indigo-200 dark:border-indigo-600">
              {currentTime}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h4 className="font-bold text-green-800 dark:text-green-400">Data Real-time</h4>
            </div>
            <p className="text-green-700 dark:text-green-300">Status: Online</p>
            <div className="mt-3 w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <h4 className="font-bold text-blue-800 dark:text-blue-400">User Info</h4>
            </div>
            <p className="text-blue-700 dark:text-blue-300">ID: {Math.random().toString(36).substr(2, 9)}</p>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🔐</span>
              </div>
              <h4 className="font-bold text-purple-800 dark:text-purple-400">Session</h4>
            </div>
            <p className="text-purple-700 dark:text-purple-300">Active: {Date.now()}</p>
            <div className="mt-3 text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full inline-block">
              🟢 Connected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-8">
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen static lainnya
function StaticFeatures() {
  const features = [
    {
      title: "Pre-rendered",
      description: "Konten ini di-render saat build time untuk performa maksimal",
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-700",
      textColor: "text-yellow-800 dark:text-yellow-300",
    },
    {
      title: "SEO Friendly",
      description: "Search engine dapat mengindex konten ini dengan mudah",
      icon: "🔍",
      gradient: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      textColor: "text-green-800 dark:text-green-300",
    },
    {
      title: "Fast Loading",
      description: "Dimuat langsung tanpa menunggu JavaScript bundle",
      icon: "🚀",
      gradient: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      textColor: "text-blue-800 dark:text-blue-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`${feature.bgColor} border ${feature.borderColor} rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-300`}
          >
            <span className="text-2xl">{feature.icon}</span>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${feature.textColor}`}>{feature.title}</h3>
          <p className={`text-sm opacity-80 leading-relaxed ${feature.textColor}`}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Static Header - Pre-rendered */}
      <StaticHeader />

      <main className="container mx-auto px-4 py-12">
        {/* Static Features - Pre-rendered */}
        <StaticFeatures />

        {/* Dynamic Content - Rendered on demand */}
        <Suspense fallback={<LoadingSkeleton />}>
          <DynamicContent />
        </Suspense>

        {/* Static Footer Content - Pre-rendered */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📚</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Tentang PPR (Partial Pre-rendering)</h3>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              PPR memungkinkan kombinasi konten static dan dynamic dalam satu halaman. Bagian static di-prerender saat build time untuk performa
              optimal, sementara bagian dynamic di-render saat dibutuhkan.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-lg">Static Parts</h4>
                </div>
                <ul className="text-sm text-emerald-700 dark:text-emerald-300 space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Header dan navigation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Feature cards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Footer content
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    SEO metadata
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🔄</span>
                  </div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg">Dynamic Parts</h4>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    User-specific data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Real-time information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Session details
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Live updates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
