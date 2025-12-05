import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skillCategories = [
      {
        title: "Cloud Platforms",
        icon: "Cloud",
        skills: [
          { name: "AWS", level: 90, color: "bg-orange-500" },
          { name: "Azure", level: 75, color: "bg-blue-500" },
          { name: "Google Cloud", level: 70, color: "bg-green-500" }
        ]
      },
      {
        title: "DevOps Tools",
        icon: "Settings",
        skills: [
          { name: "Docker", level: 95, color: "bg-blue-600" },
          { name: "Kubernetes", level: 85, color: "bg-purple-500" },
          { name: "Jenkins", level: 90, color: "bg-red-500" },
          { name: "Terraform", level: 88, color: "bg-purple-600" }
        ]
      },
      {
        title: "Programming",
        icon: "Code",
        skills: [
          { name: "Python", level: 85, color: "bg-yellow-500" },
          { name: "Bash/Shell", level: 90, color: "bg-gray-600" },
          { name: "JavaScript", level: 80, color: "bg-yellow-400" },
          { name: "Go", level: 70, color: "bg-cyan-500" }
        ]
      },
      {
        title: "Monitoring & Security",
        icon: "Shield",
        skills: [
          { name: "Prometheus", level: 85, color: "bg-orange-600" },
          { name: "Grafana", level: 80, color: "bg-orange-500" },
          { name: "ELK Stack", level: 75, color: "bg-yellow-600" },
          { name: "Security Scanning", level: 80, color: "bg-red-600" }
        ]
      }
    ];

    const certifications = [
      "AWS Certified Solutions Architect",
      "AWS Certified DevOps Engineer",
      "Kubernetes Administrator (CKA)",
      "Docker Certified Associate",
      "Terraform Associate"
    ];

    const quickStats = [
      { label: "Years Experience", value: "5+", description: "Years Experience" },
      { label: "Projects Completed", value: "50+", description: "Projects Completed" },
      { label: "Technologies Mastered", value: "10+", description: "Technologies Mastered" },
      { label: "Uptime Achieved", value: "99%", description: "Uptime Achieved" }
    ];

    res.json({
      skillCategories,
      certifications,
      quickStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills data' });
  }
});

export default router;