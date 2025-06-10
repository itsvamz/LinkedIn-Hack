require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const Job = require("../models/Job");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Application = require("../models/Application");
const Pitch = require("../models/Pitch");
const Avatar = require("../models/Avatar");
const connectDB = require("../config/db");

// Sample data for users
const users = [
  {
    email: "john@example.com",
    password: "password123",
    role: "user",
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    leetcode: "leetcode.com/johndoe",
    portfolio: "johndoe.dev",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "Express", "Redux", "GraphQL"],
    availability: "Available immediately",
    education: [
      {
        institution: "Stanford University",
        degree: "BS Computer Science",
        year: "2018-2022",
        gpa: "3.8"
      },
      {
        institution: "Stanford University",
        degree: "MS Computer Science",
        year: "2022-2023",
        gpa: "3.9"
      }
    ],
    experience: [
      {
        company: "Tech Startup",
        position: "Frontend Developer",
        duration: "2022-2023",
        description: "Developed responsive web applications using React and TypeScript. Implemented state management with Redux and integrated RESTful APIs."
      },
      {
        company: "Google",
        position: "Software Engineering Intern",
        duration: "Summer 2021",
        description: "Worked on the Google Maps team to improve performance of location-based features. Reduced load times by 30% through code optimization."
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
        description: "Built a full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment processing using Stripe."
      },
      {
        name: "Task Management App",
        tech: ["React Native", "Firebase", "Redux"],
        description: "Developed a cross-platform mobile app for task management with real-time updates, notifications, and team collaboration features."
      }
    ],
    profileViews: 145,
    profileClicks: 67,
    profileLikes: 23,
    profileBookmarks: 12,
    pitchViews: 89
  },
  {
    email: "jane@example.com",
    password: "password123",
    role: "user",
    fullName: "Jane Smith",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    linkedin: "linkedin.com/in/janesmith",
    github: "github.com/janesmith",
    leetcode: "leetcode.com/janesmith",
    portfolio: "janesmith.io",
    skills: ["Python", "Django", "Machine Learning", "SQL", "AWS", "TensorFlow", "Data Analysis", "Docker"],
    availability: "Available in 2 weeks",
    education: [
      {
        institution: "MIT",
        degree: "MS Computer Science",
        year: "2019-2021",
        gpa: "3.9"
      },
      {
        institution: "Cornell University",
        degree: "BS Computer Science",
        year: "2015-2019",
        gpa: "3.7"
      }
    ],
    experience: [
      {
        company: "Data Analytics Inc.",
        position: "Data Scientist",
        duration: "2021-2023",
        description: "Developed machine learning models for predictive analytics. Implemented data pipelines and visualization dashboards for business intelligence."
      },
      {
        company: "Amazon",
        position: "Machine Learning Engineer",
        duration: "2019-2021",
        description: "Worked on recommendation systems to improve product suggestions. Increased click-through rates by 15% through algorithm optimization."
      }
    ],
    projects: [
      {
        name: "Predictive Maintenance System",
        tech: ["Python", "TensorFlow", "AWS", "IoT"],
        description: "Built a system to predict equipment failures using machine learning models trained on sensor data from industrial equipment."
      },
      {
        name: "Natural Language Processing Tool",
        tech: ["Python", "NLTK", "SpaCy", "Transformers"],
        description: "Developed a tool for sentiment analysis and entity recognition in customer feedback data, improving response prioritization."
      }
    ],
    profileViews: 210,
    profileClicks: 95,
    profileLikes: 42,
    profileBookmarks: 18,
    pitchViews: 120
  },
  {
    email: "alex@example.com",
    password: "password123",
    role: "user",
    fullName: "Alex Johnson",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    leetcode: "leetcode.com/alexjohnson",
    portfolio: "alexjohnson.tech",
    skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "Docker", "AWS", "CI/CD", "JUnit"],
    availability: "Available in 1 month",
    education: [
      {
        institution: "University of Washington",
        degree: "BS Computer Science",
        year: "2016-2020",
        gpa: "3.6"
      }
    ],
    experience: [
      {
        company: "Microsoft",
        position: "Software Engineer",
        duration: "2020-2023",
        description: "Developed and maintained backend services for Microsoft Teams. Implemented scalable microservices architecture using Spring Boot and Kubernetes."
      },
      {
        company: "Amazon Web Services",
        position: "Cloud Solutions Intern",
        duration: "Summer 2019",
        description: "Assisted in developing cloud migration strategies for enterprise clients. Created automation scripts for infrastructure deployment."
      }
    ],
    projects: [
      {
        name: "Distributed Task Scheduler",
        tech: ["Java", "Spring Boot", "Redis", "Kubernetes"],
        description: "Built a distributed task scheduling system capable of handling millions of tasks with fault tolerance and load balancing."
      },
      {
        name: "DevOps Automation Platform",
        tech: ["Python", "Terraform", "AWS", "Jenkins"],
        description: "Created a platform to automate CI/CD pipelines, infrastructure provisioning, and monitoring for development teams."
      }
    ],
    profileViews: 178,
    profileClicks: 82,
    profileLikes: 31,
    profileBookmarks: 15,
    pitchViews: 95
  },
  {
    email: "priya@example.com",
    password: "password123",
    role: "user",
    fullName: "Priya Patel",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/priyapatel",
    github: "github.com/priyapatel",
    leetcode: "leetcode.com/priyapatel",
    portfolio: "priyapatel.dev",
    skills: ["React", "Vue.js", "Angular", "JavaScript", "CSS", "SASS", "UI/UX", "Figma"],
    availability: "Available immediately",
    education: [
      {
        institution: "University of Texas",
        degree: "BFA Design",
        year: "2017-2021",
        gpa: "3.9"
      },
      {
        institution: "Coding Bootcamp",
        degree: "Full Stack Web Development",
        year: "2021",
        gpa: "4.0"
      }
    ],
    experience: [
      {
        company: "Creative Agency",
        position: "UI/UX Developer",
        duration: "2021-2023",
        description: "Designed and implemented user interfaces for web and mobile applications. Collaborated with UX researchers to create intuitive user experiences."
      },
      {
        company: "Freelance",
        position: "Frontend Developer",
        duration: "2020-2021",
        description: "Developed responsive websites for small businesses and startups. Specialized in creating engaging, accessible user interfaces."
      }
    ],
    projects: [
      {
        name: "Design System Library",
        tech: ["React", "Storybook", "SASS", "Jest"],
        description: "Created a comprehensive component library and design system used across multiple products, ensuring consistent UI and reducing development time."
      },
      {
        name: "Interactive Data Visualization",
        tech: ["D3.js", "React", "SVG", "Canvas"],
        description: "Built interactive data visualizations for financial analytics platform, making complex data accessible through intuitive visual representations."
      }
    ],
    profileViews: 165,
    profileClicks: 78,
    profileLikes: 36,
    profileBookmarks: 14,
    pitchViews: 82
  },
  {
    email: "david@example.com",
    password: "password123",
    role: "user",
    fullName: "David Wilson",
    phone: "+1 (555) 567-8901",
    location: "Chicago, IL",
    linkedin: "linkedin.com/in/davidwilson",
    github: "github.com/davidwilson",
    leetcode: "leetcode.com/davidwilson",
    portfolio: "davidwilson.net",
    skills: ["C++", "C#", "Unity", "Game Development", "3D Modeling", "DirectX", "OpenGL", "Physics Simulation"],
    availability: "Available in 3 weeks",
    education: [
      {
        institution: "University of Illinois",
        degree: "BS Computer Science",
        year: "2015-2019",
        gpa: "3.5"
      },
      {
        institution: "DigiPen Institute of Technology",
        degree: "MS Computer Science in Real-Time Interactive Simulation",
        year: "2019-2021",
        gpa: "3.8"
      }
    ],
    experience: [
      {
        company: "Game Studio Inc.",
        position: "Game Developer",
        duration: "2021-2023",
        description: "Developed gameplay systems and optimized performance for mobile games. Implemented physics-based interactions and AI behavior systems."
      },
      {
        company: "VR Innovations",
        position: "Software Engineer",
        duration: "2019-2021",
        description: "Created virtual reality experiences using Unity and C#. Developed custom shaders and rendering pipelines for immersive environments."
      }
    ],
    projects: [
      {
        name: "Physics-Based Puzzle Game",
        tech: ["Unity", "C#", "Blender", "FMOD"],
        description: "Developed a puzzle game featuring realistic physics interactions, procedurally generated levels, and adaptive difficulty scaling."
      },
      {
        name: "Real-time Strategy Game Engine",
        tech: ["C++", "DirectX", "ECS Architecture", "Lua"],
        description: "Built a custom game engine optimized for real-time strategy games, supporting thousands of units with advanced pathfinding and AI."
      }
    ],
    profileViews: 132,
    profileClicks: 61,
    profileLikes: 27,
    profileBookmarks: 9,
    pitchViews: 73
  }
];

