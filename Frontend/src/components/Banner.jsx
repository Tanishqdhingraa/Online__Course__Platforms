import React from "react";

function Banner() {
  return (
    <section className="w-full mt-10 bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome to <span className="text-yellow-300">EduSphere</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-sky-100 max-w-3xl mx-auto">
          Your gateway to a world of learning. Explore expert-led courses,
          upgrade your skills, and grow your career with interactive lessons
          designed for the modern learner.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
            Explore Courses
          </button>
          <button className="bg-indigo-700 border border-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-800 transition">
            Become an Instructor
          </button>
        </div>

      </div>
    </section>
  );
}

export default Banner;
