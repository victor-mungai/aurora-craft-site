import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = [
      {
        icon: "Code",
        value: 50,
        suffix: "+",
        label: "Projects Completed",
        description: "Successful deployments"
      },
      {
        icon: "Cloud",
        value: 99,
        suffix: "%",
        label: "Uptime Achieved",
        description: "System reliability"
      },
      {
        icon: "Users",
        value: 25,
        suffix: "+",
        label: "Teams Collaborated",
        description: "Cross-functional work"
      },
      {
        icon: "Award",
        value: 8,
        suffix: "+",
        label: "Certifications",
        description: "Professional credentials"
      },
      {
        icon: "GitBranch",
        value: 1000,
        suffix: "+",
        label: "Commits Made",
        description: "Code contributions"
      },
      {
        icon: "Shield",
        value: 100,
        suffix: "%",
        label: "Security Focus",
        description: "Zero breaches"
      },
      {
        icon: "Rocket",
        value: 5,
        suffix: "+",
        label: "Years Experience",
        description: "Industry expertise"
      },
      {
        icon: "Zap",
        value: 95,
        suffix: "%",
        label: "Performance Boost",
        description: "Average improvement"
      }
    ];

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;