"use client"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [isPiBrowser, setIsPiBrowser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkPi = setInterval(() => {
      if (window.Pi) {
        setIsPiBrowser(true)
        // PASTE APP ID LU DI SINI ↓↓
        window.Pi.init({ 
          version: "2.0", 
          sandbox: true,
          appId: "PASTE_APP_ID_LU_DISINI" // ganti ini
        })
        clearInterval(checkPi)
      }
    }, 100)
    return () => clearInterval(checkPi)
  }, [])

  const handleLogin = async () => {
    if (!isPiBrowser) {
      alert("Buka app ini di Pi Browser ya bang!")
      return
    }

    setLoading(true)
    try {
      const auth = await window.Pi.authenticate(
        ['username', 'payments'], 
        (payment) => console.log('Incomplete:', payment)
      )
      setUser(auth.user)
    } catch (err) {
      console.error("Login error:", err)
      alert("Login gagal: " + err)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">🎨 NFT Social</h1>
        <p className="mb-8">bagi kreator NFT di jaringan Pi Network</p>
        
        {!user ? (
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full w-full text-lg"
          >
            {loading ? "Loading..." : "Login with Pi"}
          </button>
        ) : (
          <div>
            <p className="text-2xl font-bold">Halo {user.username}! 👋</p>
            <p className="text-sm">UID: {user.uid}</p>
          </div>
        )}
      </div>
    </main>
  )
        }
