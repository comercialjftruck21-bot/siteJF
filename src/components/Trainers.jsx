import React from 'react';
    import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
    } from "@/components/ui/carousel";

    const trainers = [
      {
        name: 'Jessica Miles',
        specialty: 'HIIT & Cardio',
        imageAlt: 'Portrait of Jessica Miles, a fitness trainer',
        imageText: 'A smiling female fitness trainer in athletic wear',
        imageUrl: 'https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/cc771d2544b85950999037565c143865.png'
      },
      {
        name: 'Mark Johnson',
        specialty: 'Strength & Bodybuilding',
        imageAlt: 'Portrait of Mark Johnson, a fitness trainer',
        imageText: 'A muscular male fitness trainer posing',
        imageUrl: 'https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/8c9124165fa44faa5c59e6375376c3c7.png'
      },
      {
        name: 'Emily Chen',
        specialty: 'Yoga & Flexibility',
        imageAlt: 'Portrait of Emily Chen, a fitness trainer',
        imageText: 'A female yoga instructor in a peaceful pose',
        imageUrl: 'https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/46a69ce0a29d108f9eed4b29c4b3a147.png'
      },
      {
        name: 'David Lee',
        specialty: 'Functional Fitness',
        imageAlt: 'Portrait of David Lee, a fitness trainer lifting a dumbbell',
        imageText: 'A male trainer with a man bun lifting a dumbbell in a gym',
        imageUrl: 'https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/18af204ed23feb18df5ae652054de683.jpg'
      },
      {
        name: 'Sophia Rodriguez',
        specialty: 'CrossFit & Endurance',
        imageAlt: 'Portrait of Sophia Rodriguez, a fitness trainer in a stretching pose',
        imageText: 'A female trainer performing a stretching exercise outdoors',
        imageUrl: 'https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/35fd06ef20886e8deabef6d49c0733f1.jpg'
      },
    ];

    const Trainers = () => {
      return (
        <section className="bg-[#0C0C0C] py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Meet Our <span className="text-[#B1F82A]">World-Class</span> Trainers
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Our certified experts are here to guide you on your fitness journey, no matter your goal.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {trainers.map((trainer, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="group relative flex flex-col h-full bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-6 transition-all">
                        <div className="relative rounded-lg overflow-hidden mb-6 aspect-[4/5]">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={trainer.imageAlt} src={trainer.imageUrl} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                        <p className="text-[#B1F82A] font-semibold">{trainer.specialty}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-white bg-gray-800 hover:bg-[#1e04fb] hover:text-white" />
              <CarouselNext className="text-white bg-gray-800 hover:bg-[#1e04fb] hover:text-white" />
            </Carousel>
          </div>
        </section>
      );
    };

    export default Trainers;