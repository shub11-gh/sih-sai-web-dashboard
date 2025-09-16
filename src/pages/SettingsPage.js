import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function SettingsPage(){
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@sai.gov.in');
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  const save = (e) => {
    e.preventDefault();
    alert('Settings saved');
  };

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Settings" />
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-white">Profile</h2>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300">Full name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300">Email</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300">Timezone</label>
                <select value={timezone} onChange={e=>setTimezone(e.target.value)} className="mt-1 w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm text-white focus:outline-none focus:border-brand-500">
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="Europe/London">Europe/London (BST)</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-200">Save changes</button>
              </div>
            </form>
          </div>

          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between text-dark-300">
                <span>Enable notifications</span>
                <input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)} className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-600 focus:ring-brand-500" />
              </label>
              <label className="flex items-center justify-between text-dark-300">
                <span>Weekly email digest</span>
                <input type="checkbox" checked={weeklyDigest} onChange={e=>setWeeklyDigest(e.target.checked)} className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-600 focus:ring-brand-500" />
              </label>
              <div className="text-xs text-dark-400">These preferences are stored locally for demo purposes.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


