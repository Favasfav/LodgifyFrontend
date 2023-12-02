import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const emoji404Style = {
    position: 'relative',
    animation: 'mymove 2.5s infinite',
  };
  const navigate=useNavigate()
  return (
    <div style={{ backgroundColor: '#1A202C', height: '100vh', justifyContent: 'center' }} className="flex items-center">
      <style>
        {`
          @keyframes mymove {
            33%   {top: 0px;}
            66%  {top: 20px;}
            100%  {top: 0px;}
          }
        `}
      </style>
      <div className="m-auto text-center">
        <svg
          className="emoji-404"
          height="249.135"
          viewBox="0 0 226 249.135"
          width="226"
          xmlns="http://www.w3.org/2000/svg"
          style={emoji404Style}
        >
          <circle cx="113" cy="113" fill="#FFE585" r="109" />
          <line
            fill="none"
            opacity="0.29"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="88.866"
            x2="136.866"
            y1="245.135"
            y2="245.135"
          />
          {/* ... (remaining SVG content) */}
        </svg>
        <div className="tracking-widest mt-4">
          <span style={{ color: '#6E6E96' }} className="text-gray-500 text-6xl block">
            <span>4 0 4</span>
          </span>
          <span style={{ color: '#6E6E96' }} className="text-gray-500 text-xl">
            Sorry, We couldn't find what you are looking for!
          </span>
        </div>
        <div className="mt-6">
          <a   onClick={()=>{navigate('/')}} className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
            Go back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
