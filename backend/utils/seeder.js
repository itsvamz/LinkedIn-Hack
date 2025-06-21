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
    email: "amit.verma@example.com",
    password: "amitSecure2024",
    role: "user",
    fullName: "Amit Verma",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra, India",
    avatar: "https://ik.imagekit.io/tpauozgxh/amit.png?updatedAt=1750491534480",
    linkedin: "linkedin.com/in/amitverma-autosys",
    github: "github.com/amitverma-dev",
    leetcode: "leetcode.com/amitverma",
    portfolio: "amitverma.tech",
    skills: ["Python", "CAPL", "CANalyzer", "Node.js", "Data Science"],
    education: [
      {
        institution: "Savitribai Phule Pune University",
        degree: "BE Electronics and Communication Engineering",
        year: "2009–2013",
        gpa: "3.7"
      },
      {
        institution: "ISTQB India Chapter",
        degree: "ISTQB Foundation Certification",
        year: "2014",
        gpa: "Pass"
      }
    ],
    experience: [
      {
        company: "Autotronix Solutions",
        position: "Senior Systems Engineer",
        duration: "2017–2023",
        description: "Led testing and validation for body control modules in passenger vehicles. Worked extensively on CANalyzer, test automation using Python, and issue tracking in JIRA."
      },
      {
        company: "Infocar Systems",
        position: "Embedded Systems Engineer",
        duration: "2013–2017",
        description: "Integrated hardware and software for real-time automotive systems. Supported in vehicle-level validation and diagnostics using CAN and LIN tools."
      }
    ],
    projects: [
      {
        name: "In-Vehicle CAN Communication Validator",
        tech: ["CANalyzer", "Python", "CAPL", "Excel VBA"],
        description: "Developed validation scripts to test in-vehicle communication scenarios and perform automated report generation for automotive ECUs."
      },
      {
        name: "HIL Testing Framework",
        tech: ["Python", "NI VeriStand", "Simulink", "dSPACE"],
        description: "Built Hardware-in-the-Loop setups for testing embedded control units under real-time simulation environments."
      }
    ],
    profileViews: 139,
    profileClicks: 67,
    profileLikes: 24,
    profileBookmarks: 10,
    pitchViews: 82,
    pitch: "Hi, I'm Amit Verma. I hold a Bachelor's degree in Electronics and Communication Engineering from Pune University, completed in 2013. I've worked as a Systems Engineer in the automotive domain for 9 years, focusing on embedded testing, hardware-software integration, and validation protocols. My key skills include CANalyzer, Python scripting, and real-time systems. I'm ISTQB Foundation certified and now keen to contribute to a technology-driven organization where precision engineering and quality assurance are core values.",
    video: "https://imagekit.io/player/embed/tpauozgxh/imagespeech-0-100_enhanced%20(1).mp4?updatedAt=1750483782541&thumbnail=https%3A%2F%2Fik.imagekit.io%2Ftpauozgxh%2Fimagespeech-0-100_enhanced%2520%281%29.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1750483782541&updatedAt=1750483782541"
  },
  {
    email: "shanti.priya@example.com",
    password: "qaPriya2024",
    role: "user",
    fullName: "Shanti Priya",
    phone: "+91 98111 22334",
    location: "New Delhi, India",
    avatar: "https://ik.imagekit.io/tpauozgxh/Shanti.png?updatedAt=1750491471824",
    linkedin: "linkedin.com/in/shantipriya-qa",
    github: "github.com/shantipriya",
    leetcode: "leetcode.com/shantipriya",
    portfolio: "shantipriya.dev",
    skills: ["Java", "Python", "Selenium", "JavaScript", "UI/UX"],
    education: [
      {
        institution: "University of Delhi",
        degree: "Bachelor of Computer Applications (BCA)",
        year: "2009–2012",
        gpa: "3.8"
      },
      {
        institution: "ISTQB India",
        degree: "ISTQB Foundation Certification",
        year: "2013",
        gpa: "Pass"
      }
    ],
    experience: [
      {
        company: "FinEdge Technologies",
        position: "Senior QA Analyst",
        duration: "2016–2024",
        description: "Led the QA team in functional and regression testing for high-traffic fintech platforms. Developed and maintained automation suites using Selenium and TestNG, managed test cases and bug lifecycle via JIRA."
      },
      {
        company: "Delta FinServ",
        position: "QA Analyst",
        duration: "2012–2016",
        description: "Performed manual and API testing for core banking applications. Collaborated closely with developers in Agile sprints and ensured timely defect reporting and resolution."
      }
    ],
    projects: [
      {
        name: "Automated Banking Regression Suite",
        tech: ["Selenium", "TestNG", "Java", "JIRA"],
        description: "Built a scalable automation framework to test key banking workflows across releases. Reduced manual testing effort by 60%."
      },
      {
        name: "Payment Gateway API Validator",
        tech: ["Postman", "REST Assured", "Python"],
        description: "Designed and executed automated API tests for payment gateway integration, covering edge cases, security scenarios, and failure recovery."
      }
    ],
    profileViews: 164,
    profileClicks: 73,
    profileLikes: 33,
    profileBookmarks: 13,
    pitchViews: 91,
    pitch: "Hi, I'm Shanti Priya. I hold a Bachelor's degree in Computer Applications from Delhi University, completed in 2012. I've worked as a QA Analyst in the fintech sector for over 10 years, specializing in end-to-end functional testing, regression suites, and automation scripting. My key skills include Selenium, JIRA, API testing, Agile methodology, and defect lifecycle management. I'm ISTQB certified and now eager to contribute to an innovative organization that values precision, speed, and continuous improvement in software delivery.",
    video: "https://imagekit.io/player/embed/tpauozgxh/imagespeech-0-100_full.mp4?updatedAt=1750483240176&thumbnail=https%3A%2F%2Fik.imagekit.io%2Ftpauozgxh%2Fimagespeech-0-100_full.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1750483240176&updatedAt=1750483240176"
  },
  {
    email: "kevin.lang@example.com",
    password: "secureLang2024",
    role: "user",
    fullName: "Kevin Lang",
    phone: "+1 (617) 555-2290",
    location: "Boston, MA",
    avatar: "https://ik.imagekit.io/tpauozgxh/processed_face(1).png?updatedAt=1750491346187",
    linkedin: "linkedin.com/in/kevin-lang-syseng",
    github: "github.com/kevinlang-dev",
    leetcode: "leetcode.com/kevinlang",
    portfolio: "kevinlang.tech",
    skills: ["Shell", "Python", "C", "React", "JavaScript"],
    education: [
      {
        institution: "Harvard University",
        degree: "BS Electronics and Communication Engineering",
        year: "2011–2015",
        gpa: "3.8"
      },
      {
        institution: "International Software Testing Qualifications Board",
        degree: "ISTQB Foundation Certification",
        year: "2016",
        gpa: "Pass"
      }
    ],
    experience: [
      {
        company: "NextSys Technologies",
        position: "Senior Systems Engineer",
        duration: "2018–2024",
        description: "Led embedded system validation and software integration for industrial control units. Developed validation protocols and automation scripts using shell and Python."
      },
      {
        company: "EdgeCore Embedded",
        position: "Systems Engineer",
        duration: "2015–2018",
        description: "Designed and tested embedded firmware for automotive microcontrollers. Worked on board bring-up and system-level diagnostics."
      }
    ],
    projects: [
      {
        name: "ECU Diagnostic Suite",
        tech: ["C", "CANoe", "Shell", "Python"],
        description: "Developed an in-house suite for automotive ECU testing covering diagnostics, bootloader, and protocol validation."
      },
      {
        name: "Embedded OS Integration",
        tech: ["Linux Kernel", "Bash", "Yocto", "GCC"],
        description: "Integrated and customized embedded Linux OS for custom boards used in smart automation systems."
      }
    ],
    profileViews: 128,
    profileClicks: 54,
    profileLikes: 21,
    profileBookmarks: 9,
    pitchViews: 73,
    pitch: "Hi, I'm Kevin Lang. I hold a Bachelor's degree in Electronics and Communication Engineering from Harvard University, completed in 2015. I've worked as a Systems Engineer in the system domain for 11 years, focusing on embedded testing, software integration, and validation protocols. My key skills include Shell scripting and Operating Systems. I'm ISTQB Foundation certified and now keen to contribute to a technology-driven organization.",
    video: "https://imagekit.io/player/embed/tpauozgxh/imagespeech-0-100_enhanced%20(3).mp4?updatedAt=1750489508088&thumbnail=https%3A%2F%2Fik.imagekit.io%2Ftpauozgxh%2Fimagespeech-0-100_enhanced%2520%283%29.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1750489508088&updatedAt=1750489508088"
  },
  {
    email: "linda.harris@example.com",
    password: "testqueen2024",
    role: "user",
    fullName: "Linda Harris",
    phone: "+44 7700 900456",
    location: "Birmingham, UK",
    avatar: "https://ik.imagekit.io/tpauozgxh/processed_face.png?updatedAt=1750490979817",
    linkedin: "linkedin.com/in/lindaharris-qe",
    github: "github.com/lindaharris",
    leetcode: "leetcode.com/lindaharris",
    portfolio: "lindaharris.dev",
    skills: ["Java", "Selenium", "Python", "React", "Data Science"],
    education: [
      {
        institution: "Nuneaton University",
        degree: "BSc Software Engineering",
        year: "2004–2008",
        gpa: "3.6"
      },
      {
        institution: "British Computer Society",
        degree: "ISEB Foundation in Software Testing",
        year: "2009",
        gpa: "Pass"
      }
    ],
    experience: [
      {
        company: "TeleComSoft Ltd.",
        position: "Senior Test Engineer",
        duration: "2008–2024",
        description: "Led acceptance and exploratory testing for B2B telecom systems. Collaborated with cross-functional teams using Agile practices to ensure software reliability and technical investigation of bugs in test environments."
      },
      {
        company: "QA AgileWorks",
        position: "Test Consultant (Contract)",
        duration: "2017–2018",
        description: "Advised on end-to-end test strategy for government IT systems, focusing on automation feasibility and improving test efficiency in sprint cycles."
      }
    ],
    projects: [
      {
        name: "Telecom Billing Verification Suite",
        tech: ["Python", "Selenium", "JIRA", "Postman"],
        description: "Built and maintained a test suite for telecom billing APIs. Enhanced test coverage and reduced regression time by 40%."
      },
      {
        name: "Agile Test Automation Framework",
        tech: ["Java", "TestNG", "Jenkins", "Docker"],
        description: "Designed a reusable automation framework integrated with CI/CD pipelines for frequent releases in a DevOps setup."
      }
    ],
    profileViews: 142,
    profileClicks: 61,
    profileLikes: 29,
    profileBookmarks: 11,
    pitchViews: 89,
    pitch: "Hi, I'm Linda Harris. I hold a Bachelor's degree in Software Engineering from Nuneaton University, completed in 2008. I've worked as a Test Engineer at an IT & Telecoms company for 16 years, handling the entire test process—from planning to execution and reporting. My key skills include acceptance testing, exploratory testing, technical investigation, Agile, and test environments. I'm ISEB certified and now looking to bring my expertise in software quality and testing to a forward-thinking organization.",
    video: "https://imagekit.io/player/embed/tpauozgxh/imagespeech-0-100_enhanced%20(2).mp4?updatedAt=1750485214841&thumbnail=https%3A%2F%2Fik.imagekit.io%2Ftpauozgxh%2Fimagespeech-0-100_enhanced%2520%282%29.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1750485214841&updatedAt=1750485214841"
  }
];


