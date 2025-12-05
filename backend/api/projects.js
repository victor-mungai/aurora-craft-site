import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = [
      {
        id: 1,
        title: "Terraform-AWS-Infrastructure-Project",
        description: "Infrastructure as Code project using Terraform to deploy a scalable web application on AWS with EC2, S3, RDS, and VPC.",
        image: "/src/assets/terraform.jpg",
        tags: ["Terraform", "AWS", "Infrastructure as Code", "DevOps"],
        liveUrl: "#",
        githubUrl: "github.com/victor-mungai/Terraform-AWS-Infrastructure-Project",
        featured: true
      },
      {
        id: 2,
        title: "Ansible-projects",
        description: "Automation of server configuration and application deployment using Ansible playbooks and roles for consistent environments.",
        image: "/src/assets/Ansible.png",
        tags: ["Ansible", "Automation", "Configuration Management"],
        liveUrl: "#",
        githubUrl: "github.com/victor-mungai/Ansible-projects",
        featured: true
      },
      {
        id: 3,
        title: "Production-Ready CI/CD Pipeline Deployment",
        description: "End-to-end CI/CD pipeline setup using Jenkins, Docker, Sonarqube ,Nexus and Slack for automated testing, building, and deployment.",
        image: "/src/assets/cicd.jpeg",
        tags: ["CI/CD", "Jenkins", "Docker", "Automation"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false
      },
      {
        id: 4,
        title: "scalable, secure backend infrastructure using several AWS services",
        description: "Designed and implemented a scalable, secure backend infrastructure using several AWS services including EC2, S3, RDS, and VPC to support a high-traffic web application.",
        image: "/src/assets/architecture.jpeg",
        tags: ["AWS", "Cloud Architecture", "Security"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false
      }
    ];

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;