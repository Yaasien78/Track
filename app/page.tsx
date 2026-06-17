"use client"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Nunggu SDK ke-load dulu
    const initPi = async () => {
      if (window.Pi) {
        await window.Pi.init({ 
          clientId: "production_xxx...", // GANTI pake Production Client ID dari developers.minepi.com
          version: "2.0"
        });
        console.log("Pi SDK loaded");
      }
    }
    
    if (document.readyState === 'complete') {
      initPi();
    } else {
      window.addEventListener('load', initPi);
    }
  }, []);

  const handleLogin = async () => {
    const scopes = ['username', 'payments'];
    const auth = await window.Pi.authenticate(scopes, () => {});
    setUser(auth.user);
  }

  const handleBuy = async () => {
    const paymentData = {
      amount: 1,
      memo: "Mint NFT Genesis",
      metadata: { nft_id: "genesis_001" }
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        await fetch("/api/payments/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        await fetch("/api/payments/complete", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid })
        });
        alert("NFT Berhasil di-Mint! 🎉");
      },
      onCancel: () => console.log("User cancel"),
      onError: (error: any) => console.error(error)
    };

    await window.Pi.createPayment(paymentData, callbacks);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">NFT Social Genesis</h1>
      
      {!user ? (
        <button onClick={handleLogin} className="bg-purple-600 text-white px-6 py-3 rounded">
          Login with Pi
        </button>
      ) : (
        <>
          <p className="mb-4">Halo @{user.username}</p>
          <button onClick={handleBuy} className="bg-yellow-500 text-black px-8 py-4 rounded text-xl font-bold">
            Mint NFT Genesis - 1 Pi
          </button>
        </>
      )}
    </main>
  )
  }
