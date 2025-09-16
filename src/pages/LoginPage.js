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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden">
      <img src="/images/sports-bg.svg" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />

      <div className="max-w-4xl w-full bg-dark-800 rounded-lg shadow-card-dark overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-dark-700">
        <div className="p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg">SAI</div>
            <div>
              <div className="text-2xl font-bold text-white">SAI - Sports Talent Assessment</div>
              <div className="text-sm text-dark-400">Officials Control Panel — {mode==='login' ? 'Sign in' : 'create account'}</div>
            </div>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300">Username</label>
                <input
                  placeholder="admin"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    className="block w-full pr-12 px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute inset-y-0 right-0 px-3 text-dark-300 hover:text-dark-200 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-600 focus:ring-brand-500" />
                  <label htmlFor="remember" className="text-sm text-dark-400">Remember me</label>
                </div>
                <button type="button" onClick={()=>setMode('signup')} className="text-sm text-brand-400 hover:text-brand-300 hover:underline">Don't have an account? Sign up</button>
              </div>

              <div>
                <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-200">Sign in</button>
              </div>
            </form>
          ) : (
            <div className="my-5">
            <form onSubmit={handleSignup} className="mt-4 space-y-4" style={{height: '60vh'}}>
              <div>
                <label className="block text-sm font-medium text-dark-300">Full name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300">Email (optional)</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300">Username</label>
                <input value={user} onChange={e=>setUser(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={pass}
                    onChange={e=>setPass(e.target.value)}
                    className="block w-full pr-12 px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm shadow-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute inset-y-0 right-0 px-3 text-dark-300 hover:text-dark-200 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={()=>setMode('login')} className="text-sm text-dark-400 hover:text-dark-300 hover:underline">Back to login</button>
              </div>

              <div>
                <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-200">Create account</button>
              </div>
            </form>
            </div>
          )}

          <div className="text-xs text-dark-400 mt-4">By using this dashboard you agree to SAI policies. <br />Demo login: admin/password</div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 relative">
          <img src="/images/sports-icons.svg" alt="icons" className="absolute left-6 top-6 opacity-20 w-44" />
          <div className="space-y-4 text-center px-6 z-10">
            <div className="text-3xl font-bold">Welcome to SAI - Sports Talent Assessment Portal</div>
            <div className="text-sm opacity-90">Register and review verified athlete performance, manage reports, and export insights.</div>
            <div className="flex items-center justify-center mt-4 gap-3">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">🏅</div>
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">📈</div>
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">⚽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
