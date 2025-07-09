// Update the portfolio data with resume-style challenge descriptions
export const portfolioData = {
  personal: {
    name: "Vrushabh Vakhare",
    title: "ASIC Physical Design Engineer",
    description:
      "ASIC Design Expertise: Skilled in designing and optimizing integrated circuits, with proficiency in complex chip blocks, floor planning, power optimization, and timing closure. Proven ability to deliver high-quality designs on schedule, ensuring performance and manufacturability.",
  },

  about: {
    description:
      "ASIC Physical Design Engineer with 3+ years of experience in 5nm and 7nm nodes. Skilled in full-flow backend implementation from Netlist to GDSII, with expertise in floorplanning, CTS, routing, STA, and signoff. Focused on PPA optimization and delivering clean, tapeout-ready designs.",
    highlights: [
      "ASIC Design",
      "Power Planning",
      "Timing Closure",
      "5nm / 7nm",
      "RTL Collaboration",
      "Placement & Routing",
      "Clock Tree Synthesis (CTS)",
      "Static Timing Analysis (STA)",
      "High-Fanout Fixes",
    ],
  },

  education: {
    degree: "Bachelor's in Engineering - Power Electronics",
    institution: "Vishwakarma Government Engineering College",
    percentage: "8.3 CGPA",
    duration: "2017 - 2021",
    secondary: {
      degree: "Diploma in Engineering - Power Electronics",
      institution: "Dr. S & S.S. Ghandhy College",
      percentage: "9.4 CGPA",
      duration: "2014 - 2017",
    },
  },

  skills: {
    technical: ["ASIC Physical Design", "Synopsys ICC2", "Synopsys Fusion Compiler", "Static Timing Analysis"],
    soft: [
      "Team Collaboration",
      "Problem Solving",
      "Continuous Learning",
      "Project Management",
      "Communication",
      "Dedication",
    ],
    languages: ["English", "Hindi", "Gujarati"],
    certifications: ["VLSI Training - Physical Design - eInfochips Training & Research Academy Ltd"],
  },

  experience: {
    internships: [
      {
        title: "Senior Physical Design Engineer",
        company: "Marvell Technology",
        duration: "Sep 2024 - Present",
      },
      {
        title: "Senior Physical Design Engineer",
        company: "Einfochips (An Arrow Company)",
        duration: "July 2024 – Sep 2024",
      },
      {
        title: "Physical Design Engineer Trainee",
        company: "Einfochips (An Arrow Company)",
        duration: "Jan 2021 – July 2024",
      },
    ],
    hackathons: [
      "Core Value Award for Continuous Learning",
      "Best Team of the Year Award",
      "Publication: Power Analysis in 7nm Technology Node (2023)",
    ],
  },

  projects: [
    {
      name: "Networking Chip (DPU) - 7nm TSMC,16 Metal Layers",
      description:
        "High-performance networking chip design using 7nm TSMC technology with 16 metal layers. Handled multimillion instance count with focus on timing, congestion, and memory-dominant blocks.",
      detailedDescription:
        "Led the physical design implementation of a high-performance Data Processing Unit (DPU) networking chip using cutting-edge 7nm TSMC process technology. This project involved managing complex design challenges including multimillion instance counts, advanced memory architectures, and stringent timing requirements. The chip featured 16 metal layers and required sophisticated power planning and clock tree synthesis to achieve target performance metrics.",
      technologies: [
        "7nm TSMC",
        "ICC2 Compiler",
        "Synopsys Prime-Time",
        "Calibre",
        "16 Metal Layers",
        "TCL Scripting",
        "Perl",
        "Linux",
      ],
      MaxClockFreq: "~1.2 GHz",
      // Resume-style project data
      resumeData: {
        technology: "7nm TSMC, 16 Metal Layers",
        role: "Physical Design and Signoff",
        complexity: "Multimillion Instance count, Timing, Congestion, Memory dominant blocks",
        maxFreq: "~1.2 GHz",
        tools: "ICC2 Compiler, Calibre, Synopsys Prime-Time",
        responsibilities: [
          "Responsible and handling 3 blocks along with channel block activities from Netlist to GDSII with flow enhancement and block closure.",
          "Netlist checks, Floorplan, Placement & optimization, Clock Tree Synthesis, Routing and optimization, extraction, Static Timing Analysis and closure, Formal verification, Physical verification, flow, and script improvements.",
          "Checking timing, and congestion and resolved the overflow and timing issue.",
          "Running signoff flow and fixing the timing, antenna, EM, IR, DRC, LVS, LEC.",
        ],
        challenges: [
          "Efficiently managed the placement of 180-200 macros in high-density blocks, strategically positioning memory banks to optimize for signal fan-in and fan-out requirements.",
          "Identified and resolved an issue with a high fanout register in the netlist, which was affecting 30% of the logic. This was accomplished based on feedback provided to the RTL design team, resulting in a 15% improvement in overall Timing.",
          "Nail Down critical design timing operating at a frequency of 2 GHz within a 7.5-track cell height.",
        ],
        achievements: [
          { metric: "15%", label: "Timing Improvement" },
          { metric: "200+", label: "Macros Managed" },
          { metric: "2 GHz", label: "Critical Timing" },
        ],
      },
    },
    {
      name: "Networking Chip (DPU) - 5nm TSMC,18 Metal Layers",
      description:
        "Led physical design and signoff activities for High-Performance Computing ASICs using cutting-edge 5nm TSMC process technology with 18 metal layers.",
      detailedDescription:
        "Spearheaded the physical design implementation of an advanced 5nm TSMC networking chip, representing the pinnacle of semiconductor technology. This project involved managing six complex blocks with stringent performance requirements, advanced process challenges, and cutting-edge EDA tool flows. The design leveraged 18 metal layers and required innovative solutions for power delivery, thermal management, and signal integrity in the most advanced process node available.",
      technologies: [
        "5nm TSMC",
        "Fusion Compiler",
        "Synopsys Primetime",
        "Calibre",
        "18 Metal Layers",
        "Advanced Node DFM",
        "Machine Learning Optimization",
      ],
      MaxClockFreq: "~1.2 GHz",
      // Resume-style project data
      resumeData: {
        technology: "5nm TSMC, 18 Metal Layers",
        role: "Physical Design and Signoff",
        complexity: "Advanced node challenges, Multi-domain clocking, High-density placement",
        maxFreq: "~1.2 GHz",
        tools: "Fusion Compiler, Calibre, Synopsys Primetime",
        responsibilities: [
          "Led physical design and signoff activities for High-Performance Computing ASICs, utilizing cutting-edge 5nm TSMC process technology with 18 metal layers.",
          "Oversaw the complete design flow for six blocks, from Netlist to GDSII implementation.",
          "Worked on a high-performance design with a focus on maximizing clock frequency, achieving a maximum frequency of approximately 1.2 GHz.",
          "Netlist checks, Floorplan, Placement & optimization, Clock Tree Synthesis, Routing and optimization, Extraction, Static Timing Analysis and closure, Formal verification, Physical verification, Flow, and script improvements",
          "Implemented rigorous DRC and congestion management strategies to meet stringent design requirements.",
          "Collaborated with methodology experts to adapt the 7nm Prime-Time/Star-RC flow to the 5nm process.",
          "Collaborated closely with a team of 5 designers to meet interface timing, achieving this goal 20% earlier than usual in the Place and Route (PNR) phase.",
        ],
        achievements: [
          { metric: "1.2 GHz", label: "Target Frequency" },
          { metric: "20%", label: "Early Timing Closure" },
          { metric: "6", label: "Blocks Completed" },
        ],
      },
    },
  ],

  contact: {
    email: "Vrushabhvakhare22@gmail.com",
    phone: "+91 7383975075",
    location: "Surat, Gujarat, India 394210",
    linkedin: "https://www.linkedin.com/in/vrushabh-vakhare-79081a18b/",
  },
}
