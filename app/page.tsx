'use client'

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const handleLogin = async () => {
    if (!window.Pi) {
      alert('Pi SDK not loaded!')
      return
    }
    
    try {
      window.Pi.init({ version: "2.0", sandbox: true })
      const auth = await window.Pi.authenticate(['username'], () => {})
      alert('Success! Username: ' + auth.user.username)
    } catch (e) {
      alert('Error: ' + JSON.stringify(e))
    }
  }

  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>Pi App is running</h1>
      <button onClick={handleLogin} style={{padding: '10px 20px', fontSize: '16px'}}>
        Sign in with Pi
      </button>
    </div>
  )
                                            }
