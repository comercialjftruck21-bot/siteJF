import React from 'react';
import { cn } from "@/lib/utils";

const BentoGrid = () => {
    const Card = ({ className, children }) => (
        <div className={cn("relative group rounded-3xl p-6 flex flex-col justify-between", className)}>
            {children}
        </div>
    );
    return (
        <section className="bg-[#0C0C0C] py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[600px]">
                    <Card className="md:col-span-2 md:row-span-2 bg-gray-900 overflow-hidden">
                        <div className="flex flex-col h-full">
                            <p className="text-sm font-semibold text-gray-400">OUR COMMUNITY</p>
                            <h3 className="text-3xl font-bold text-white mt-2">
                                More than just a workout.
                            </h3>
                            <div className="flex-grow mt-4 relative">
                                <img
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500"
                                    alt="Diverse group of people meditating outdoors"
                                    src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/natalia-blauth-piyridjkrjo-unsplash-6Wx3e.jpg"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gray-800 text-white">
                        <img
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-10 transition-opacity duration-300"
                            alt="Abstract black and white spheres floating in space"
                            src="https://images.unsplash.com/photo-1685804575681-1256a2749223"
                        />
                        <div className="relative">
                            <p className="text-sm font-semibold text-gray-400">WORLD OF FITNESS</p>
                            <h3 className="text-3xl font-bold mt-4">
                                View our blog
                            </h3>
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-[#1E04FB] text-white">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Discover</p>
                            <h3 className="mt-auto text-2xl font-bold">About us</h3>
                        </Card>
                        <Card className="bg-[#B1F82A] text-black">
                            <p className="text-xs font-bold uppercase tracking-widest">Have Questions?</p>
                            <h3 className="mt-auto text-2xl font-bold">Contact us</h3>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default BentoGrid;