'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [generate, setGenerate] = useState(false);
  const [size, setSize] = useState(200);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animated-gradient relative">
      {!generate && (
        <>
          <h1 className="text-3xl font-extralight">QR Code Generator</h1>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter text to generate QR code"
              className="border rounded px-4 py-2 w-64"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <details className="border rounded px-4 py-2 w-64">
              <summary className="cursor-pointer">Optional Settings</summary>
              <div className="mt-2">
                <label className="block text-sm font-light relative">
                  QR Code Size (px):
                  <input
                    type="number"
                    placeholder="200"
                    className="border rounded px-2 py-1 w-full mt-1"
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (isNaN(value)) {
                        e.target.setCustomValidity('Please enter a valid integer.');
                        setSize(200);
                      } else {
                        e.target.setCustomValidity('');
                        setSize(value);
                      }
                    }}
                    onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please enter a valid integer.')}
                  />
                  <span className="text-xs text-red-500 absolute mt-1 hidden peer-invalid:block">
                    Please enter a valid integer.
                  </span>
                </label>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-light">
                  Add &quot;https://&quot;:
                  <input
                    type="checkbox"
                    className="ml-2"
                    onChange={(e) =>
                      setInputText((prev) =>
                        e.target.checked ? `https://${prev}` : prev.replace(/^https:\/\//, '')
                      )
                    }
                  />
                </label>
              </div>
            </details>
          </div>

          <div className="mt-4">
            <button
              className="rounded-full border font-thin text-xl bg-transparent px-6 py-3 hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden border-white text-white relative z-10"
              onClick={() => setGenerate(true)}
            >
              Generate
            </button>
          </div>
        </>
      )}

      {generate && (
        <>
          <h2 className="text-2xl font-extralight">Generated QR Code</h2>
          <div className="mt-4">
            <img
              id="qr-code"
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                inputText
              )}&size=${size}x${size}`}
              alt="QR Code"
            />
          </div>
          <div className="mt-4">
            <button
              className="rounded-full border font-thin text-xl bg-transparent px-6 py-3 hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden border-white text-white relative z-10"
              onClick={() => {
                const qrCodeImage = document.getElementById('qr-code') as HTMLImageElement;
                if (qrCodeImage) {
                  const link = document.createElement('a');
                  link.href = qrCodeImage.src;
                  link.download = 'qr-code.png';
                  link.click();
                }
              }}
            >
              Download QR Code
            </button>
          </div>
          <div className="mt-4">
            <button
              className="rounded-full border font-thin text-xl bg-transparent px-6 py-3 hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden border-white text-white relative z-10"
              onClick={() => setGenerate(false)}
            >
              Generate Another
            </button>
          </div>
        </>
      )}
    </div>
  );
}
