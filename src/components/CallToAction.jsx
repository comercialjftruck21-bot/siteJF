import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = ({ onStart }) => {
  return (
    <section className="bg-[#0C0C0C] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Ready for Your <span className="text-[#B1F82A]">Transformation?</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Stop guessing, start training. Get your personalized workout plan in minutes and take the first step towards a stronger, healthier you.
              </p>
              <div className="mt-8">
                <Button onClick={() => onStart()} className="px-8 py-4 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Generate workout plan
                </Button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0 lg:w-1/2 flex justify-center items-center py-0 lg:py-0">
              <div className="w-full max-w-lg h-80 rounded-xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Man lifting weights"
                  src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/victor-freitas-wvdydxdzkhs-unsplash-soaHV.jpg"
                />
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#B1F82A] rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1E04FB] rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;