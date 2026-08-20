/**
 * Real-time Market Data Integration
 * This module provides integration with external APIs for real-time market data
 */

const axios = require('axios');

class MarketData {
  /**
   * Fetch real-time salary data from external API
   * @param {string} industry - Industry to get salary data for
   * @param {string} location - Location to get salary data for
   * @returns {Promise<Object>} Salary data
   */
  static async fetchSalaryData(industry, location) {
    try {
      // In a real implementation, this would call an external API
      // For demonstration, we'll return mock data
      const mockSalaryData = {
        frontend: {
          entry: 85000,
          mid: 115000,
          senior: 145000,
          locations: {
            "San Francisco": 135000,
            "New York": 125000,
            "Austin": 105000,
            "Remote": 100000,
            "Chicago": 95000
          }
        },
        backend: {
          entry: 90000,
          mid: 125000,
          senior: 155000,
          locations: {
            "San Francisco": 145000,
            "New York": 135000,
            "Austin": 115000,
            "Remote": 110000,
            "Chicago": 105000
          }
        },
        fullstack: {
          entry: 95000,
          mid: 130000,
          senior: 165000,
          locations: {
            "San Francisco": 155000,
            "New York": 145000,
            "Austin": 125000,
            "Remote": 120000,
            "Chicago": 115000
          }
        },
        "data-science": {
          entry: 100000,
          mid: 140000,
          senior: 180000,
          locations: {
            "San Francisco": 175000,
            "New York": 165000,
            "Austin": 145000,
            "Remote": 140000,
            "Chicago": 135000
          }
        },
        cybersecurity: {
          entry: 85000,
          mid: 120000,
          senior: 160000,
          locations: {
            "San Francisco": 155000,
            "New York": 145000,
            "Austin": 125000,
            "Remote": 120000,
            "Chicago": 115000
          }
        }
      };

      return mockSalaryData[industry] || mockSalaryData.frontend;
    } catch (error) {
      console.error('Error fetching salary data:', error);
      throw new Error('Failed to fetch salary data');
    }
  }

  /**
   * Fetch industry trends from external API
   * @returns {Promise<Array>} Industry trends data
   */
  static async fetchIndustryTrends() {
    try {
      // In a real implementation, this would call an external API
      // For demonstration, we'll return mock data
      const mockTrends = [
        { name: "Artificial Intelligence", growth: 25, description: "Machine learning and AI integration" },
        { name: "Cloud Computing", growth: 18, description: "AWS, Azure, and GCP adoption" },
        { name: "Cybersecurity", growth: 32, description: "Data protection and privacy" },
        { name: "Mobile Development", growth: 12, description: "Cross-platform app development" },
        { name: "DevOps", growth: -5, description: "CI/CD and automation" },
        { name: "Blockchain", growth: 15, description: "Decentralized applications and cryptocurrencies" },
        { name: "IoT", growth: 10, description: "Internet of Things devices and platforms" },
        { name: "AR/VR", growth: 8, description: "Augmented and Virtual Reality applications" }
      ];

      return mockTrends;
    } catch (error) {
      console.error('Error fetching industry trends:', error);
      throw new Error('Failed to fetch industry trends');
    }
  }

