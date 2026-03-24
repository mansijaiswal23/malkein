// components/Footer.jsx
import message from "../../../src/assets/images/message.png";
import flag from "../../../src/assets/images/flag.png";

export default function Footer() {
  return (
    <footer className="bg-[#D9D9D9] rounded-xl mt-10 px-6 py-8">

      {/* Top Section - About + How it works */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">About</h2>
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-3">How it work</p>
          <p className="text-gray-500 text-lg">Processes followed at fashion. Please</p>
          <a
            href="/about"
            className="text-lg text-gray-700 font-medium flex items-center gap-1 mt-1 hover:text-gray-900 transition-colors"
          >
            Go to page <span>→</span>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 mb-6" />

      {/* Bottom Section - Features + Currency */}
      <div className="flex flex-wrap items-center justify-between gap-6">

        {/* Easy & Secure Shopping */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Easy & Secure Shopping</p>
            <p className="text-xs text-gray-500">We ensure secure payment</p>
          </div>
        </div>

        {/* Customer Service */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Customer Service</p>
            <p className="text-xs text-gray-500">We are available 24 hours</p>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="pb-6 flex items-center justify-between px-4 border-gray-100 pt-4">
          <img src={message} alt="Contact" className="w-9 h-9 object-contain" />
          <div className="flex items-center gap-1.5 border border-gray-400 rounded-lg px-4 py-1.5 bg-[#D9D9D9] shadow-[0_6px_10px_rgba(0,0,0,0.2)]">
            <img src={flag} alt="Flag" className="w-5 h-5 object-contain" />
            <span className="text-xs font-medium text-gray-700">INR</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Malkein. All rights reserved.
      </p>

    </footer>
  );
}