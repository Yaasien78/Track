'use client'
import { useState } from 'react'
import PiLoginButton from './components/PiLoginButton'

const KOSONG = { nama: '', ttl: '', pekerjaan: '', alamat: '', no_telpon: '', wa: '', gmail: '' }

export default function MyTrack() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState(KOSONG)

  // 1. Pas Login -> Form kosongin. Gak pake LocalStorage lagi
  const onLogin = (piUser) => {
    setUser(piUser)
    setForm(KOSONG)
    alert(`Login sebagai @${piUser.pi_username}. Klik Import.json untuk muat data.`)
  }

  // 2. Simpan = Download File. Ini satu-satunya cara aman di Pi
  const handleSimpan = () => {
    if(!user) return alert('Login Pi dulu bro')
    const data = JSON.stringify(form, null, 2)
    const blob = new Blob([data], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `MyTrack_${user.pi_username}.json`; a.click()
    URL.revokeObjectURL(url)
    alert(`✅ File MyTrack_${user.pi_username}.json sudah di-download. Simpan baik-baik!`)
  }

  // 3. Import = Muat File
  const handleImport = (e) => {
    const file = e.target.files[0];
    if(!file ||!user) return alert('Login Pi dulu');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setForm(data);
        alert('✅ Data berhasil dimuat dari file')
      } catch {
        alert('❌ File rusak/bukan format MyTrack')
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  }

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  if(!user) {
    return (
      <div style={{padding:20, textAlign:'center', fontFamily:'sans-serif'}}>
        <h1>My Track Pi</h1>
        <p style={{color:'red', fontWeight:'bold'}}>ATURAN PI BROWSER: Data gak bisa auto-save.</p>
        <p>Alurnya: `Isi > Simpan.json > Kalo buka lagi, Import.json`</p>
        <PiLoginButton onLogin={onLogin} />
      </div>
    )
  }

  return (
    <div style={{padding:20, maxWidth:500, margin:'auto', fontFamily:'sans-serif'}}>
      <h2>Halo @{user.pi_username}</h2>
      <p style={{fontSize:12, color:'red', marginTop:-10, fontWeight:'bold'}}>WAJIB: Simpan file.json tiap edit!</p>

      <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} style={inputStyle}/>
      <input name="ttl" placeholder="Tempat, Tanggal Lahir" value={form.ttl} onChange={handleChange} style={inputStyle}/>
      <input name="pekerjaan" placeholder="Pekerjaan" value={form.pekerjaan} onChange={handleChange} style={inputStyle}/>
      <input name="alamat" placeholder="Alamat Palembang" value={form.alamat} onChange={handleChange} style={inputStyle}/>
      <input name="no_telpon" placeholder="No Telpon" value={form.no_telpon} onChange={handleChange} style={inputStyle}/>
      <input name="wa" placeholder="No WA" value={form.wa} onChange={handleChange} style={inputStyle}/>
      <input name="gmail" placeholder="Gmail" value={form.gmail} onChange={handleChange} style={inputStyle}/>

      <button onClick={handleSimpan} style={{...inputStyle, background:'#ffc300', fontWeight:'bold'}}>1. Simpan.json</button>

      <div style={{display:'flex', gap:10}}>
        <input type="file" accept=".json" onChange={handleImport} style={{display:'none'}} id="importBtn"/>
        <label htmlFor="importBtn" style={{...inputStyle, background:'#4CAF50', color:'#fff', flex:1, textAlign:'center', cursor:'pointer', lineHeight:'40px', padding:0}}>2. Import.json</label>
      </div>

      <button onClick={() => setUser(null)} style={{...inputStyle, background:'#f44336', color:'#fff'}}>Ganti Akun Pi</button>
    </div>
  )
}

const inputStyle = {
  display:'block', width:'100%', boxSizing:'border-box',
  padding:12, margin:'8px 0', borderRadius:8,
  border:'1px solid #ccc', fontSize:16
      }
