import Image from "next/image";
import cutout from "@/assets/cutout.png";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb, SiPostgresql, SiTypescript } from "react-icons/si";

const orbitSkills = [
  {
    label: "React",
    icon: FaReact, 
    offset: 8,
    duration: "24s",
    iconClassName: "border-sky-400 text-sky-500",
  },
  {
    label: "Next.js",
    offset: 24,
    icon:RiNextjsFill,
    duration: "24s",
    iconClassName: "border-zinc-900 text-zinc-950",
  },
  {
    label: "Node",
    offset: 40,
    icon: FaNodeJs,
    duration: "24s",
    iconClassName: "border-green-500 text-green-600",
  },
  {
    label: "TypeScript",
    offset: 56,
    icon: SiTypescript,
    duration: "24s",
    iconClassName: "bg-blue-500 border-blue-500 text-blue-600",
  },
  {
    label: "MongoDB",
    offset: 72,
    icon: SiMongodb,
    duration: "24s",
    iconClassName: "border-emerald-500 text-emerald-600",
  },
  {
    label: "PostgreSQL",
    offset: 88,
    icon: SiPostgresql,
    duration: "24s",
    iconClassName: "border-white bg-white text-indigo-600",
  },
];

export default function PhotoSection() {
  return (
    <div className="relative flex items-start justify-center w-full h-screen">
      <div className="absolute right-0 top-0 text-[18rem] font-bold text-black/5 select-none">
        02
      </div>
      {/* <svg
        className="absolute left-28 2xl:left-48 top-[100px] 2xl:top-[150px] w-[390px] h-[320px] z-20 pointer-events-none"
        viewBox="0 0 900 320"
        fill="none"
      >
        <path
          d="
            M50 240
            C20 120, 180 90, 300 150
            C420 210, 600 210, 760 150
            C840 120, 900 110, 880 180
            C860 240, 800 260, 760 280
            "
          stroke="#d81b60"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg> */}

      <div className="relative  h-[540px] w-full overflow-visible">
        <div className="absolute left-1/2 top-0 z-20 h-[540px] w-[640px] max-w-none -translate-x-1/2">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 640 540"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M42 394 C122 504 368 468 520 302 C664 146 558 30 370 44 C178 58 -28 210 20 338 C26 358 30 378 42 394Z"
              stroke="#be185d"
              strokeDasharray="8 10"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
          </svg>
        </div>
        <div
          className="absolute left-1/2 top-[46%] z-0 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/35 blur-3xl"
          aria-hidden="true"
        />
        {/* <div
          className="absolute right-[18%] top-[38%] z-20 flex h-12 w-12 items-center justify-center rounded-full bg-pink-700 text-2xl text-amber-100 shadow-[0_0_34px_rgba(190,24,93,0.5)]"
          aria-hidden="true"
        >
          +
        </div> */}

        <div className="absolute left-1/2 top-0 z-20 h-[540px] w-[640px] max-w-none -translate-x-1/2">
          {orbitSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.label}
                className="orbit-skill absolute left-0 top-0"
                style={{
                  animationDelay: `-${(skill.offset / 100) * 24}s`,
                  animationDuration: skill.duration,
                }}
              >
                <div
                  className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[11px] font-bold text-[#242423] shadow-[0_14px_30px_rgba(36,36,35,0.12)] backdrop-blur"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white text-[9px] ${skill.iconClassName}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {skill.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <div className="relative h-[450px] w-[320px] overflow-hidden rounded-t-[260px] bg-neutral-200 2xl:h-[500px]">
            <Image
              src={cutout}
              alt="Profile"
              fill
              className="object-cover grayscale contrast-110"
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black/70 to-transparent"
            />
          </div>
        </div>

        <div className="absolute left-[65%] top-[65%] z-40 -translate-x-1/2 translate-y-1/2">
          <div className="flex h-[120px] w-[170px] items-center justify-center rounded-[58%_42%_35%_65%/50%_30%_70%_50%] bg-pink-700 text-white ">
            <div className="text-center">
              <div className="text-3xl font-semibold">3+</div>
              <p className="text-[10px] tracking-[0.18em] uppercase">
                Experience
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 h-[450px] w-[320px] overflow-hidden rounded-t-[260px] bg-neutral-200 pointer-events-none 2xl:h-[500px] [clip-path:inset(0_0_44%_0)]"
          aria-hidden="true"
        >
          <Image
            src={cutout}
            alt=""
            fill
            className="object-cover grayscale contrast-110"
          />
        </div>
      </div>
    </div>
  );
}