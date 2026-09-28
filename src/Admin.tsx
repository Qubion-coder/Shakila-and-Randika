import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const prefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];
  
  const generatedLink = `${window.location.origin}/?prefix=${encodeURIComponent(prefix)}&name=${encodeURIComponent(guestName)}`;
  
  const generatedMessage = `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Shakila & Randika`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brown-dark flex items-center justify-center p-4 font-montserrat text-theme-900">
      <div className="max-w-2xl w-full bg-brown-base rounded-2xl shadow-xl overflow-hidden border border-theme-500/20">
        <div className="bg-[#405645] p-6 text-center border-b border-theme-500/20">
          <h1 className="text-2xl font-cinzel font-bold text-theme-200 uppercase tracking-widest">
            Link Generator
          </h1>
          <p className="text-sm text-theme-200/80 mt-2 italic">
            Generate custom invitation links and messages for your guests
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-theme-700 mb-2">
                Prefix
              </label>
              <select 
                value={prefix} 
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-brown-dark/50 border border-theme-500/30 text-theme-900 focus:outline-none focus:border-theme-500 transition-colors"
              >
                {prefixes.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-theme-700 mb-2">
                Guest Name
              </label>
              <input 
                type="text" 
                value={guestName} 
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full px-4 py-3 rounded-lg bg-brown-dark/50 border border-theme-500/30 text-theme-900 focus:outline-none focus:border-theme-500 transition-colors placeholder:text-theme-700/40"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-theme-700">
                  Generated Link
                </label>
                <button 
                  onClick={handleCopyLink}
                  className="text-xs font-bold uppercase tracking-wider text-[#405645] hover:text-[#324536] flex items-center gap-1 transition-colors"
                >
                  {copiedLink ? <CheckCircle className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  {copiedLink ? "Copied" : "Copy Link"}
                </button>
              </div>
              <div className="w-full px-4 py-3 rounded-lg bg-brown-dark/50 border border-theme-500/30 text-theme-900/80 text-sm break-all font-mono">
                {generatedLink}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-theme-700">
                  Message Template
                </label>
                <button 
                  onClick={handleCopyMessage}
                  className="text-xs font-bold uppercase tracking-wider text-[#405645] hover:text-[#324536] flex items-center gap-1 transition-colors"
                >
                  {copiedMessage ? <CheckCircle className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  {copiedMessage ? "Copied" : "Copy Message"}
                </button>
              </div>
              <textarea 
                readOnly
                value={generatedMessage}
                rows={10}
                className="w-full px-4 py-3 rounded-lg bg-brown-dark/50 border border-theme-500/30 text-theme-900/90 text-sm whitespace-pre-wrap resize-none font-sans"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
