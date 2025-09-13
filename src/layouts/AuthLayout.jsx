import chatBg from "../assets/ChatBg.png";
import logo from "../assets/Logo.png";
import signinChat from "../assets/SiginChat.png";
import formBg from "../assets/FormBg.png";

export default function AuthLayout({ children, title, variant }) {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Side - Image Section */}
  <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background + content wrapper (clipping applied) */}
        <div
          className="absolute"
          style={{
            top: '32px',
            left: '32px',
            right: '32px',
            bottom: '32px',
            borderRadius: '32px',
            overflow: 'hidden', 
            zIndex: 0,
          }}
        >
          {/* Background Image (fills wrapper) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${chatBg})`,
              opacity: 1
            }}
          />

          {/* Content Over Image (positioned relative to the wrapper) */}
          <div className="relative z-10 flex flex-col w-full h-full">
            {/* Logo */}
            <div
              className="absolute"
              style={{
                width: '213px',
                height: '48px',
                top: '40px',
                left: '40px',
                opacity: 1,
                gap: '16px'
              }}
            >
              <img
                src={logo}
                alt="Aperture Futures Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Heading */}
            <div className="absolute" style={{ top: '120px', left: '64px', maxWidth: '400px' }}>
              <h1 className="text-4xl font-bold text-white leading-tight whitespace-nowrap">
                Global Insight Engine.
              </h1>
              <p className="text-lg text-gray-200 mt-2 whitespace-nowrap">
                AI tools for exploring global diplomacy and UNSC data
              </p>
            </div>

            {/* SiginChat Image positioned as per specs (will be clipped by wrapper) */}
            <div
              className="absolute"
              style={{
                left: 140,
                top: 180,
                width: 709,
                height: 493,
                zIndex: 5,
                opacity: 1,
                boxShadow: "none",
              }}
            >
              <img
                src={signinChat}
                alt="Dashboard Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 32,
              background: "rgba(10,15,28,0.7)", // strong dark overlay
              zIndex: 2,
            }}
          />
        </div>
      </div>
      
      {/* Form Background Image */}
     <div
  className="absolute bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${formBg})`,
    width: '1090px',
    height: '581px',
    transform: 'rotate(10deg)',   // Only tilt, no upside-down
    transformOrigin: 'center',
    top: '400px',
    left: '730px',
    opacity: 1,
    borderTopRightRadius: '500px',
    borderBottomRightRadius: '500px',
    zIndex: 0
  }}
/>

      
      {/* Right Side - Form Section */}
  <div className="w-full lg:w-1/2 flex items-center justify-center px-16 py-12 relative z-10" style={{ marginLeft: '-32px' }}>
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
                <div className="text-center">
                  {variant === "signup" ? (
                    <>
                      <div className="text-sm font-bold text-black mb-2" style={{letterSpacing: '0.5px'}}>SIGN UP</div>
                      <h2 className="text-3xl font-bold text-black mb-2" style={{lineHeight: '1.2'}}>
                        Create Your Account – Aperture Futures
                      </h2>
                      <p className="text-base text-black" style={{marginTop: '8px'}}>
                        Join our platform to access, explore, and analyze UN<br />
                        Security Council data with AI-powered tools.
                      </p>
                    </>
                  ) : variant === "forgot" ? (
                    <></>
                  ) : (
                    <>
                      <div className="text-sm font-bold text-black mb-2" style={{letterSpacing: '0.5px'}}>LOG IN</div>
                      <h2 className="text-3xl font-bold text-black mb-2" style={{lineHeight: '1.2'}}>
                        Welcome to BLUELINES or LIVELINES or CROSSLINES by Aperture Futures.
                      </h2>
                      <p className="text-base text-black" style={{marginTop: '8px'}}>
                        Access your Chatbot, resolutions, and transcripts instantly.
                      </p>
                    </>
                  )}
                  </div>
      </div>
          {/* Form Content */}
          {children}
          
          {/* Footer */}
          <div className="text-center text-xs text-gray-500 mt-8">
            ©2025 Aperture Futures | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}