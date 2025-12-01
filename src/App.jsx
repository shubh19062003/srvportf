import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Home, User, Phone, FileText, Heart } from 'lucide-react';
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function App() {
  const [active, setActive] = useState('Home');
  const [scrollY, setScrollY] = useState(0);

  const sectionRefs = {
    Home: useRef(null),
    About: useRef(null),
    Resume: useRef(null),
    Hobbies: useRef(null),
    Contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 👇 Intersection Observer for nav auto-active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('id');
            const formattedName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1).toLowerCase();
            setActive(formattedName);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -25% 0px",
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);



  const navItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'About', icon: <User size={20} /> },
    { name: 'Resume', icon: <FileText size={20} /> },
    { name: 'Hobbies', icon: <Heart size={20} /> },
    { name: 'Contact', icon: <Phone size={20} /> },
  ];

  const taglines = ['Freelancer', 'Aspiring Data Analyst', 'Coder', 'CP'];
  const taglines2 = ['CP', 'Coder', 'Aspiring Data Analyst', 'Freelancer'];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >



      <div className="relative text-white min-h-screen overflow-hidden">
        {/* Background scrool */}
        <div className="pointer-events-none fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-gray-900/40"></div>
          <div
            className="w-96 h-80 bg-pink-500 rounded-full blur-[100px] opacity-25 animate-slow-pulse"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-80 bg-blue-500 opacity-15 rounded-full blur-[100px] animate-slow-pulse"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        {/* Layout */}
        <div className="relative z-10 flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-[#1a1a1a] p-6 flex flex-col items-center shadow-lg h-screen fixed top-0 left-[4.5rem]">
            <div className="group">
              <img
                src="public/sidepr.jpeg"
                alt="profile"
                className="rounded-full w-24 h-24 object-cover border-1 border-pink-500 transition duration-300 ease-in-out group-hover:scale-110 group-hover:border-pink-400 group-hover:shadow-xl"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white text-center">Shubham Raj Verma</h2>
            <h2 className={`mb-6 mt-2 text-sm transition-opacity font-bold duration-500 text-gray-400 ${fade ? 'opacity-100' : 'opacity-0'}`}>{taglines[index]}</h2>

            <nav className="w-full">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const section = document.getElementById(item.name);
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300 ease-in-out
                  ${active === item.name ? 'bg-pink-600 text-white translate-x-1' : 'hover:bg-pink-700 text-gray-300'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </aside>


          {/* Scrollable Content */}
          <main className="ml-[16rem] flex-1 flex flex-col justify-between px-10 py-0">

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >


              {/* Home Section */}
              <section id="Home" ref={sectionRefs.Home} className="flex items-center justify-between min-h-screen pt-0">
                <div className="text-left max-w-xl">
                  <h1 className="text-6xl font-serif font-bold leading-tight text-white">Hi , Myself Shubham</h1>
                  <h2 className={`text-2xl mt-2 transition-opacity duration-500 text-pink-400 ${fade ? 'opacity-100' : 'opacity-0'}`}>{taglines[index]}</h2>
                  <p className="mt-4 text-gray-300">
                    Hey there! I'm a MERN stack enthusiast and a part-time data detective, always exploring the intersection of code and logic. From crafting seamless web experiences to diving deep into datasets, my journey is fueled by curiosity and caffeine. Backed by strong DSA fundamentals and a love for competitive programming, I aim to bridge beautiful design with powerful performance. Let’s just say — if it's tech, I’m probably tinkering with it.
                  </p>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => {
                        const section = document.getElementById("Resume");
                        section?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-2 bg-green-500 text-black rounded-full font-semibold hover:bg-pink-500 transition"
                    >
                      View Work
                    </button>

                    <button className="px-6 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-pink-500 transition">Contact Me</button>
                  </div>
                </div>

                <div className="relative w-80 h-80 flex items-center justify-center group transition-all duration-500 ease-in-out">
                  <div className="absolute w-full h-full border-[6px] border-pink-600 rounded-full animate-spin-slower blur-[1px] opacity-80 shadow-2xl group-hover:scale-110 group-hover:blur-sm transition duration-500" />
                  <div className="absolute w-[280px] h-[280px] border-[3px] border-purple-400 rounded-full animate-spin-fast opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
                  <div className="absolute w-[230px] h-[230px] border-[3px] border-yellow-400 rounded-full animate-spin-reverse-slower opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
                  <div className="transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
                    <img
                      src="public/profile.jpeg"
                      alt="profile-right"
                      className="rounded-full w-48 h-48 object-cover border-[3px] border-white shadow-xl z-10 transition duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_#ec4899]"
                    />
                  </div>
                </div>
              </section>
            </motion.section>

            {/* About Section */}
            <section
              id="About"
              ref={sectionRefs.About}
              className="pt-[4rem] pb-24 px-6 text-gray-400 max-w-6xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-white border-b-2 border-pink-500 inline-block pb-3 mb-10">
                About Me.
              </h1>

              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Profile Card */}
                <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-8 w-full max-w-sm text-center duration-300 group">
                  <img
                    src="public/sidepr.jpeg"
                    alt="about-pic"
                    className="mx-auto rounded-xl w-40 h-40 object-cover border-1 border-pink-500 shadow-lg transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:border-pink-400 group-hover:shadow-xl"
                  />
                  <h2 className="mt-5 text-2xl font-bold text-white">Shubham Raj Verma</h2>
                  <p
                    className={`mb-6 mt-2 text-sm transition-opacity font-bold duration-500 text-pink-400 ${fade ? 'opacity-100' : 'opacity-0'
                      }`}
                  >{taglines2[index]}
                  </p>

                  <div className="flex justify-center gap-4 mt-5 text-lg text-gray-400">
                    <a href="https://github.com/shubh19062003">
                      <i className="fa-brands fa-github hover:text-white"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/shubham-raj-verma-b3917b273">
                      <i className="fa-brands fa-linkedin hover:text-white"></i>
                    </a>
                    <a href="https://www.instagram.com/__jazzysrv__/">
                      <i className="fa-brands fa-instagram hover:text-white"></i>
                    </a>
                    <a href="#">
                      <i className="fa-solid fa-globe hover:text-white"></i>
                    </a>
                  </div>
                </div>

                {/* Description + Info */}
                <div className="flex-1 max-w-3xl">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    Hey, I'm <span className="text-white font-semibold">Shubham Raj Verma</span>, a full-stack developer with a passion for clean code, smart UI, and powerful logic.
                    I thrive in blending tech and creativity — from coding backend APIs to designing engaging user interfaces.
                    Aside from development, I enjoy competitive coding, solving DSA problems, and exploring new data visualizations and machine learning insights.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="text-white font-semibold">Name :</span> Shubham Raj Verma
                    </div>
                    <div>
                      <span className="text-white font-semibold">Nationality :</span> Indian
                    </div>
                    <div>
                      <span className="text-white font-semibold">Phone :</span> +91 8797975719
                    </div>
                    <div>
                      <span className="text-white font-semibold">Email :</span> srv19.5060@gmail.com
                    </div>
                    <div>
                      <span className="text-white font-semibold">Experience :</span> 1+ years
                    </div>
                    <div>
                      <span className="text-white font-semibold">Freelance :</span> Available
                    </div>
                    <div>
                      <span className="text-white font-semibold">GitHub :</span> github.com/srv
                    </div>
                    <div>
                      <span className="text-white font-semibold">Language :</span> English, Hindi
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Resume Section */}

            <section id="Resume"
              ref={sectionRefs.Resume}
              className="pt-[8rem] pb-24 px-6 text-gray-300 max-w-6xl mx-auto min-h-[130vh]"

            >
              <h1 className="text-4xl font-bold text-white border-b-2 border-pink-500 inline-block pb-3 mb-10">Resume</h1>

              <div className="flex flex-col md:flex-row gap-10 items-start relative">

                {/* Left: Qualification Tracker with Vertical Line and Dots */}
                <div className="flex-1 z-10 pr-4 relative">
                  <h2 className="text-2xl font-semibold text-pink-400 mb-6">Qualification</h2>

                  <div className="relative pl-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[59px] top-5 h-44 w-0.5 bg-white"></div>

                    {/* Qualification Items */}
                    <div className="space-y-12">
                      {/* Item 1 */}
                      <div className="relative pl-10">
                        <div className="absolute left-[29px] top-1">
                          <div className="w-4 h-4 rounded-full border-2 border-white bg-black flex items-center justify-center">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-white font-semibold">Imsc - Mathematics & Computing</p>
                        <p className="text-sm font-sans text-gray-400">Birla Institute Of Technology, 2023 - Present</p>
                      </div>

                      {/* Item 2 */}
                      <div className="relative pl-7">
                        <div className="absolute left-[29px] top-1">
                          <div className="w-4 h-4 rounded-full border-2 border-white bg-black flex items-center justify-center">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-white font-semibold">Higher Secondary - PCM (80%)</p>
                        <p className="text-sm text-gray-400">D.B.M.S Kadma High School, 2020 - 2022</p>
                      </div>

                      {/* Item 3 */}
                      <div className="relative pl-7">
                        <div className="absolute left-[29px] top-1">
                          <div className="w-4 h-4 rounded-full border-2 border-white bg-black flex items-center justify-center">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-white font-semibold">Secondary School (85%)</p>
                        <p className="text-sm text-gray-400">D.B.M.S Kadma High School, 2005 - 2020</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Bottom Left Circular Progress Tracker */}
                  <div className="mt-16 grid grid-cols-3 gap-4 max-w-xs">
                    {/* DSA - 70% (offset = 79) */}
                    <div className="relative w-24 h-24 ml-16">
                      <svg className="absolute top-0 left-0 w-full h-full">
                        <circle cx="48" cy="48" r="42" className="stroke-gray-700 fill-none stroke-[8]" strokeDasharray="264" />
                        <circle
                          cx="48" cy="48" r="42"
                          className="stroke-pink-500 fill-none stroke-[8] transition-all duration-500"
                          strokeDasharray="264"
                          strokeDashoffset="79"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-bold">
                        <span className="text-white">DSA</span>
                        <span className="text-xs text-gray-400 font-medium">70%</span>
                      </div>
                    </div>

                    {/* Frontend - 80% (offset = 53) */}
                    <div className="relative w-24 h-24 ml-16">
                      <svg className="absolute top-0 left-0 w-full h-full">
                        <circle cx="48" cy="48" r="42" className="stroke-gray-700 fill-none stroke-[8]" strokeDasharray="264" />
                        <circle
                          cx="48" cy="48" r="42"
                          className="stroke-yellow-400 fill-none stroke-[8] transition-all duration-500"
                          strokeDasharray="264"
                          strokeDashoffset="53"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-bold">
                        <span className="text-white">Frontend</span>
                        <span className="text-xs text-gray-400 font-medium">80%</span>
                      </div>
                    </div>

                    {/* Backend - 60% (offset = 106) */}
                    <div className="relative w-24 h-24 ml-16">
                      <svg className="absolute top-0 left-0 w-full h-full">
                        <circle cx="48" cy="48" r="42" className="stroke-gray-700 fill-none stroke-[8]" strokeDasharray="264" />
                        <circle
                          cx="48" cy="48" r="42"
                          className="stroke-blue-400 fill-none stroke-[8] transition-all duration-500"
                          strokeDasharray="264"
                          strokeDashoffset="106"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-bold">
                        <span className="text-white">Backend</span>
                        <span className="text-xs text-gray-400 font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Dotted Separator */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full border-l border-dotted border-gray-600 z-0"></div>

                {/* Right: My Work */}
                <div className="flex-1 z-10 pl-4">
                  <h2 className="text-2xl font-semibold text-pink-400 mb-6">My Work</h2>
                  <div className="space-y-6">

                    {/* Card 1 */}
                    <div className="bg-[#1a1a1a] rounded-xl p-5 shadow-lg hover:shadow-pink-500/20 transition flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="text-white text-lg font-bold">Flight Booking System</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          A full-stack application built with Spring Boot and React to search and book flights with integrated chatbot using AI APIs.
                        </p>
                      </div>
                      <img src="/work1.svg" alt="Flight Booking" className="w-12 h-12 object-contain ml-4" />
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1a1a1a] rounded-xl p-5 shadow-lg hover:shadow-pink-500/20 transition flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="text-white text-lg font-bold">Portfolio Website</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          This very website showcasing my work and background, styled with Tailwind CSS and ReactJs.
                        </p>
                      </div>
                      <img src="/work2.svg" alt="Portfolio" className="w-12 h-12 object-contain ml-4" />
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1a1a1a] rounded-xl p-5 shadow-lg hover:shadow-pink-500/20 transition flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="text-white text-lg font-bold">Google Cloud Certification</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          Completed hands-on Google Cloud labs covering infrastructure, networking, security, AI, ML, and core services.
                        </p>
                      </div>
                      <img src="/work3.svg" alt="GCP" className="w-12 h-12 object-contain ml-4" />
                    </div>

                  </div>
                </div>

              </div>
            </section>


            {/* Hobbies Section */}
            <section
              id="Hobbies"
              ref={sectionRefs.Hobbies}
              className="pt-[6rem] pb-24 px-6 text-gray-300 max-w-6xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-white border-b-2 border-pink-500 inline-block pb-3 mb-12 text-center w-full">
                My Hobbies
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
                {[
                  {
                    title: 'Sessional Guitarist',
                    img1: '/hobby1a.jpg',
                    img2: '/hobby1b.jpg',
                    desc: 'Playing guitar in live sessions and studio recordings.',
                  },
                  {
                    title: 'Watching Movies',
                    img1: '/hobby2a.jpg',
                    img2: '/hobby2b.jpg',
                    desc: 'Exploring cinema from horror to thrillers.',
                  },
                  {
                    title: 'Gym & Fitness',
                    img1: '/hobby3a.jpg',
                    img2: '/hobby3b.jpg',
                    desc: 'Strength training & staying fit regularly.',
                  },
                  {
                    title: 'Photography',
                    img1: '/hobby4a.JPG',
                    img2: '/hobby4b.JPG',
                    desc: 'Capturing life, moments & creative frames.',
                  },
                ].map((hobby, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md hover:shadow-pink-500/30 transition duration-300 w-72 h-72"
                  >
                    <div className="w-full h-[60%] relative overflow-hidden">
                      <img
                        src={hobby.img1}
                        alt={hobby.title}
                        className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <img
                        src={hobby.img2}
                        alt={`${hobby.title} alt`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <div className="h-[40%] p-3 text-center flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-white mb-1">{hobby.title}</h3>
                      <p className="text-sm text-gray-400 px-2">{hobby.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/*contact section*/}
            <section
              id="Contact"
              ref={sectionRefs.Contact}
              className="pt-[8rem] pb-24 px-6 max-w-6xl mx-auto text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h1 className="text-4xl font-bold border-b-2 border-pink-500 inline-block pb-3 mb-10">
                  Get In Touch.
                </h1>
                <p className="text-xl text-gray-300 mb-12">TAKE A COFFEE & CHAT WITH ME</p>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Email Card */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-6 shadow-lg hover:shadow-pink-500/20 transition">
                    <div className="bg-purple-600 p-4 rounded-lg">
                      <img src="/email-icon.svg" alt="email" className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">EMAIL</h4>
                      <p className="text-lg font-semibold text-white">srv19.5060@gmail.com</p>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-6 shadow-lg hover:shadow-pink-500/20 transition">
                    <div className="bg-purple-600 p-4 rounded-lg">
                      <img src="/phone-icon.svg" alt="phone" className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">PHONE</h4>
                      <p className="text-lg font-semibold text-white">+91 8797975719</p>
                    </div>
                  </div>

                  <div className="md:col-span-2 w-full mt-6 flex justify-center">
                    <div className="w-full max-w-5xl p-8 bg-[#111827] border border-gray-700 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-pink-500/30">
                      <h2 className="text-2xl font-bold text-white mb-6 text-center">Let’s Work Together 🤝</h2>

                      <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
                          />
                          <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
                          />
                        </div>
                        <textarea
                          placeholder="Your Message..."
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 resize-none"
                        ></textarea>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-pink-500/30"
                          >
                            🚀 Send Message
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                 
                  <div className="md:col-span-2 w-full mt-6">
                    <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-pink-500/20 transition-all duration-500">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7096.97845623411!2d86.1554713!3d22.810377100000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1752263326250!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>







                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </motion.div>
  );



}
