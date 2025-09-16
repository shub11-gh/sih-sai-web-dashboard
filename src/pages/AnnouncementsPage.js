import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AnnouncementsPage(){
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectionDate, setSelectionDate] = useState('');
  const [location, setLocation] = useState('');
  const [selectionEndDate, setSelectionEndDate] = useState('');

  useEffect(() => {
    axios.get('/announcements').then(res => setAnnouncements(res.data));
  }, []);

  const addAnnouncement = async (e) => {
    e.preventDefault();
    if (selectionEndDate && selectionDate && new Date(selectionEndDate) < new Date(selectionDate)) {
      alert('End date cannot be before start date');
      return;
    }
    const payload = { title, details, selectionDate, selectionEndDate, location };
    const res = await axios.post('/announcements', payload);
    setAnnouncements(prev => [res.data, ...prev]);
    setTitle(''); setDetails(''); setSelectionDate(''); setSelectionEndDate(''); setLocation('');
  };

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Announcements" />
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-white">Create announcement</h2>
            <form onSubmit={addAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300">Title</label>
                <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300">Details</label>
                <textarea value={details} onChange={e=>setDetails(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300">Selection date</label>
                  <input type="date" value={selectionDate} onChange={e=>setSelectionDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300">End date</label>
                  <input type="date" value={selectionEndDate} onChange={e=>setSelectionEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300">Location</label>
                  <input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm placeholder-dark-400 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"/>
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-200">Publish</button>
            </form>
          </div>

          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-white">Upcoming selections</h2>
            <div className="space-y-4">
              {announcements.length === 0 ? (
                <div className="text-dark-300">No announcements yet.</div>
              ) : announcements.map(a => (
                (() => {
                  const now = new Date();
                  const end = a.selectionEndDate ? new Date(a.selectionEndDate) : (a.selectionDate ? new Date(a.selectionDate) : null);
                  const isCompleted = end ? now > end : false;
                  return (
                    <div key={a.id} className={`p-4 rounded-lg border border-dark-600 bg-dark-700 ${isCompleted ? 'opacity-60' : ''}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-3">
                          {a.title}
                          {isCompleted && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Completed</span>
                          )}
                        </h3>
                        <span className="text-sm text-brand-400">
                          {a.selectionDate}
                          {a.selectionEndDate ? ` → ${a.selectionEndDate}` : ''}
                        </span>
                      </div>
                      <p className="text-dark-300 mt-2">{a.details}</p>
                      {(a.selectionDate && a.selectionEndDate) && (
                        <div className="mt-1 text-xs text-dark-400">
                          Duration: {Math.max(1, (new Date(a.selectionEndDate) - new Date(a.selectionDate)) / (1000 * 60 * 60 * 24) + 1)} day(s)
                        </div>
                      )}
                      {a.location && <div className="mt-2 text-sm text-dark-300">Location: <span className="text-white">{a.location}</span></div>}
                    </div>
                  );
                })()
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


