import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [settings, setSettings] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    bio: "I love shopping for tech gadgets!",
    darkMode: false,
    compactMode: false,
    emailNotifications: true,
    smsNotifications: false,
    promoEmails: true,
    language: "English",
    currency: "USD",
  });
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = "#1a202c"; 
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = "#f3f4f6"; 
      document.body.style.color = "#000000";
    }
  }, [settings.darkMode]);
  const AccountSettings = () => (
    <div className="animate-fade-in">
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input 
            type="text" 
            value={settings.displayName}
            onChange={(e) => updateSetting('displayName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={settings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              value={settings.phone}
              onChange={(e) => updateSetting('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            rows="3" 
            value={settings.bio}
            onChange={(e) => updateSetting('bio', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" 
          />
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-b-xl flex justify-end">
        <button onClick={() => setActiveSection(null)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="animate-fade-in">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Dark Mode</p>
            <p className="text-sm text-gray-500">Easier on the eyes in low light.</p>
          </div>
          <button 
            onClick={() => updateSetting('darkMode', !settings.darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <hr className="border-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Compact View</p>
            <p className="text-sm text-gray-500">Show more content on the screen.</p>
          </div>
          <button 
            onClick={() => updateSetting('compactMode', !settings.compactMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.compactMode ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.compactMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="animate-fade-in">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Order Updates (Email)</p>
            <p className="text-sm text-gray-500">Get notified when your order ships.</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.emailNotifications} 
            onChange={() => updateSetting('emailNotifications', !settings.emailNotifications)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
        <hr className="border-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Order Updates (SMS)</p>
            <p className="text-sm text-gray-500">Receive text messages for delivery.</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.smsNotifications} 
            onChange={() => updateSetting('smsNotifications', !settings.smsNotifications)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
        <hr className="border-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Promotional Emails</p>
            <p className="text-sm text-gray-500">Hear about sales and new products.</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.promoEmails} 
            onChange={() => updateSetting('promoEmails', !settings.promoEmails)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const RegionalSettings = () => (
    <div className="animate-fade-in">
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select 
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select 
            value={settings.currency}
            onChange={(e) => updateSetting('currency', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>INR (₹)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="animate-fade-in">
      <div className="p-6 space-y-4">
        <p className="text-gray-600 text-sm">Manage your password and security preferences.</p>
        <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-left flex justify-between items-center">
          <span>Change Password</span>
          <span className="text-gray-400">›</span>
        </button>
        <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-left flex justify-between items-center">
          <span>Two-Factor Authentication</span>
          <span className="text-green-600 text-sm">Enabled</span>
        </button>
        <button className="w-full border border-red-200 text-red-600 px-4 py-3 rounded-lg hover:bg-red-50 font-medium text-left mt-4">
          Delete Account
        </button>
      </div>
    </div>
  );
const renderContent = () => {
    switch (activeSection) {
      case 'Account': return <AccountSettings />;
      case 'Appearance': return <AppearanceSettings />;
      case 'Notifications': return <NotificationSettings />;
      case 'Regional': return <RegionalSettings />;
      case 'Security': return <SecuritySettings />;
      default: return null;
    }
  };
  const ListItem = ({ title, subtitle, iconColor, iconPath, section }) => (
    <button 
      onClick={() => setActiveSection(section)}
      className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconColor}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <span className="text-gray-400 group-hover:text-blue-500 transition-colors">›</span>
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Header Area */}
      <div className="flex items-center mb-6">
        {activeSection && (
          <button 
            onClick={() => setActiveSection(null)}
            className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            {/* Back Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-800">
          {activeSection ? activeSection : 'Settings'}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[500px]">
        {!activeSection ? (
          <div className="divide-y divide-gray-100">
            
            <ListItem 
              section="Account"
              title="Account" 
              subtitle="Profile details & contact info" 
              iconColor="bg-blue-100 text-blue-600"
              iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />

            <ListItem 
              section="Appearance"
              title="Appearance" 
              subtitle="Dark mode & display settings" 
              iconColor="bg-purple-100 text-purple-600"
              iconPath="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />

            <ListItem 
              section="Notifications"
              title="Notifications" 
              subtitle="Email & SMS preferences" 
              iconColor="bg-yellow-100 text-yellow-600"
              iconPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />

            <ListItem 
              section="Regional"
              title="Language & Region" 
              subtitle="Currency & Locale" 
              iconColor="bg-pink-100 text-pink-600"
              iconPath="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />

            <ListItem 
              section="Security"
              title="Security" 
              subtitle="Password & Authentication" 
              iconColor="bg-green-100 text-green-600"
              iconPath="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />

          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default SettingsPage;