export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🏪 Mall Genesis</h1>
      <p className="text-center text-gray-600 mb-12">Marketplace Karya Digital Pake Pi Coin</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/upload" className="border rounded-xl p-8 text-center hover:bg-gray-50">
          <div className="text-4xl mb-2">📤</div>
          <h2 className="text-xl font-semibold">Upload Karya</h2>
          <p className="text-sm text-gray-500">Jual NFT, Ebook, Musik</p>
        </a>
        
        <a href="#" className="border rounded-xl p-8 text-center hover:bg-gray-50">
          <div className="text-4xl mb-2">🛍️</div>
          <h2 className="text-xl font-semibold">Jelajahi Toko</h2>
          <p className="text-sm text-gray-500">Coming Soon</p>
        </a>
      </div>
    </main>
  )
}