const recruiters = [
  {
    email: "priya.sharma@elephantventures.com",
    password: "password123",
    role: "recruiter",
    fullName: "Priya Sharma",
    phone: "+91 98765 12345",
    location: "Mumbai, Maharashtra, India",
    linkedin: "linkedin.com/in/priyasharma",
    portfolio: "priyasharma-recruiting.com",
    company: "Elephant Ventures",
    position: "Technical Recruiting Manager",
    industry: ["Fintech", "Healthtech", "Edtech", "Blockchain"],
    about: "Recruiting leader with expertise in emerging technologies. Specialized in building engineering teams for startups and scale-ups in regulated industries like finance and healthcare.",
    profileViews: 213,
    responseRate: 95,
    avatar: "https://ik.imagekit.io/tpauozgxh/priya-recruiter.png?updatedAt=1750491534480"
  },
  {
    email: "rajesh.kumar@techinnovators.com",
    password: "password123",
    role: "recruiter",
    fullName: "Rajesh Kumar",
    phone: "+91 99887 65432",
    location: "Bangalore, Karnataka, India",
    linkedin: "linkedin.com/in/rajeshkumar",
    portfolio: "rajeshkumar-recruiting.com",
    company: "Tech Innovators India",
    position: "Senior Technical Recruiter",
    industry: ["Software Development", "Cloud Computing", "DevOps", "AI/ML"],
    about: "Passionate technical recruiter with deep understanding of software engineering roles. Expert in identifying top talent for high-growth tech companies and innovative startups.",
    profileViews: 189,
    responseRate: 92,
    avatar: "https://ik.imagekit.io/tpauozgxh/rajesh-recruiter.png?updatedAt=1750491534480"
  },
  {
    email: "anita.patel@hireVue.com",
    password: "password123",
    role: "recruiter",
    fullName: "Anita Patel",
    phone: "+91 97654 32109",
    location: "Ahmedabad, Gujarat, India",
    linkedin: "linkedin.com/in/anitapatel",
    portfolio: "anitapatel-recruiting.com",
    company: "HireVue",
    position: "Lead Talent Acquisition Specialist",
    industry: ["QA Testing", "Automation", "Embedded Systems", "Automotive"],
    about: "Specialized in quality assurance and testing recruitment. Helping companies build robust QA teams with expertise in automation, manual testing, and embedded systems validation.",
    profileViews: 156,
    responseRate: 89,
    avatar: "https://ik.imagekit.io/tpauozgxh/anita-recruiter.png?updatedAt=1750491534480"
  },
  {
    email: "vikram.singh@cohere.com",
    password: "password123",
    role: "recruiter",
    fullName: "Vikram Singh",
    phone: "+91 98123 45678",
    location: "Gurgaon, Haryana, India",
    linkedin: "linkedin.com/in/vikramsingh",
    portfolio: "vikramsingh-recruiting.com",
    company: "Cohere",
    position: "Technical Recruiting Manager",
    industry: ["Systems Engineering", "Infrastructure", "Cybersecurity", "Networking"],
    about: "Expert in systems and infrastructure recruitment. Connecting talented engineers with companies building scalable, secure, and reliable technology platforms.",
    profileViews: 201,
    responseRate: 94,
    avatar: "https://ik.imagekit.io/tpauozgxh/vikram-recruiter.png?updatedAt=1750491534480"
  },
  {
    email: "meera.reddy@cred.com",
    password: "password123",
    role: "recruiter",
    fullName: "Meera Reddy",
    phone: "+91 94567 89012",
    location: "Hyderabad, Telangana, India",
    linkedin: "linkedin.com/in/meerareddy",
    portfolio: "meerareddy-recruiting.com",
    company: "CRED",
    position: "Senior Technical Recruiter",
    industry: ["Data Science", "Machine Learning", "Analytics", "Research"],
    about: "Data science and ML recruitment specialist. Passionate about connecting data professionals with cutting-edge companies working on AI, analytics, and research initiatives.",
    profileViews: 178,
    responseRate: 91,
    avatar: "https://ik.imagekit.io/tpauozgxh/meera-recruiter.png?updatedAt=1750491534480"
  }
];

