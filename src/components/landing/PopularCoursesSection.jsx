import React, { useState } from 'react';

const PopularCoursesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const courses = [
    {
      id: 1,
      tag: 'WEB3',
      title: 'Blockchain Development Fundamentals',
      instructor: 'Alex Zhang',
      students: 2847,
      rating: 4.9,
      price: 2999,
      duration: '42h',
      color: '#00ff88',
      accent: '#00d4ff',
    },
    {
      id: 2,
      tag: 'ML/AI',
      title: 'Neural Networks from Scratch',
      instructor: 'Dr. Sarah Kim',
      students: 5621,
      rating: 4.8,
      price: 3499,
      duration: '56h',
      color: '#00d4ff',
      accent: '#ff0088',
    },
    {
      id: 3,
      tag: 'DESIGN',
      title: 'Product Design Systems',
      instructor: 'Marcus Johnson',
      students: 1923,
      rating: 4.9,
      price: 2499,
      duration: '28h',
      color: '#ff0088',
      accent: '#ffd700',
    },
    {
      id: 4,
      tag: 'DEV',
      title: 'Advanced React Patterns',
      instructor: 'Emma Chen',
      students: 4512,
      rating: 4.7,
      price: 1999,
      duration: '36h',
      color: '#ffd700',
      accent: '#00ff88',
    },
    {
      id: 5,
      tag: 'DATA',
      title: 'Data Engineering Pipeline',
      instructor: 'James Wilson',
      students: 3201,
      rating: 4.8,
      price: 3999,
      duration: '48h',
      color: '#00ff88',
      accent: '#00d4ff',
    },
    {
      id: 6,
      tag: 'CLOUD',
      title: 'AWS Solutions Architecture',
      instructor: 'Lisa Martinez',
      students: 2876,
      rating: 4.9,
      price: 2799,
      duration: '40h',
      color: '#00d4ff',
      accent: '#ff0088',
    },
  ];

  return (
    <section id="courses" className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#00ff88]"></div>
            <span className="font-['JetBrains_Mono'] text-sm text-[#00ff88] uppercase tracking-[0.2em]">
              Course Catalog
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="font-['Syne'] font-extrabold text-5xl md:text-7xl text-white leading-none">
              START
              <br />
              <span className="holographic">BUILDING</span>
            </h2>
            <a 
              href="/courses"
              className="font-['JetBrains_Mono'] text-sm text-[#00ff88] hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
            >
              View All Courses
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="relative bg-[#14141f] border-2 transition-all duration-500 group cursor-pointer overflow-hidden"
              style={{
                borderColor: hoveredIndex === index ? course.color : 'rgba(255,255,255,0.1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${course.color}, ${course.accent})`,
                }}
              ></div>

              {/* Content */}
              <div className="relative p-8">
                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span 
                    className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] px-3 py-1 border"
                    style={{ 
                      borderColor: course.color,
                      color: course.color,
                    }}
                  >
                    {course.tag}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#5a5a70]">
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Syne'] font-bold text-2xl text-white mb-4 leading-tight group-hover:text-[#00ff88] transition-colors">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="font-['DM_Sans'] text-sm text-[#c0c0d0] mb-6">
                  by {course.instructor}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 font-['JetBrains_Mono'] text-xs text-[#a0a0b8]">
                  <div className="flex items-center gap-2">
                    <span style={{ color: course.color }}>★</span>
                    <span className="text-white">{course.rating}</span>
                  </div>
                  <div className="w-px h-4 bg-[#5a5a70]"></div>
                  <div className="text-white">{course.students.toLocaleString()} students</div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <span className="font-['Syne'] font-bold text-2xl text-white">
                      ₹{course.price}
                    </span>
                  </div>
                  <div 
                    className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                    style={{ color: course.color }}
                  >
                    Enroll
                    <span className="text-base">→</span>
                  </div>
                </div>
              </div>

              {/* Accent Line */}
              <div 
                className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: course.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <a 
            href="/courses"
            className="inline-block font-['JetBrains_Mono'] text-sm bg-transparent border-2 border-[#00ff88] text-[#00ff88] px-12 py-4 uppercase tracking-[0.2em] hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-all duration-300"
          >
            Browse All 500+ Courses
          </a>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ff88]/5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff0088]/5 blur-[150px] rounded-full"></div>
    </section>
  );
};

export default PopularCoursesSection;