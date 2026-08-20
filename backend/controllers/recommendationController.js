/**
 * Recommendation Controller
 * Handles job recommendation and skill analysis requests
 */

const SkillMatcher = require('../utils/skillMatcher');
const MarketData = require('../utils/marketData');

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Bindu",
    email: "sbindu414@gmail.com",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 75 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 70 },
      { name: "HTML/CSS", level: 95 },
      { name: "MongoDB", level: 60 },
      { name: "Java", level: 45 },
      { name: "SQL", level: 0 }
    ],
    experience: "1-3 years",
    location: "Bangalore, Karnataka"
  }
];

// Mock job data for demonstration
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Solutions",
    description: "We are looking for an experienced frontend developer with strong React skills to join our team.",
    requiredSkills: ["JavaScript", "React", "HTML/CSS", "Node.js"],
    location: "Bangalore, Karnataka",
    salary: "₹18L - ₹25L",
    postedDate: "2025-11-20"
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateX Pvt Ltd",
    description: "Join our dynamic team to build innovative web applications using modern technologies.",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
    location: "Mumbai, Maharashtra",
    salary: "₹15L - ₹22L",
    postedDate: "2025-11-18"
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "DataSystems India",
    description: "Develop scalable backend services and APIs for our enterprise clients.",
    requiredSkills: ["Java", "SQL", "MongoDB", "Python"],
    location: "Hyderabad, Telangana",
    salary: "₹12L - ₹18L",
    postedDate: "2025-11-15"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AnalyticsPro India",
    description: "Apply machine learning and statistical analysis to solve complex business problems.",
    requiredSkills: ["Python", "SQL", "Machine Learning", "Statistics"],
    location: "Remote",
    salary: "₹20L - ₹30L",
    postedDate: "2025-11-22"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Services",
    description: "Implement and maintain CI/CD pipelines and cloud infrastructure.",
    requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    location: "Pune, Maharashtra",
    salary: "₹14L - ₹20L",
    postedDate: "2025-11-10"
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppCrafters India",
    description: "Design and develop cutting-edge mobile applications for iOS and Android platforms.",
    requiredSkills: ["React Native", "JavaScript", "iOS", "Android"],
    location: "Chennai, Tamil Nadu",
    salary: "₹10L - ₹16L",
    postedDate: "2025-11-25"
  },
  {
    id: 7,
    title: "UI/UX Designer",
    company: "DesignStudio India",
    description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
    requiredSkills: ["Figma", "Adobe XD", "CSS", "User Research"],
    location: "Delhi",
    salary: "₹8L - ₹14L",
    postedDate: "2025-11-23"
  },
  {
    id: 8,
    title: "Software Architect",
    company: "EnterpriseTech Solutions",
    description: "Design scalable software architectures and guide development teams in best practices.",
    requiredSkills: ["System Design", "Microservices", "Cloud Architecture", "Java"],
    location: "Bangalore, Karnataka",
    salary: "₹25L - ₹35L",
    postedDate: "2025-11-19"
  },
  {
    id: 9,
    title: "QA Automation Engineer",
    company: "QualityFirst Software",
    description: "Develop automated testing frameworks and ensure software quality standards.",
    requiredSkills: ["Selenium", "Jest", "Python", "CI/CD"],
    location: "Kolkata, West Bengal",
    salary: "₹10L - ₹16L",
    postedDate: "2025-11-21"
  },
  {
    id: 10,
    title: "Technical Lead",
    company: "InnovationLabs India",
    description: "Lead a team of developers in building innovative software products and solutions.",
    requiredSkills: ["Leadership", "Agile", "JavaScript", "Project Management"],
    location: "Ahmedabad, Gujarat",
    salary: "₹18L - ₹25L",
    postedDate: "2025-11-17"
  },
  {
    id: 11,
    title: "Database Administrator",
    company: "DataMasters India",
    description: "Manage and optimize database systems for high-performance applications.",
    requiredSkills: ["SQL", "PostgreSQL", "MongoDB", "Performance Tuning"],
    location: "Jaipur, Rajasthan",
    salary: "₹12L - ₹18L",
    postedDate: "2025-11-14"
  },
  {
    id: 12,
    title: "Security Engineer",
    company: "CyberSecure India",
    description: "Implement security measures and protect systems from cyber threats.",
    requiredSkills: ["Cybersecurity", "Encryption", "Network Security", "Compliance"],
    location: "Chandigarh",
    salary: "₹15L - ₹22L",
    postedDate: "2025-11-12"
  }
];

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserProfile = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get job recommendations for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getJobRecommendations = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use advanced skill matching algorithm
    const recommendations = mockJobs.map(job => {
      const matchAnalysis = SkillMatcher.calculateMatchPercentage(user.skills, job.requiredSkills);
      
      return {
        ...job,
        matchPercentage: matchAnalysis.percentage,
        matchedSkills: matchAnalysis.matchedSkills,
        missingSkills: matchAnalysis.missingSkills,
        weakSkills: matchAnalysis.weakSkills
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 5);

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching job recommendations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get skill gap analysis for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getSkillGapAnalysis = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use advanced skill gap analysis
    const skillAnalysis = SkillMatcher.analyzeSkillGaps(user.skills);
    
    // Get learning recommendations
    const learningRecommendations = SkillMatcher.getLearningRecommendations(skillAnalysis.skillsToImprove);

    res.json({
      ...skillAnalysis,
      learningRecommendations
    });
  } catch (error) {
    console.error('Error fetching skill gap analysis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update user skills
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateUserSkills = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { skills } = req.body;
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user skills
    mockUsers[userIndex].skills = skills.map(skill => ({
      name: skill.name || skill,
      level: skill.level || 70 // Default level if not provided
    }));
    
    res.json({ message: 'Skills updated successfully', user: mockUsers[userIndex] });
  } catch (error) {
    console.error('Error updating user skills:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get real-time market data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMarketData = async (req, res) => {
  try {
    // Fetch real-time market insights
    const marketInsights = await MarketData.fetchMarketInsights();
    
    res.json(marketInsights);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Search jobs with filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.searchJobs = async (req, res) => {
  try {
    const { location, skill } = req.query;
    
    // Fetch job postings with filters
    const jobPostings = await MarketData.fetchJobPostings({ location, skill });
    
    // Add match percentages for each job
    const userId = parseInt(req.params.id) || 1; // Default to user 1
    const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
    
    const jobsWithMatches = jobPostings.map(job => {
      const matchAnalysis = SkillMatcher.calculateMatchPercentage(user.skills, job.requiredSkills);
      
      return {
        ...job,
        matchPercentage: matchAnalysis.percentage,
        matchedSkills: matchAnalysis.matchedSkills,
        missingSkills: matchAnalysis.missingSkills,
        weakSkills: matchAnalysis.weakSkills
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    res.json(jobsWithMatches);
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};