module.exports = { users, recruiters };

// Update the pitches creation in the seedDatabase function
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
      },
      {
        title: "Backend Engineer",
        company: "FinTech Solutions",
        location: "Chicago, IL",
        type: "Full-time",
        salary: "$115k - $145k",
        description: "Join our backend team to build scalable financial services APIs and microservices. You'll be working on high-throughput systems that process millions of transactions daily.",
        requirements: [
          "4+ years of backend development experience",
          "Strong knowledge of Java or Kotlin",
          "Experience with Spring Boot framework",
          "Familiarity with relational databases and SQL",
          "Understanding of microservices architecture",
          "Knowledge of financial services a plus"
        ],
        responsibilities: [
          "Design and implement RESTful APIs",
          "Build scalable microservices",
          "Optimize database queries and performance",
          "Implement security best practices",
          "Write comprehensive unit and integration tests",
          "Participate in code reviews and architectural discussions"
        ],
        skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka", "Docker", "JUnit", "CI/CD"],
        benefits: [
          "Competitive salary",
          "Health and dental insurance",
          "401(k) with company match",
          "Flexible work arrangements",
          "Professional development budget",
          "Paid time off",
          "Parental leave"
        ],
        status: "Active",
        postedBy: createdRecruiters[0]._id,
        views: 289,
        applications: 21
      },
      {
        title: "Data Engineer",
        company: "Analytics Pro",
        location: "Remote",
        type: "Full-time",
        salary: "$125k - $155k",
        description: "We're looking for a Data Engineer to help build and maintain our data infrastructure. You'll work on ETL pipelines, data warehousing, and analytics platforms to enable data-driven decision making.",
        requirements: [
          "3+ years of data engineering experience",
          "Proficiency with Python and SQL",
          "Experience with data processing frameworks (Spark, Hadoop)",
          "Knowledge of cloud data services (AWS Redshift, Snowflake, BigQuery)",
          "Understanding of data modeling and warehouse design",
          "Familiarity with BI tools (Tableau, Power BI, Looker)"
        ],
        responsibilities: [
          "Design and implement ETL pipelines",
          "Build and maintain data warehouses",
          "Optimize data models for analytics",
          "Ensure data quality and integrity",
          "Collaborate with data scientists and analysts",
          "Implement data governance practices"
        ],
        skills: ["Python", "SQL", "Spark", "AWS", "Airflow", "Snowflake", "dbt", "Terraform"],
        benefits: [
          "Competitive salary",
          "Remote-first culture",
          "Health and wellness benefits",
          "Flexible working hours",
          "Learning and development stipend",
          "Home office allowance",
          "Regular team retreats"
        ],
        status: "Active",
        postedBy: createdRecruiters[1]._id,
        views: 267,
        applications: 19
      },
      {
        title: "Cloud Security Architect",
        company: "SecureCloud Inc.",
        location: "Washington, DC",
        type: "Full-time",
        salary: "$140k - $180k",
        description: "We're seeking a Cloud Security Architect to design and implement secure cloud infrastructure for government and enterprise clients. You'll be responsible for ensuring our cloud solutions meet the highest security standards.",
        requirements: [
          "5+ years of experience in cloud security",
          "AWS, Azure, or GCP security certifications",
          "Knowledge of security frameworks (NIST, ISO 27001)",
          "Experience with infrastructure as code",
          "Understanding of network security principles",
          "Background in security assessment and compliance"
        ],
        responsibilities: [
          "Design secure cloud architectures",
          "Implement security controls and guardrails",
          "Conduct security assessments and audits",
          "Develop security policies and procedures",
          "Respond to security incidents",
          "Advise on compliance requirements"
        ],
        skills: ["AWS", "Azure", "Security", "Terraform", "IAM", "Compliance", "SIEM", "Penetration Testing"],
        benefits: [
          "Top-tier compensation",
          "Comprehensive benefits package",
          "Security certification reimbursement",
          "Flexible work arrangements",
          "Professional development opportunities",
          "Paid time off",
          "Retirement plan with matching"
        ],
        status: "Active",
        postedBy: createdRecruiters[2]._id,
        views: 231,
        applications: 15
      },
      {
        title: "Machine Learning Engineer",
        company: "AI Innovations",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$130k - $170k",
        description: "Join our team of ML engineers building cutting-edge AI solutions for healthcare and life sciences. You'll work on developing and deploying machine learning models that help improve patient outcomes and accelerate drug discovery.",
        requirements: [
          "MS or PhD in Computer Science, Machine Learning, or related field",
          "3+ years of experience in applied machine learning",
          "Proficiency in Python and ML frameworks (TensorFlow, PyTorch)",
          "Experience with data processing and feature engineering",
          "Understanding of ML ops and model deployment",
          "Knowledge of healthcare data a plus"
        ],
        responsibilities: [
          "Develop and train machine learning models",
          "Process and analyze large datasets",
          "Implement ML pipelines for production",
          "Collaborate with data scientists and domain experts",
          "Evaluate and improve model performance",
          "Stay current with ML research and techniques"
        ],
        skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "MLOps", "Docker", "Kubernetes", "SQL"],
        benefits: [
          "Competitive salary and equity",
          "Health, dental, and vision insurance",
          "Flexible work arrangements",
          "Conference and education budget",
          "Gym membership",
          "Catered lunches",
          "Relocation assistance"
        ],
        status: "Active",
        postedBy: createdRecruiters[3]._id,
        views: 312,
        applications: 26
      },
      {
        title: "Product Designer",
        company: "User First Design",
        location: "Portland, OR",
        type: "Full-time",
        salary: "$95k - $125k",
        description: "We're looking for a Product Designer to join our team and help create beautiful, functional digital products. You'll work closely with product managers, engineers, and stakeholders to design user-centered experiences.",
        requirements: [
          "3+ years of product design experience",
          "Strong portfolio demonstrating UX/UI skills",
          "Proficiency in design tools (Figma, Sketch)",
          "Experience with design systems",
          "Understanding of user research methods",
          "Excellent communication skills"
        ],
        responsibilities: [
          "Create wireframes, prototypes, and high-fidelity designs",
          "Conduct user research and usability testing",
          "Develop and maintain design systems",
          "Collaborate with cross-functional teams",
          "Present design concepts to stakeholders",
          "Iterate based on feedback and data"
        ],
        skills: ["UI/UX", "Figma", "Design Systems", "Prototyping", "User Research", "Visual Design", "Interaction Design", "Accessibility"],
        benefits: [
          "Competitive salary",
          "Health and wellness benefits",
          "Flexible work schedule",
          "Remote work options",
          "Professional development budget",
          "Creative team environment",
          "Design conference stipend"
        ],
        status: "Active",
        postedBy: createdRecruiters[4]._id,
        views: 254,
        applications: 18
      },
      {
        title: "Blockchain Developer",
        company: "Web3 Ventures",
        location: "Miami, FL",
        type: "Full-time",
        salary: "$120k - $160k",
        description: "Join our blockchain team to build decentralized applications and smart contracts. You'll be working on cutting-edge Web3 technologies that are reshaping the future of finance and digital ownership.",
        requirements: [
          "2+ years of blockchain development experience",
          "Proficiency in Solidity and Ethereum development",
          "Experience with Web3.js or Ethers.js",
          "Understanding of DeFi protocols and NFTs",
          "Knowledge of blockchain security best practices",
          "Background in full-stack development a plus"
        ],
        responsibilities: [
          "Develop and audit smart contracts",
          "Build decentralized application frontends",
          "Integrate with blockchain networks and protocols",
          "Implement wallet connections and authentication",
          "Optimize gas usage and transaction costs",
          "Research and implement new blockchain technologies"
        ],
        skills: ["Solidity", "Ethereum", "Web3.js", "React", "Smart Contracts", "DeFi", "NFTs", "Hardhat"],
        benefits: [
          "Competitive salary and token incentives",
          "Flexible work location",
          "Health insurance",
          "Crypto conference budget",
          "Continuous learning opportunities",
          "Vibrant Web3 community",
          "Hackathon participation"
        ],
        status: "Active",
        postedBy: createdRecruiters[0]._id,
        views: 278,
        applications: 20
      }
    ];
    
    const createdJobs = await Job.insertMany(jobs);
    console.log(`${createdJobs.length} jobs created`);
    
    // Create avatars for users and recruiters
    const avatars = [];
    
    // Create a set to track used indices
    const usedIndices = new Set();
    
    // Function to get a unique random index
    const getUniqueIndex = () => {
      let index;
      do {
        index = Math.floor(Math.random() * 100);
      } while (usedIndices.has(index));
      usedIndices.add(index);
      return index;
    };
    
    // User avatars
    for (const user of createdUsers) {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const uniqueIndex = getUniqueIndex();
      
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
        imageUrl: `https://randomuser.me/api/portraits/${gender}/${uniqueIndex}.jpg`
      });
    }
    
    // Recruiter avatars
    for (const recruiter of createdRecruiters) {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const uniqueIndex = getUniqueIndex();
      
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
        imageUrl: `https://randomuser.me/api/portraits/${gender}/${uniqueIndex}.jpg`
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
  // Find the original user data to get the video URL
  const originalUserData = users.find(u => u.email === user.email);
  
  pitches.push({
    user: user._id,
    content: originalUserData.pitch || `Hi, I'm ${user.fullName}, a ${user.skills[0]} developer with ${user.experience[0].duration} of experience. I specialize in ${user.skills.slice(0, 3).join(', ')}. I'm passionate about building ${user.projects[0].tech.includes('React') ? 'web applications' : user.projects[0].tech.includes('Python') ? 'data-driven solutions' : 'innovative software'}. I'm currently ${user.availability.toLowerCase()} and looking for opportunities in ${user.location}.`,
    videoUrl: originalUserData.video || `https://example.com/pitches/${user._id}.mp4`,
    views: Math.floor(Math.random() * 200) + 50,
    likes: Math.floor(Math.random() * 50) + 5
  });
  await User.findByIdAndUpdate(user._id, {
    pitch: originalUserData.pitch,
    videoUrl: originalUserData.video
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