// Sample data for recruiters
const recruiters = [
  {
    email: "sarah@techcorp.com",
    password: "password123",
    role: "recruiter",
    fullName: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahjohnson",
    portfolio: "sarahjohnson-recruiter.com",
    company: "TechCorp Inc.",
    position: "Senior Technical Recruiter",
    industry: ["Software Development", "AI", "Cloud Computing", "Cybersecurity"],
    about: "Experienced technical recruiter specializing in software engineering roles with 8+ years of experience connecting top talent with innovative companies. Passionate about building diverse engineering teams.",
    profileViews: 245,
    responseRate: 92,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    avatarSettings: {
      hair: "long-straight",
      face: "oval",
      outfit: "professional",
      accessories: "glasses",
      background: "office",
      color: "blue"
    }
  },
  {
    email: "michael@designstudio.com",
    password: "password123",
    role: "recruiter",
    fullName: "Michael Chen",
    phone: "+1 (555) 876-5432",
    location: "New York, NY",
    linkedin: "linkedin.com/in/michaelchen",
    portfolio: "michaelchen-talent.com",
    company: "DesignStudio",
    position: "Creative Talent Acquisition",
    industry: ["UX/UI Design", "Graphic Design", "Product Design", "Creative Direction"],
    about: "Talent acquisition specialist focused on creative roles. Former designer with a keen eye for exceptional portfolios and a deep understanding of creative workflows and team dynamics.",
    profileViews: 187,
    responseRate: 88,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarSettings: {
      hair: "short",
      face: "round",
      outfit: "casual-smart",
      accessories: "none",
      background: "creative-studio",
      color: "teal"
    }
  },
  {
    email: "jennifer@techinnovators.com",
    password: "password123",
    role: "recruiter",
    fullName: "Jennifer Williams",
    phone: "+1 (555) 765-4321",
    location: "Boston, MA",
    linkedin: "linkedin.com/in/jenniferwilliams",
    portfolio: "jenniferwilliams-recruiting.com",
    company: "Tech Innovators",
    position: "Technical Recruiting Manager",
    industry: ["Fintech", "Healthtech", "Edtech", "Blockchain"],
    about: "Recruiting leader with expertise in emerging technologies. Specialized in building engineering teams for startups and scale-ups in regulated industries like finance and healthcare.",
    profileViews: 213,
    responseRate: 95,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    avatarSettings: {
      hair: "short-curly",
      face: "heart",
      outfit: "business",
      accessories: "earrings",
      background: "modern-office",
      color: "purple"
    }
  },
  {
    email: "robert@enterprisetech.com",
    password: "password123",
    role: "recruiter",
    fullName: "Robert Garcia",
    phone: "+1 (555) 654-3210",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/robertgarcia",
    portfolio: "robertgarcia-recruiting.net",
    company: "Enterprise Tech Solutions",
    position: "Senior Technical Recruiter",
    industry: ["Enterprise Software", "Cloud Infrastructure", "DevOps", "Data Engineering"],
    about: "Technical recruiter specializing in backend, infrastructure, and data engineering roles. Former systems administrator with deep technical knowledge and a network of top engineering talent.",
    profileViews: 176,
    responseRate: 87,
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    avatarSettings: {
      hair: "bald",
      face: "square",
      outfit: "business-casual",
      accessories: "watch",
      background: "tech-office",
      color: "green"
    }
  },
  {
    email: "lisa@startuptalent.com",
    password: "password123",
    role: "recruiter",
    fullName: "Lisa Thompson",
    phone: "+1 (555) 543-2109",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/lisathompson",
    portfolio: "lisathompson-recruiting.io",
    company: "Startup Talent Partners",
    position: "Founder & Lead Recruiter",
    industry: ["Startups", "SaaS", "Mobile Apps", "E-commerce"],
    about: "Founder of a boutique recruiting firm specializing in early-stage startups. Expert in helping founders build their initial technical teams and scaling engineering organizations through Series A and B.",
    profileViews: 231,
    responseRate: 93,
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    avatarSettings: {
      hair: "ponytail",
      face: "oval",
      outfit: "startup-casual",
      accessories: "necklace",
      background: "coworking-space",
      color: "coral"
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Recruiter.deleteMany({});
    await Job.deleteMany({});
    await Message.deleteMany({});
    await Conversation.deleteMany({});
    await Application.deleteMany({});
    await Pitch.deleteMany({});
    await Avatar.deleteMany({});
    
    console.log("Database cleared");
    
    // Create users
    const createdUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({
        ...user,
        password: hashedPassword
      });
      createdUsers.push(newUser);
    }
    
    console.log(`${createdUsers.length} users created`);
    
    // Create recruiters
    const createdRecruiters = [];
    for (const recruiter of recruiters) {
      const hashedPassword = await bcrypt.hash(recruiter.password, 10);
      const newRecruiter = await Recruiter.create({
        ...recruiter,
        password: hashedPassword
      });
      createdRecruiters.push(newRecruiter);
    }
    
    console.log(`${createdRecruiters.length} recruiters created`);
    
    // Create jobs
    const jobs = [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $150k",
        description: "We are looking for a senior frontend developer to join our team to build innovative web applications. The ideal candidate has deep expertise in React and modern JavaScript frameworks, with a passion for creating exceptional user experiences.",
        requirements: [
          "5+ years of experience with React",
          "Strong knowledge of TypeScript",
          "Experience with state management libraries (Redux, MobX, etc.)",
          "Proficiency in modern CSS and responsive design",
          "Understanding of web performance optimization",
          "Experience with testing frameworks (Jest, React Testing Library)"
        ],
        responsibilities: [
          "Develop and maintain high-quality React applications",
          "Collaborate with design and backend teams",
          "Optimize applications for maximum speed and scalability",
          "Implement responsive design and ensure cross-browser compatibility",
          "Participate in code reviews and mentor junior developers",
          "Stay up-to-date with emerging trends and technologies"
        ],
        skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS", "GraphQL", "Jest", "Webpack"],
        benefits: [
          "Competitive salary and equity",
          "Health, dental, and vision insurance",
          "401(k) matching",
          "Flexible work arrangements",
          "Professional development budget",
          "Unlimited PTO",
          "Home office stipend"
        ],
        status: "Active",
        postedBy: createdRecruiters[0]._id,
        views: 342,
        applications: 28
      },
      {
        title: "UX Designer",
        company: "DesignStudio",
        location: "Remote",
        type: "Contract",
        salary: "$80k - $100k",
        description: "Join our design team to create amazing user experiences for our clients in the e-commerce and fintech sectors. We're looking for a UX designer who can translate complex requirements into intuitive, accessible interfaces.",
        requirements: [
          "3+ years of UX design experience",
          "Proficiency in Figma and Adobe Creative Suite",
          "Portfolio demonstrating user-centered design process",
          "Experience conducting user research and usability testing",
          "Understanding of accessibility standards",
          "Excellent communication and presentation skills"
        ],
        responsibilities: [
          "Create wireframes, prototypes, and user flows",
          "Conduct user research and usability testing",
          "Collaborate with developers to implement designs",
          "Create and maintain design systems",
          "Present design concepts to clients and stakeholders",
          "Iterate designs based on user feedback and analytics"
        ],
        skills: ["Figma", "UI/UX", "Design Systems", "User Research", "Prototyping", "Information Architecture", "Accessibility", "Adobe XD"],
        benefits: [
          "Flexible hours",
          "Remote work",
          "Creative environment",
          "Professional development opportunities",
          "Collaborative team culture",
          "Project variety"
        ],
        status: "Active",
        postedBy: createdRecruiters[1]._id,
        views: 287,
        applications: 19
      },
      {
        title: "Full Stack Developer",
        company: "Tech Innovators",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$100k - $130k",
        description: "We're seeking a talented Full Stack Developer to join our growing team. You'll work on cutting-edge applications in the healthcare technology space, building features that help medical professionals deliver better patient care.",
        requirements: [
          "3+ years of full stack development experience",
          "Proficiency in React, Node.js, and Express",
          "Experience with SQL and NoSQL databases",
          "Understanding of RESTful APIs and microservices",
          "Knowledge of cloud services (AWS, Azure, or GCP)",
          "Familiarity with agile development methodologies"
        ],
        responsibilities: [
          "Develop end-to-end features across frontend and backend",
          "Design and implement database schemas and APIs",
          "Ensure application security and data privacy",
          "Collaborate with product managers and designers",
          "Participate in code reviews and technical planning",
          "Troubleshoot and debug production issues"
        ],
        skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"],
        benefits: [
          "Competitive salary",
          "Comprehensive health benefits",
          "Flexible work schedule",
          "Remote work options",
          "Continuing education allowance",
          "Gym membership",
          "Catered lunches"
        ],
        status: "Active",
        postedBy: createdRecruiters[2]._id,
        views: 312,
        applications: 24
      },
      {
        title: "DevOps Engineer",
        company: "Enterprise Tech Solutions",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110k - $140k",
        description: "We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines. The ideal candidate will have a strong background in cloud technologies and automation.",
        requirements: [
          "4+ years of experience in DevOps or SRE roles",
          "Strong knowledge of AWS or Azure cloud services",
          "Experience with infrastructure as code (Terraform, CloudFormation)",
          "Proficiency with containerization (Docker, Kubernetes)",
          "Understanding of CI/CD pipelines",
          "Scripting skills (Python, Bash)"
        ],
        responsibilities: [
          "Design and implement cloud infrastructure",
          "Automate deployment and scaling processes",
          "Monitor system performance and troubleshoot issues",
          "Implement security best practices",
          "Optimize resource utilization and costs",
          "Collaborate with development teams to improve delivery processes"
        ],
        skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins", "Python", "Linux", "Monitoring"],
        benefits: [
          "Competitive salary",
          "Health and retirement benefits",
          "Flexible work arrangements",
          "Professional certification support",
          "Home office stipend",
          "Regular team events",
          "Paid parental leave"
        ],
        status: "Active",
        postedBy: createdRecruiters[3]._id,
        views: 276,
        applications: 17
      },
      {
        title: "Mobile App Developer",
        company: "Startup Talent Partners",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$90k - $120k",
        description: "Join an exciting startup building the next generation of mobile fitness applications. We're looking for a talented mobile developer who can create engaging, performant experiences for iOS and Android platforms.",
        requirements: [
          "3+ years of mobile app development experience",
          "Proficiency in React Native or Flutter",
          "Experience with native development (Swift or Kotlin) a plus",
          "Understanding of mobile UI/UX best practices",
          "Knowledge of RESTful APIs and state management",
          "Experience with app store submission processes"
        ],
        responsibilities: [
          "Develop cross-platform mobile applications",
          "Implement responsive UI components and animations",
          "Integrate with backend services and APIs",
          "Optimize app performance and battery usage",
          "Fix bugs and improve application quality",
          "Collaborate with design and product teams"
        ],
        skills: ["React Native", "JavaScript", "TypeScript", "Redux", "iOS", "Android", "API Integration", "Firebase"],
        benefits: [
          "Competitive salary and equity",
          "Flexible work environment",
          "Health insurance",
          "Unlimited PTO",
          "Home office setup",
          "Professional development budget",
          "Wellness program"
        ],
        status: "Active",
        postedBy: createdRecruiters[4]._id,
        views: 298,
        applications: 22
      }
    ];
    
    const createdJobs = await Job.insertMany(jobs);
    console.log(`${createdJobs.length} jobs created`);
    
    // Create avatars for users and recruiters
    const avatars = [];
    
    // User avatars
    for (const user of createdUsers) {
      avatars.push({
        user: user._id,
        userModel: 'User',
        settings: {
          hair: ['short', 'long', 'curly', 'straight', 'bald'][Math.floor(Math.random() * 5)],
          face: ['round', 'oval', 'square', 'heart'][Math.floor(Math.random() * 4)],
          outfit: ['casual', 'business', 'creative', 'tech'][Math.floor(Math.random() * 4)],
          accessories: ['glasses', 'watch', 'none', 'earrings'][Math.floor(Math.random() * 4)],
          background: ['office', 'outdoor', 'gradient', 'tech'][Math.floor(Math.random() * 4)],
          color: ['blue', 'green', 'purple', 'orange', 'teal'][Math.floor(Math.random() * 5)]
        },
        imageUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      });
    }
    
    // Recruiter avatars
    for (const recruiter of createdRecruiters) {
      avatars.push({
        user: recruiter._id,
        userModel: 'Recruiter',
        settings: {
          hair: ['short', 'long', 'curly', 'straight', 'bald'][Math.floor(Math.random() * 5)],
          face: ['round', 'oval', 'square', 'heart'][Math.floor(Math.random() * 4)],
          outfit: ['business', 'professional', 'business-casual', 'smart'][Math.floor(Math.random() * 4)],
          accessories: ['glasses', 'watch', 'none', 'tie'][Math.floor(Math.random() * 4)],
          background: ['office', 'corporate', 'gradient', 'modern'][Math.floor(Math.random() * 4)],
          color: ['blue', 'navy', 'gray', 'maroon', 'teal'][Math.floor(Math.random() * 5)]
        },
        imageUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      });
    }
    
    const createdAvatars = await Avatar.insertMany(avatars);
    console.log(`${createdAvatars.length} avatars created`);
    
    // Create applications
    const applications = [];
    
    // Each user applies to 2-3 random jobs
    for (const user of createdUsers) {
      const numApplications = 2 + Math.floor(Math.random() * 2); // 2-3 applications
      const shuffledJobs = [...createdJobs].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(numApplications, shuffledJobs.length); i++) {
        const job = shuffledJobs[i];
        const statuses = ['Applied', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        applications.push({
          job: job._id,
          applicant: user._id,
          recruiter: job.postedBy,
          status: randomStatus,
          cv: `https://example.com/cv/${user._id}.pdf`,
          coverLetter: `I am excited to apply for the ${job.title} position at ${job.company}. With my experience in ${user.skills.slice(0, 3).join(', ')}, I believe I would be a great fit for this role.`,
          notes: randomStatus === 'Shortlisted' ? 'Strong candidate, schedule for interview' : 
                 randomStatus === 'Rejected' ? 'Not enough experience for this role' : 
                 'Reviewing qualifications',
          appliedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
        
        // Update job applications count
        await Job.findByIdAndUpdate(job._id, { $inc: { applications: 1 } });
      }
    }
    
    const createdApplications = await Application.insertMany(applications);
    console.log(`${createdApplications.length} applications created`);
    
    // Create pitches for users
    const pitches = [];
    
    for (const user of createdUsers) {
      pitches.push({
        user: user._id,
        content: `Hi, I'm ${user.fullName}, a ${user.skills[0]} developer with ${user.experience[0].duration} of experience. I specialize in ${user.skills.slice(0, 3).join(', ')}. I'm passionate about building ${user.projects[0].tech.includes('React') ? 'web applications' : user.projects[0].tech.includes('Python') ? 'data-driven solutions' : 'innovative software'}. I'm currently ${user.availability.toLowerCase()} and looking for opportunities in ${user.location}.`,
        videoUrl: `https://example.com/pitches/${user._id}.mp4`,
        views: Math.floor(Math.random() * 200) + 50,
        likes: Math.floor(Math.random() * 50) + 5
      });
    }
    
    const createdPitches = await Pitch.insertMany(pitches);
    console.log(`${createdPitches.length} pitches created`);
    
    // Create conversations and messages between recruiters and users
    const conversations = [];
    const messages = [];
    
    // Each recruiter has conversations with 2-3 users
    for (const recruiter of createdRecruiters) {
      const numConversations = 2 + Math.floor(Math.random() * 2); // 2-3 conversations
      const shuffledUsers = [...createdUsers].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < Math.min(numConversations, shuffledUsers.length); i++) {
        const user = shuffledUsers[i];
        
        // Create conversation
        const conversation = {
          participants: [
            { user: recruiter._id, userModel: 'Recruiter' },
            { user: user._id, userModel: 'User' }
          ],
          unreadCount: Math.floor(Math.random() * 5)
        };
        
        const createdConversation = await Conversation.create(conversation);
        conversations.push(createdConversation);
        
        // Create 3-7 messages for this conversation
        const numMessages = 3 + Math.floor(Math.random() * 5);
        const messageContents = [
          // Recruiter messages
          `Hi ${user.fullName}, I came across your profile and was impressed by your experience with ${user.skills[0]}. Would you be interested in discussing a ${createdJobs[0].title} role at ${createdJobs[0].company}?`,
          `The position offers ${createdJobs[0].salary} and includes benefits like ${createdJobs[0].benefits[0]} and ${createdJobs[0].benefits[1]}.`,
          `We're looking for someone with experience in ${createdJobs[0].skills.slice(0, 3).join(', ')}. Your background seems like a great fit.`,
          `Would you be available for an initial call next week to discuss the opportunity further?`,
          
          // User messages
          `Hi ${recruiter.fullName}, thanks for reaching out! I'm definitely interested in learning more about the role.`,
          `My experience includes ${user.experience[0].duration} at ${user.experience[0].company} where I worked with ${user.skills.slice(0, 3).join(', ')}.`,
          `The salary range and benefits sound good. I'm particularly interested in the ${createdJobs[0].type} nature of the role.`,
          `Yes, I'm available for a call next week. How about Tuesday or Wednesday afternoon?`,
          `Could you tell me more about the team I'd be working with and the current projects?`
        ];
        
        for (let j = 0; j < numMessages; j++) {
          const isRecruiterMessage = j % 2 === 0; // Alternate between recruiter and user
          const messageDate = new Date(Date.now() - (numMessages - j) * 24 * 60 * 60 * 1000); // Older to newer
          
          const message = {
            sender: isRecruiterMessage ? recruiter._id : user._id,
            senderModel: isRecruiterMessage ? 'Recruiter' : 'User',
            receiver: isRecruiterMessage ? user._id : recruiter._id,
            receiverModel: isRecruiterMessage ? 'User' : 'Recruiter',
            content: messageContents[j % messageContents.length],
            read: j < numMessages - conversation.unreadCount,
            createdAt: messageDate
          };
          
          const createdMessage = await Message.create(message);
          messages.push(createdMessage);
          
          // Update last message in conversation
          if (j === numMessages - 1) {
            await Conversation.findByIdAndUpdate(createdConversation._id, {
              lastMessage: createdMessage._id,
              updatedAt: messageDate
            });
          }
        }
      }
    }
    
    console.log(`${conversations.length} conversations created`);
    console.log(`${messages.length} messages created`);
    
    // Update recruiters with shortlisted and bookmarked candidates
    for (const recruiter of createdRecruiters) {
      const shuffledUsers = [...createdUsers].sort(() => 0.5 - Math.random());
      
      // Shortlist 1-3 candidates
      const shortlistedCount = 1 + Math.floor(Math.random() * 3);
      const shortlistedCandidates = shuffledUsers.slice(0, shortlistedCount).map(user => user._id);
      
      // Bookmark 2-4 candidates (can include shortlisted ones)
      const bookmarkedCount = 2 + Math.floor(Math.random() * 3);
      const bookmarkedCandidates = shuffledUsers.slice(0, bookmarkedCount).map(user => user._id);
      
      // Reject 1-2 candidates (different from shortlisted)
      const rejectedCount = 1 + Math.floor(Math.random() * 2);
      const rejectedCandidates = shuffledUsers.slice(shortlistedCount + bookmarkedCount, shortlistedCount + bookmarkedCount + rejectedCount).map(user => user._id);
      
      await Recruiter.findByIdAndUpdate(recruiter._id, {
        shortlistedCandidates,
        bookmarkedCandidates,
        rejectedCandidates
      });
    }
    
    console.log("Recruiters updated with candidate lists");
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();