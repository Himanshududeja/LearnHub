import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PopularCoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing'];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://i.pravatar.cc/150?img=1',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
      category: 'Web Development',
      level: 'Beginner',
      rating: 4.8,
      reviews: 2453,
      students: 12340,
      price: 2999,
      originalPrice: 4999,
      duration: '42 hours',
      lessons: 156,
      isBestseller: true,
    },
    {
      id: 2,
      title: 'Machine Learning A-Z: Python & R',
      instructor: 'Dr. Michael Chen',
      instructorAvatar: 'https://i.pravatar.cc/150?img=2',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.9,
      reviews: 5621,
      students: 23450,
      price: 3499,
      originalPrice: 5999,
      duration: '44 hours',
      lessons: 200,
      isBestseller: true,
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emma Williams',
      instructorAvatar: 'https://i.pravatar.cc/150?img=5',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
      category: 'Design',
      level: 'Beginner',
      rating: 4.7,
      reviews: 1876,
      students: 8920,
      price: 2499,
      originalPrice: 3999,
      duration: '28 hours',
      lessons: 95,
      isNew: true,
    },
    {
      id: 4,
      title: 'Digital Marketing Complete Course',
      instructor: 'David Brown',
      instructorAvatar: 'https://i.pravatar.cc/150?img=3',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      category: 'Marketing',
      level: 'Beginner',
      rating: 4.6,
      reviews: 3210,
      students: 15670,
      price: 1999,
      originalPrice: 3499,
      duration: '36 hours',
      lessons: 120,
      isBestseller: false,
    },
    {
      id: 5,
      title: 'Full Stack React & Node.js',
      instructor: 'Alex Martinez',
      instructorAvatar: 'https://i.pravatar.cc/150?img=4',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      category: 'Web Development',
      level: 'Advanced',
      rating: 4.9,
      reviews: 4532,
      students: 18900,
      price: 3999,
      originalPrice: 6999,
      duration: '52 hours',
      lessons: 180,
      isBestseller: true,
    },
    {
      id: 6,
      title: 'Business Analytics & Intelligence',
      instructor: 'Jennifer Taylor',
      instructorAvatar: 'https://i.pravatar.cc/150?img=6',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      category: 'Business',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 2104,
      students: 9870,
      price: 2799,
      originalPrice: 4499,
      duration: '32 hours',
      lessons: 110,
      isNew: true,
    },
  ];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-3">
            Popular Courses
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Learning with Our
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> Top Courses</span>
          </h3>
          <p className="text-xl text-gray-600">
            Join thousands of students learning from industry experts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
            >
              {/* Course Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {course.isBestseller && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      BESTSELLER
                    </span>
                  )}
                  {course.isNew && (
                    <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                {/* Category */}
                <p className="text-sm text-indigo-600 font-semibold mb-2">
                  {course.category}
                </p>

                {/* Title */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h4>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>

                {/* Rating & Students */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-bold mr-1">★</span>
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({course.reviews.toLocaleString()})</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.students.toLocaleString()} students
                  </span>
                </div>

                {/* Course Meta */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {course.lessons} lessons
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{course.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{course.originalPrice}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-indigo-600 font-semibold text-sm">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            View All Courses
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;