  /**
   * Fetch job postings from external job boards
   * @param {Object} filters - Search filters
   * @returns {Promise<Array>} Job postings
   */
  static async fetchJobPostings(filters = {}) {
    try {
      // In a real implementation, this would call external job board APIs
      // For demonstration, we'll return mock data
      const mockJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "Tech Solutions Inc.",
          description: "We are looking for an experienced frontend developer with strong React skills to join our team.",
          requiredSkills: ["JavaScript", "React", "HTML/CSS", "Node.js"],
          location: "San Francisco, CA",
          salary: "$135K - $155K",
          postedDate: "2025-11-20",
          url: "https://example.com/job/1"
        },
        {
          id: 2,
          title: "Full Stack Engineer",
          company: "Startup Innovations",
          description: "Join our dynamic team to build innovative web applications using modern technologies.",
          requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
          location: "New York, NY",
          salary: "$125K - $145K",
          postedDate: "2025-11-18",
          url: "https://example.com/job/2"
        },
        {
          id: 3,
          title: "Backend Developer",
          company: "Enterprise Systems",
          description: "Develop scalable backend services and APIs for our enterprise clients.",
          requiredSkills: ["Java", "SQL", "MongoDB", "Python"],
          location: "Austin, TX",
          salary: "$115K - $135K",
          postedDate: "2025-11-15",
          url: "https://example.com/job/3"
        },
        {
          id: 4,
          title: "Data Scientist",
          company: "Analytics Corp",
          description: "Apply machine learning and statistical analysis to solve complex business problems.",
          requiredSkills: ["Python", "SQL", "Machine Learning", "Statistics"],
          location: "Remote",
          salary: "$145K - $175K",
          postedDate: "2025-11-22",
          url: "https://example.com/job/4"
        },
        {
          id: 5,
          title: "DevOps Engineer",
          company: "Cloud Services Ltd",
          description: "Implement and maintain CI/CD pipelines and cloud infrastructure.",
          requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
          location: "Chicago, IL",
          salary: "$120K - $150K",
          postedDate: "2025-11-10",
          url: "https://example.com/job/5"
        },
        {
          id: 6,
          title: "Cybersecurity Analyst",
          company: "Security First",
          description: "Protect organizational assets through threat analysis and security implementation.",
          requiredSkills: ["Cybersecurity", "Network Security", "Incident Response", "SIEM"],
          location: "Washington, DC",
          salary: "$110K - $140K",
          postedDate: "2025-11-25",
          url: "https://example.com/job/6"
        },
        {
          id: 7,
          title: "Mobile Developer",
          company: "App Creations",
          description: "Develop cross-platform mobile applications for iOS and Android.",
          requiredSkills: ["React Native", "Flutter", "iOS", "Android"],
          location: "Seattle, WA",
          salary: "$105K - $135K",
          postedDate: "2025-11-23",
          url: "https://example.com/job/7"
        }
      ];

      // Apply filters if provided
      let filteredJobs = mockJobs;
      
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.skill) {
        filteredJobs = filteredJobs.filter(job => 
          job.requiredSkills.some(skill => 
            skill.toLowerCase().includes(filters.skill.toLowerCase())
          )
        );
      }

      return filteredJobs;
    } catch (error) {
      console.error('Error fetching job postings:', error);
      throw new Error('Failed to fetch job postings');
    }
  }

  /**
   * Fetch real-time market insights
   * @returns {Promise<Object>} Market insights
   */
  static async fetchMarketInsights() {
    try {
      // Fetch all required data in parallel
      const [salaryData, industryTrends, jobPostings] = await Promise.all([
        this.fetchSalaryData('frontend', 'San Francisco'),
        this.fetchIndustryTrends(),
        this.fetchJobPostings()
      ]);

      // Process and combine the data
      const marketInsights = {
        salaryTrends: salaryData,
        industryTrends: industryTrends,
        jobCount: jobPostings.length,
        topIndustries: industryTrends
          .filter(trend => trend.growth > 0)
          .sort((a, b) => b.growth - a.growth)
          .slice(0, 5),
        decliningIndustries: industryTrends
          .filter(trend => trend.growth < 0)
          .sort((a, b) => a.growth - b.growth)
          .slice(0, 3)
      };

      return marketInsights;
    } catch (error) {
      console.error('Error fetching market insights:', error);
      throw new Error('Failed to fetch market insights');
    }
  }

  /**
   * Format salary data for display
   * @param {number} salary - Salary amount
   * @returns {string} Formatted salary string
   */
  static formatSalary(salary) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  }

  /**
   * Get salary range for a position level
   * @param {Object} salaryData - Salary data for an industry
   * @param {string} level - Position level (entry, mid, senior)
   * @returns {string} Salary range string
   */
  static getSalaryRange(salaryData, level) {
    if (!salaryData || !salaryData[level]) {
      return "N/A";
    }

    const baseSalary = salaryData[level];
    const minSalary = baseSalary * 0.9;
    const maxSalary = baseSalary * 1.1;

    return `${this.formatSalary(minSalary)} - ${this.formatSalary(maxSalary)}`;
  }
}

module.exports = MarketData;