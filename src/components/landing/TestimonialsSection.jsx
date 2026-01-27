import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'This platform completely transformed my career. The courses are well-structured, and the instructors are top-notch. I landed my dream job at Google within 6 months of starting!',
      course: 'Full Stack Web Development',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Scientist at Microsoft',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'The AI-powered learning assistant is a game-changer. It helped me understand complex machine learning concepts that I struggled with for years. Highly recommended!',
      course: 'Machine Learning Specialization',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer at Adobe',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'As someone transitioning from graphic design to UX, these courses provided the perfect bridge. The projects were hands-on and the community support was amazing.',
      course: 'UI/UX Design Masterclass',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Marketing Manager at Amazon',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'The digital marketing courses are incredibly practical. I implemented strategies from the course and saw a 150% increase in our campaign ROI within 3 months.',
      course: 'Digital Marketing Pro',
    },
    {
      id: 5,
      name: 'Priya Sharma',
      role: 'Business Analyst at Deloitte',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'The instructors are world-class, and the content is always up-to-date with industry trends. The certification helped me get promoted to a senior position.',
      course: 'Business Analytics',
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Freelance Developer',
      avatar: 'https://i.pravatar.cc/150?img=4',
      rating: 5,
      text: 'Learning at my own pace was crucial as a working professional. The platform made it easy to balance my job and upskilling. Now I earn 3x more as a freelancer!',
      course: 'React & Node.js',
    },
  ];

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-3">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Students
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> Say About Us</span>
          </h3>
          <p className="text-xl text-gray-600">
            Join thousands of successful learners who transformed their careers
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 shadow-xl border border-indigo-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-indigo-600 font-medium">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Completed: {testimonials[activeIndex].course}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hidden md:block"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hidden md:block"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all ${
                index === activeIndex
                  ? 'w-8 bg-indigo-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              } h-2 rounded-full`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-4 line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">4.9★</div>
            <div className="text-sm text-gray-500">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">10K+</div>
            <div className="text-sm text-gray-500">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">95%</div>
            <div className="text-sm text-gray-500">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">100%</div>
            <div className="text-sm text-gray-500">Verified</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;