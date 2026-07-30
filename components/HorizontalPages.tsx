"use client";

import Lenis from "lenis";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profile from "@/assets/profile3.png";
import { MoveRight } from "lucide-react";
import PhotoSection from "./PhotoSection";

const projects = [
  {
    number: "01",
    title: "Portfolio System",
    type: "Frontend",
    description: "A motion-led personal portfolio with horizontal pages, custom sections, and tactile interactions.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    number: "02",
    title: "Creative Loader",
    type: "Animation",
    description: "A playful scrambled-letter loader that settles into a polished reveal sequence.",
    tags: ["GSAP", "JavaScript", "CSS"],
  },
  {
    number: "03",
    title: "Photo Experience",
    type: "Interface",
    description: "A visual section built around layered imagery, responsive composition, and smooth scroll rhythm.",
    tags: ["React", "Design", "Motion"],
  },
  {
    number: "04",
    title: "Fullstack Build",
    type: "Product",
    description: "A complete app-style project combining frontend polish with backend structure and data flow.",
    tags: ["Fullstack", "API", "UI"],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function HorizontalPages() {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [projectProgress, setProjectProgress] = useState(0);
  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);
  const firstTrailX = useSpring(photoX, { stiffness: 160, damping: 22 });
  const firstTrailY = useSpring(photoY, { stiffness: 160, damping: 22 });
  const secondTrailX = useSpring(photoX, { stiffness: 90, damping: 20 });
  const secondTrailY = useSpring(photoY, { stiffness: 90, damping: 20 });
  const firstTrailOffsetX = useTransform(firstTrailX, (value) => value + 12);
  const firstTrailOffsetY = useTransform(firstTrailY, (value) => value + 12);
  const secondTrailOffsetX = useTransform(secondTrailX, (value) => value + 24);
  const secondTrailOffsetY = useTransform(secondTrailY, (value) => value + 24);

  const showDragCursor = () => {
    document.body.classList.add("photo-drag-hover");
  };

  const hideDragCursor = () => {
    document.body.classList.remove("photo-drag-hover");
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;

    if (!scroller || !content) {
      return;
    }

    let lenis: Lenis | null = null;
    let animationFrame = 0;

    const destroyLenis = () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      cancelAnimationFrame(animationFrame);
    };

    const createLenis = () => {
      destroyLenis();

      lenis = new Lenis({
        wrapper: scroller,
        content,
        orientation: "horizontal",
        gestureOrientation: "both",
        smoothWheel: true,
        lerp: 0.08,
        wheelMultiplier: 1.1,
      });

      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time);
        }
        animationFrame = requestAnimationFrame(raf);
      };

      animationFrame = requestAnimationFrame(raf);
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (mediaQuery.matches) {
      createLenis();
    } else {
      destroyLenis();
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        createLenis();
      } else {
        destroyLenis();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      mediaQuery.removeEventListener("change", handleChange);
      if (lenis) {
        lenis.destroy();
      }
      hideDragCursor();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const projectSection = projectsRef.current;

    if (!scroller || !projectSection) {
      return;
    }

    let frame = 0;

    const updateProjectProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);

        if (!desktop) {
          setProjectProgress(1);
          return;
        }

        const start = projectSection.offsetLeft;
        const travel = projectSection.offsetWidth - scroller.clientWidth;

        if (travel <= 0) {
          setProjectProgress(0);
          return;
        }

        setProjectProgress(clamp((scroller.scrollLeft - start) / travel, 0, 1));
      });
    };

    updateProjectProgress();
    scroller.addEventListener("scroll", updateProjectProgress, { passive: true });
    window.addEventListener("resize", updateProjectProgress);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateProjectProgress);
      window.removeEventListener("resize", updateProjectProgress);
    };
  }, []);

  return (
    <main
      ref={scrollerRef}
      className="h-screen overflow-y-auto overflow-x-hidden touch-pan-y lg:h-[calc(100vh-72px)] lg:overflow-x-auto lg:overflow-y-hidden lg:touch-pan-x overscroll-contain bg-background"
    >
      <div ref={contentRef} className="flex flex-col lg:flex-row h-full">
        <section
          ref={introRef}
          className="relative flex min-h-[calc(100vh-72px)]  lg:h-full w-full lg:w-screen shrink-0 items-center justify-between gap-10 bg-background px-[8%] py-12 text-[#242423]"
        >
          <div className="w-full h-full  ">
           <div className="absolute right-[10%] top-10 [font-family:var(--font-montreal)] text-sm uppercase">
              01 /
            </div>
            <div className=' flex flex-col lg:flex-row gap-10  h-full w-full lg:mt-5 2xl:mt-20 mt-10 '>
               <div className='lg:w-[50%] w-full flex flex-col gap-10 '>
               <h1 className="[font-family:var(--font-amelaryas)]  text-[clamp(15px,10vw,50px)] 2xl:text-[clamp(20px,10vw,80px)] leading-[1.5] font-bold capitalize">
                Build <br/> Experiences
            </h1>

            <div className="relative h-[250px] w-full md:h-[350px] lg:h-[clamp(100px,25vw,250px)] lg:w-[clamp(200px,50vw,600px)]">
              <motion.div
                style={{ x: secondTrailOffsetX, y: secondTrailOffsetY }}
                animate={{ opacity: isDragging ? 0.2 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute inset-0 z-0 overflow-hidden blur-[1px]"
              >
                <Image
                  src={profile}
                  alt=""
                  fill
                  draggable={false}
                  aria-hidden="true"
                  className="pointer-events-none object-cover grayscale"
                />
              </motion.div>

              <motion.div
                style={{ x: firstTrailOffsetX, y: firstTrailOffsetY }}
                animate={{ opacity: isDragging ? 0.35 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute inset-0 z-10 overflow-hidden"
              >
                <Image
                  src={profile}
                  alt=""
                  fill
                  draggable={false}
                  aria-hidden="true"
                  className="pointer-events-none object-cover"
                />
              </motion.div>

              <motion.div
                drag
                dragConstraints={introRef}
                dragElastic={0.14}
                dragMomentum
                dragTransition={{
                  power: 0.18,
                  timeConstant: 220,
                  bounceStiffness: 360,
                  bounceDamping: 28,
                }}
                style={{ x: photoX, y: photoY }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                whileDrag={{ scale: 1.03 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onMouseEnter={showDragCursor}
                onMouseLeave={hideDragCursor}
                onPointerDown={showDragCursor}
                onPointerUp={hideDragCursor}
                onPointerCancel={() => {
                  hideDragCursor();
                  setIsDragging(false);
                }}
                className="absolute inset-0 z-20 touch-none select-none overflow-hidden"
              >
                <Image
                  src={profile}
                  alt="Nandini Das"
                  fill
                  priority
                  draggable={false}
                  className="pointer-events-none object-cover"
                />
              </motion.div>
            </div>

         
            </div>


            <div className="lg:w-[50%] w-full flex flex-col justify-start items-end lg:gap-20 gap-10">
              <div>
             <h1 className=" text-[clamp(15px,10vw,70px)] 2xl:text-[clamp(20px,10vw,90px)] leading-[1.1] text-right capitalize font-light  ">
              Build <br />

              <span className="relative inline-block font-serif font-medium">
                things

                <motion.svg
                  className="absolute inset-0 w-[130%] h-[170%] -left-[15%] -top-[30%] pointer-events-none"
                  viewBox="0 0 300 120"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 2,
                    duration: 0.01,
                  }}
                >
                  <motion.path
                    d="
                    M10 30
                    C30 5, 255 5, 280 50
                    C295 90, 235 115, 70 105
                    C10 100, 0 30, 25 20

                    C150 20, 245 15, 270 55
                    C285 85, 220 100, 85 92
                    C35 88, 18 72, 25 55
                    "
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 2,
                      duration: 1.4,
                      ease: "linear",
                    }}
                  />
                </motion.svg>
              </span>

              <br />
              that matters.
            </h1>
              </div>
               <div className="flex items-start gap-20">
                 <div className="flex items-center justify-center"><MoveRight size={50} /></div>
              <p className="max-w-[540px] [font-family:var(--font-amelaryas)] text-lg leading-8 font-semibold text-left">
              I Based In <br/> Bhubaneswar City, <br/> Passionate frontend developer.

              </p>
             
             </div>
              </div>
           
            </div>
           
          </div>

          
        </section>

        <section className="relative flex min-h-[calc(100vh-72px)] lg:h-full w-full lg:w-screen shrink-0 items-center  px-[8%] py-12 ">
           <div className="w-full h-full ">
          <div className="absolute right-[8%] top-12 [font-family:var(--font-montreal)] text-sm uppercase">
            02 / 
          </div>

          <div className=" flex flex-col lg:flex-row  h-full w-full ">
            <div className="w-full lg:w-1/2">
           <h1 className="[font-family:var(--font-amelaryas)] text-[clamp(10px,10vw,50px)] 2xl:text-[clamp(20px,10vw,70px)] leading-[1.6] font-bold capitalize">
              Build <br />
              Backend <br />
              Frontend <br />

            <span className="relative inline-block text-pink-800">
            Fullstack.

            <svg
              className="absolute left-0 top-[92%] w-[105%] h-[35px] pointer-events-none"
              viewBox="0 0 320 40"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Main stroke */}
              <path
                d="
                  M1 50
                  C20 20, 110 30, 180 20
                  C240 20, 280 18, 300 20
                "
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.95"
              />

              {/* Second imperfect pass */}
              <path
                d="
                  M0 38
                  C70 20, 150 35, 190 24
                  C250 25, 285 22, 310 15
                "
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </span>
            </h1>
            <div className="mt-10 flex justify-end">
               
            </div>
           
            </div>
            <div className="w-full lg:w-1/2">
              <PhotoSection />
            </div>           
          </div>
          </div>
        </section>

        <section
          ref={projectsRef}
          className="relative min-h-[calc(100vh-72px)] w-full shrink-0 text-[#333533] lg:h-full lg:w-[400vw]"
        >
          <div className="relative flex min-h-[calc(100vh-72px)] w-full shrink-0 items-center overflow-hidden px-[8%] py-14 lg:sticky lg:left-0 lg:top-0 lg:h-full lg:min-h-0 lg:w-screen">
            <div className="absolute right-[10%] top-10 [font-family:var(--font-montreal)] text-sm uppercase">
              03 /
            </div>

            <div className="absolute left-[8%] top-16 hidden h-[42vh] w-[28vw] min-w-[260px] border border-[#333533] md:block">
              <div className="absolute -bottom-8 -right-8 h-full w-full border border-[#333533]" />
            </div>

            <div className="relative z-10 flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[420px]">
                <p className="[font-family:var(--font-montreal)] text-xs uppercase tracking-[0.2em]">
                  Selected work
                </p>
                <h2 className="mt-5 [font-family:var(--font-amelaryas)] text-[clamp(42px,8vw,96px)] leading-[0.95] capitalize">
                  Floating
                  <br />
                  project
                  <br />
                  deck.
                </h2>
              </div>

              <div className="relative flex w-full max-w-[680px] flex-col gap-5 lg:block lg:h-[520px]">
                {projects.map((project, index) => {
                  const revealStart = index === 0 ? 0 : (index - 1) / (projects.length - 1);
                  const reveal = !isDesktop || index === 0 ? 1 : clamp((projectProgress - revealStart) * 3.2, 0, 1);
                  const lift = isDesktop && index !== 0 ? (1 - reveal) * 150 : 0;
                  const stackOffset = isDesktop ? index * 14 : 0;
                  const scale = isDesktop ? 1 - (projects.length - index - 1) * 0.025 + reveal * 0.025 : 1;

                  return (
                    <motion.article
                      key={project.title}
                      style={{
                        y: lift - stackOffset,
                        scale,
                        opacity: index === 0 ? 1 : reveal,
                        zIndex: index + 1,
                      }}
                      transition={{ type: "spring", stiffness: 180, damping: 24 }}
                      className="relative flex min-h-[350px] w-full flex-col justify-between border border-[#333533] bg-[#e8eddf] p-6 shadow-[18px_18px_0_rgba(51,53,51,0.16)] md:min-h-[390px] md:p-8 lg:absolute lg:bottom-0 lg:right-0 lg:h-[420px] lg:min-h-0 lg:w-[620px]"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <span className="[font-family:var(--font-montreal)] text-sm uppercase">
                          {project.number}
                        </span>
                        <span className="border border-[#333533] px-3 py-1 [font-family:var(--font-montreal)] text-xs uppercase">
                          {project.type}
                        </span>
                      </div>

                      <div>
                        <h3 className="[font-family:var(--font-amelaryas)] text-[clamp(34px,6vw,72px)] leading-none">
                          {project.title}
                        </h3>
                        <p className="mt-5 max-w-[460px] text-base leading-7 md:text-lg">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[#333533]/50 px-3 py-1 text-xs uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

  
      </div>
    </main>
  );
}
