/**
 * Advanced Skill Matching Algorithm
 * This module provides sophisticated skill matching capabilities
 * for the SkillMatch job recommendation system.
 */

class SkillMatcher {
  /**
   * Calculate skill match percentage between user skills and job requirements
   * @param {Array} userSkills - Array of user's skills with proficiency levels
   * @param {Array} jobSkills - Array of required job skills
   * @returns {Object} Match analysis including percentage and details
   */
  static calculateMatchPercentage(userSkills, jobSkills) {
    if (!userSkills || !jobSkills || jobSkills.length === 0) {
      return {
        percentage: 0,
        matchedSkills: [],
        missingSkills: [],
        weakSkills: []
      };
    }

    const matchedSkills = [];
    const missingSkills = [];
    const weakSkills = [];

    jobSkills.forEach(jobSkill => {
      const userSkill = userSkills.find(skill => 
        skill.name.toLowerCase() === jobSkill.toLowerCase()
      );

      if (!userSkill || userSkill.level === 0) {
        missingSkills.push(jobSkill);
      } else if (userSkill.level < 50) {
        weakSkills.push({ name: jobSkill, level: userSkill.level });
        matchedSkills.push({ name: jobSkill, level: userSkill.level });
      } else {
        matchedSkills.push({ name: jobSkill, level: userSkill.level });
      }
    });

    const matchPercentage = Math.round((matchedSkills.length / jobSkills.length) * 100);

    return {
      percentage: matchPercentage,
      matchedSkills,
      missingSkills,
      weakSkills
    };
  }

  /**
   * Advanced skill gap analysis
   * @param {Array} userSkills - Array of user's skills with proficiency levels
   * @returns {Object} Detailed skill gap analysis
   */
  static analyzeSkillGaps(userSkills) {
    if (!userSkills || userSkills.length === 0) {
      return {
        skillAnalysis: [],
        skillsToImprove: [],
        overallProficiency: 0
      };
    }

    const skillAnalysis = userSkills.map(skill => {
      let category = 'strong';
      let priority = 'low';

      if (skill.level === 0) {
        category = 'missing';
        priority = 'high';
      } else if (skill.level < 30) {
        category = 'very_weak';
        priority = 'high';
      } else if (skill.level < 50) {
        category = 'weak';
        priority = 'medium';
      } else if (skill.level < 75) {
        category = 'intermediate';
        priority = 'low';
      }

      return {
        ...skill,
        category,
        priority
      };
    });

    // Sort skills to improve by priority
    const skillsToImprove = skillAnalysis
      .filter(skill => skill.category !== 'strong' && skill.category !== 'intermediate')
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    const overallProficiency = Math.round(
      skillAnalysis.reduce((sum, skill) => sum + skill.level, 0) / skillAnalysis.length
    );

    return {
      skillAnalysis,
      skillsToImprove,
      overallProficiency
    };
  }

  /**
   * Get personalized learning recommendations
   * @param {Array} skillsToImprove - Array of skills that need improvement
   * @returns {Array} Learning recommendations
   */
  static getLearningRecommendations(skillsToImprove) {
    const recommendations = [];

    skillsToImprove.forEach(skill => {
      let recommendation = {
        skill: skill.name,
        priority: skill.priority,
        type: '',
        resources: []
      };

      // Provide specific recommendations based on skill category
      switch (skill.category) {
        case 'missing':
          recommendation.type = 'Learn from scratch';
          recommendation.resources = this.getLearningResources(skill.name);
          break;
        case 'very_weak':
        case 'weak':
          recommendation.type = 'Improve existing knowledge';
          recommendation.resources = this.getImprovementResources(skill.name, skill.level);
          break;
      }

      recommendations.push(recommendation);
    });

    return recommendations;
  }

