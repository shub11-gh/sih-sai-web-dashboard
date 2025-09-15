import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const hardcoded = { user: "admin", pass: "password" };

function getStoredUsers(){
  try{
    const raw = localStorage.getItem('registeredUsers');
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

const LoginPage = ({ setAuth }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState(getStoredUsers());
  const navigate = useNavigate();

  useEffect(()=>{
    // ensure demo admin exists in registered list for visibility (but keep hardcoded login working)
    const demo = users.find(u=>u.user===hardcoded.user);
    if(!demo){
      const newUsers = [...users, { user: hardcoded.user, pass: hardcoded.pass, name: 'Demo Admin', email: 'admin@sai.gov' }];
      setUsers(newUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(newUsers));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    // check hardcoded first
    if (user === hardcoded.user && pass === hardcoded.pass) {
      setAuth(true);
      navigate("/");
      return;
    }

    const found = users.find(u => u.user === user && u.pass === pass);
    if(found){
      setAuth(true);
      navigate('/');
    } else {
      alert('Invalid credentials. If new, please sign up.');
    }
  };

  const handleSignup = e => {
    e.preventDefault();
    if(!user || !pass || !name) return alert('Please provide name, username and password');
    if(users.find(u=>u.user===user)) return alert('Username already taken');
    const newUsers = [...users, { user, pass, name, email }];
    setUsers(newUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(newUsers));
    alert('Signup successful — please login');
    setMode('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden">
      <img src="/images/sports-bg.svg" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none" />

      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10">
        <div className="p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">SAI</div>
            <div>
              <div className="text-2xl font-bold">SAI - Sports Talent Assessment</div>
              <div className="text-sm text-slate-500">Officials Control Panel — {mode==='login' ? 'Sign in' : 'create account'}</div>
            </div>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <input
                  placeholder="admin"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
                </div>
                <button type="button" onClick={()=>setMode('signup')} className="text-sm text-brand-600 hover:underline">Don't have an account? Sign up</button>
              </div>

              <div>
                <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md shadow-sm">Sign in</button>
              </div>
            </form>
          ) : (
            <div className="my-5">
            <form onSubmit={handleSignup} className="mt-4 space-y-4" style={{height: '60vh'}}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email (optional)</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <input value={user} onChange={e=>setUser(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={()=>setMode('login')} className="text-sm text-slate-600 hover:underline">Back to login</button>
              </div>

              <div>
                <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md shadow-sm">Create account</button>
              </div>
            </form>
            </div>
          )}

          <div className="text-xs text-slate-500 mt-4">By using this dashboard you agree to SAI policies. <br />Demo login: admin/password</div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-400 text-white p-6 relative">
          <img src="/images/sports-icons.svg" alt="icons" className="absolute left-6 top-6 opacity-30 w-44" />
          <div className="space-y-4 text-center px-6 z-10">
            <div className="text-3xl font-bold">Welcome to SAI - Sports Talent Assessment Portal</div>
            <div className="text-sm opacity-90">Register and review verified athlete performance, manage reports, and export insights.</div>
            <div className="flex items-center justify-center mt-4 gap-3">
              <div className="p-3 bg-white/20 rounded-lg">🏅</div>
              <div className="p-3 bg-white/20 rounded-lg">📈</div>
              <div className="p-3 bg-white/20 rounded-lg">⚽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
