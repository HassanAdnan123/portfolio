export const projects = [
  {
    id: 'tbaml',
    title: "Trade Based Anti-Money Laundering",
    content: "Helped local and international banks automate the process of screening trade transactions to detect Money Laundering and Fraud",
    technologies: [".NET", "Java Springboot", "Angular", "Oracle SQL"],
    technologyIcons: ["dotnet", "angular", "spring", "oracle"]
  },
  {
    id: 'emergency-response',
    title: "Emergency Response System (Web-App)",
    content: "Improved the response-time of monitoring devices on a healthcare application that provides emergency rescue to heart attack patients",
    technologies: ["Firebase", "Java Springboot", "Angular", "AWS MQTT"],
    technologyIcons: ["firebase", "angular", "aws"]
  },
  {
    id: 'employee-management',
    title: "Employee Management System",
    content: "Built the backend architecture and frontend of a HR Management System that is a one-stop solution for employers",
    technologies: ["Angular", "Java Springboot"],
    technologyIcons: ["angular", "spring", "postgres"]
  },
  {
    id: 'maallim-attendance',
    title: "Maallim Attendance Portal",
    content: "Developed an attendance management system for a local client which extracts attendance and converts to timetable-based data from biometric device.",
    technologies: ["Angular", "Firebase"],
    technologyIcons: ["angular", "firebase", "nodejs", "mysql"]
  }
];

export const blogs = [
  {
    id: 'microservices-blog',
    title: "Microservices: When and why they are used",
    linkToPost: "https://www.linkedin.com/posts/hassan-adnanpk_development-microservice-twitter-activity-6999265353289592832-OFUz?utm_source=share&utm_medium=member_desktop",
    content: "Working principle under the hood of microservices that make them so resilient in comparison to single-module based apps (Monoliths)",
    technologyIcons: ["spring"]
  },
  {
    id: 'javascript-eventloop',
    title: "Foundation of Javascript: Event Loop",
    linkToPost: "https://www.linkedin.com/posts/hassan-adnanpk_javascript-eventloop-singlethreaded-activity-6886600934038790144-M5Iz?utm_source=share&utm_medium=member_desktop",
    content: "An interesting piece of information about how javascript can handle multitasking despite of it being a single-threaded language.",
    technologyIcons: ["js"]
  }
];

export const socialHandles = [
  {
    id: 'linkedin',
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/hassan-adnanpk/",
    icon: 'linkedin'
  },
  {
    id: 'twitter',
    title: "Twitter",
    link: "https://twitter.com/luminous_diode",
    icon: 'twitter'
  },
  {
    id: 'github',
    title: "Github",
    link: "https://github.com/HassanAdnan123",
    icon: 'github'
  }
];

export const textContent = {
  feedbackCard: 'If you have an awesome idea, let\'s put my development skills and your creativity on the table and build a great application together! 🙌',
  socialsText: 'You can find me here as well:',
  sectionHeaders: {
    projects: "See what I've built..",
    blogs: "Also a tech writer.",
    contact: "Let's have ☕"
  }
};