  /**
   * Get learning resources for a skill
   * @param {string} skillName - Name of the skill
   * @returns {Array} Learning resources
   */
  static getLearningResources(skillName) {
    const resources = {
      'JavaScript': [
        { type: 'course', title: 'JavaScript Basics', platform: 'Coursera', url: '#' },
        { type: 'book', title: 'Eloquent JavaScript', platform: 'Free Online', url: '#' }
      ],
      'Python': [
        { type: 'course', title: 'Python for Everybody', platform: 'Coursera', url: '#' },
        { type: 'tutorial', title: 'Python.org Tutorial', platform: 'Official', url: '#' }
      ],
      'React': [
        { type: 'course', title: 'React Fundamentals', platform: 'Udemy', url: '#' },
        { type: 'documentation', title: 'React Official Docs', platform: 'Official', url: '#' }
      ],
      'Node.js': [
        { type: 'course', title: 'Node.js Basics', platform: 'Pluralsight', url: '#' },
        { type: 'project', title: 'Build a REST API', platform: 'GitHub', url: '#' }
      ],
      'SQL': [
        { type: 'course', title: 'SQL Fundamentals', platform: 'Khan Academy', url: '#' },
        { type: 'practice', title: 'SQL Exercises', platform: 'HackerRank', url: '#' }
      ],
      'Java': [
        { type: 'course', title: 'Java Programming', platform: 'edX', url: '#' },
        { type: 'book', title: 'Head First Java', platform: 'O\'Reilly', url: '#' }
      ],
      'MongoDB': [
        { type: 'course', title: 'MongoDB University', platform: 'Official', url: '#' },
        { type: 'tutorial', title: 'MongoDB Basics', platform: 'YouTube', url: '#' }
      ]
    };

    return resources[skillName] || [
      { type: 'course', title: `Learn ${skillName}`, platform: 'General Platforms', url: '#' }
    ];
  }

  /**
   * Get improvement resources for a skill based on current level
   * @param {string} skillName - Name of the skill
   * @param {number} currentLevel - Current proficiency level
   * @returns {Array} Improvement resources
   */
  static getImprovementResources(skillName, currentLevel) {
    const resources = {
      'JavaScript': [
        { type: 'course', title: 'Advanced JavaScript Concepts', platform: 'Udemy', url: '#' },
        { type: 'project', title: 'Build a JavaScript Framework', platform: 'GitHub', url: '#' }
      ],
      'Python': [
        { type: 'course', title: 'Python Data Science', platform: 'DataCamp', url: '#' },
        { type: 'project', title: 'Machine Learning with Python', platform: 'Kaggle', url: '#' }
      ],
      'React': [
        { type: 'course', title: 'React Performance Optimization', platform: 'Frontend Masters', url: '#' },
        { type: 'project', title: 'Build a Complex React App', platform: 'GitHub', url: '#' }
      ],
      'Node.js': [
        { type: 'course', title: 'Node.js Microservices', platform: 'Pluralsight', url: '#' },
        { type: 'project', title: 'Build a Real-time App', platform: 'GitHub', url: '#' }
      ],
      'SQL': [
        { type: 'course', title: 'Advanced SQL Queries', platform: 'Udemy', url: '#' },
        { type: 'practice', title: 'Database Design Challenges', platform: 'LeetCode', url: '#' }
      ],
      'Java': [
        { type: 'course', title: 'Java Design Patterns', platform: 'Coursera', url: '#' },
        { type: 'project', title: 'Spring Boot Application', platform: 'GitHub', url: '#' }
      ],
      'MongoDB': [
        { type: 'course', title: 'MongoDB Aggregation Framework', platform: 'MongoDB University', url: '#' },
        { type: 'project', title: 'Build a MongoDB Cluster', platform: 'GitHub', url: '#' }
      ]
    };

    return resources[skillName] || [
      { type: 'course', title: `Advanced ${skillName}`, platform: 'General Platforms', url: '#' }
    ];
  }

  /**
   * Calculate market demand for skills
   * @param {Array} jobPostings - Array of job postings
   * @returns {Object} Skill demand analysis
   */
  static analyzeMarketDemand(jobPostings) {
    const skillFrequency = {};

    jobPostings.forEach(job => {
      job.requiredSkills.forEach(skill => {
        const skillName = skill.toLowerCase();
        skillFrequency[skillName] = (skillFrequency[skillName] || 0) + 1;
      });
    });

    // Convert to array and sort by frequency
    const sortedSkills = Object.entries(skillFrequency)
      .map(([skill, frequency]) => ({ skill, frequency }))
      .sort((a, b) => b.frequency - a.frequency);

    return {
      topSkills: sortedSkills.slice(0, 10),
      totalSkills: Object.keys(skillFrequency).length,
      skillFrequency
    };
  }
}

module.exports = SkillMatcher;