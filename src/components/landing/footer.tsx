'use client'

export function Footer() {
  return (
    <footer className="w-full bg-[#0f1f3d] text-gray-400 pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Grid: 1-col on mobile, 6-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">

          {/* Brand + social — always on top */}
          <div className="col-span-1">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f1f3d"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">For Clients</h4>
            <ul className="space-y-2">
              {['Find an Expert', 'Our Services', 'Countries', 'Pricing', 'Success Stories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">For Professionals</h4>
            <ul className="space-y-2">
              {['Join as Expert', 'Benefits', 'How It Works', 'Resources', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'FAQs', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Our App */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Download Our App</h4>
            {/* App buttons stay side by side on all screen sizes */}
            <div className="flex flex-row gap-2">
              {/* Google Play */}
              <a href="#" className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors flex-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white flex-shrink-0">
                  <path d="M3 20.5v-17c0-.83 1-.97 1.36-.44l13 8.5c.32.21.32.67 0 .88l-13 8.5C3 21.47 3 21.33 3 20.5z" fill="#34a853"/>
                  <path d="M3 3.5L13.94 12 3 20.5V3.5z" fill="#ea4335"/>
                  <path d="M3 3.5l10.94 8.5-3.94 3.06L3 3.5z" fill="#fbbc05"/>
                  <path d="M3 20.5l7-5.44 3.94 3.06L3 20.5z" fill="#4285f4"/>
                </svg>
                <div>
                  <p className="text-[8px] text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-xs text-white font-semibold leading-tight">Google Play</p>
                </div>
              </a>
              {/* App Store */}
              <a href="#" className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors flex-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white flex-shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[8px] text-gray-400 leading-none">Download on the</p>
                  <p className="text-xs text-white font-semibold leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-700 pt-5 text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Logiqall Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
