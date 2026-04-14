import type { ProfileContent } from '../../types/content.js'

export const profile: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'DevOps Engineer & Full-Stack Software Engineer',
  location: 'Remote / Hybrid / On-site (US-wide)',
  availability:
    'Open to DevOps, platform engineering, and full-stack software engineering roles.',
  summary:
    'Platform and DevOps engineer with 8+ years building CI/CD pipelines, cloud infrastructure, and Kubernetes platforms — plus a full-stack track shipping React/TypeScript frontends and Node.js/Express APIs into production.',
  intro:
    'My portfolio spans both disciplines: cloud and IaC projects (Terraform-provisioned AWS infrastructure, self-hosted Kubernetes on EC2, Jenkins + Ansible platforms) and full-stack applications (MERN marketplace, medical imaging system, this site).',
  about:
    "I work on the parts engineering teams notice most when they break: CI/CD pipelines, cloud environments, release handoffs, and production support. Seven years at Dominion Systems have covered Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift, and observability tooling (Prometheus, Grafana, Kibana), alongside hands-on AWS infrastructure and database operations. My recent infrastructure projects go deeper: cloud_resume_infra provisions 20 AWS resources with Terraform and runs a live serverless visitor counter at resume.achille.tech; k8s-platform-lab runs a self-hosted k3s cluster on EC2 with ArgoCD GitOps, Prometheus, and Grafana; devops_platform combines Terraform, Ansible, Jenkins, and Docker Compose into a full delivery platform with SSM access and no open SSH port. Alongside that I ship full-stack applications — a MERN marketplace with Stripe and AI chat, a dual-site medical imaging system, and this portfolio — closing the loop between the platform and the applications running on top of it.",
  certifications: [
    'AWS Certified DevOps Engineer – Professional',
    'AWS Certified Cloud Practitioner',
    'IBM Software Engineering Essentials',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'CI/CD pipeline design and optimization (Jenkins, Azure DevOps, GitHub Actions)',
    'Infrastructure as code at scale — 50+ components automated with Terraform and Ansible',
    'Kubernetes and OpenShift cluster operations across 10+ production clusters',
    'Observability and incident response (Prometheus, Grafana, Kibana)',
    'Full-stack delivery: React, TypeScript, Node.js, Express, MongoDB, PostgreSQL',
  ],
  timeline: [
    {
      title: 'DevOps Engineer, Dominion Systems',
      period: 'August 2018 – Present',
      detail:
        'Restored failed Jenkins pipelines, reduced cloud spend by $500–$2,000/month through Cost Explorer audits, eliminated lateral movement risk by consolidating IAM roles into least-privilege per-service policies, cut new client environment provisioning from ~30 minutes to sub-5 minutes with Terraform + Ansible + Bash, and resolved CrashLoopBackOff incidents via kubectl diagnostics across 10+ Kubernetes/OpenShift clusters.',
    },
    {
      title: 'Independent Platform Engineering',
      period: '2025 – 2026',
      detail:
        'Built three production-grade infrastructure projects: cloud_resume_infra (20 AWS resources via Terraform, $0.00/month, live at resume.achille.tech), k8s-platform-lab (k3s on EC2 with ArgoCD GitOps, 21/21 health checks, ~30-min RTO validated), and devops_platform (~46-second Jenkins pipeline, JCasC, Ansible Vault, SSM access, no open SSH port).',
    },
    {
      title: 'AWS Cloud Engineer, Dominion Systems',
      period: 'June 2017 – July 2018',
      detail:
        'Improved infrastructure delivery efficiency ~25% migrating to CloudFormation, CodePipeline, CodeBuild, and CodeCommit. Increased EC2 utilization ~20% through right-sizing and auto-scaling. Achieved 100% pass rate across security audits with least-privilege IAM and Transit Gateway hybrid networking.',
    },
    {
      title: 'Full-Stack & AI-Native Development',
      period: '2025 – Present',
      detail:
        'Per Scholas AI-Native Software Engineering track — shipped full-stack MERN applications including a 3-role marketplace (Stripe, Groq AI, RBAC) and this portfolio platform (React 19, Node.js, MongoDB Atlas, Terraform, 4-job CI/CD pipeline).',
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}
