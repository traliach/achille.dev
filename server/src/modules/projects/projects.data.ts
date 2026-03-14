import type { ProjectSummary } from '../../types/content.js'

export const projects: ProjectSummary[] = [
  {
    title: 'Hilton Cloud Delivery Project',
    timeframe: '2021-2022',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'GCP delivery work centered on Jenkins-driven deployment automation, Terraform-managed infrastructure, and container reliability.',
    challenge:
      'The delivery flow needed stronger automation, more reliable infrastructure provisioning, and less friction across deployment steps.',
    solution:
      'Implemented Jenkins-driven automation, Terraform-managed infrastructure changes, and container deployment improvements across the delivery pipeline.',
    stack: ['GCP', 'Jenkins', 'Terraform', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Deployment speed', value: '+30%' },
      { label: 'Automation efficiency', value: '+20%' },
      { label: 'Reliability', value: '+25%' },
    ],
    outcomes: [
      'Improved deployment efficiency by 30%.',
      'Increased automation efficiency by 20%.',
      'Raised deployment reliability by 25% with customized Kubernetes manifests.',
    ],
  },
  {
    title: 'Mercedes-Benz DMS Modernization',
    timeframe: '2023-2024',
    role: 'DevOps Engineer',
    featured: true,
    summary:
      'Modernized build, deployment, and troubleshooting flows with stronger CI/CD, artifact management, and server reliability work.',
    challenge:
      'The platform needed faster deployment cycles, cleaner artifact and release handling, and a more stable operational footing.',
    solution:
      'Strengthened CI/CD automation, improved troubleshooting workflows, and used container and infrastructure tooling to stabilize delivery.',
    stack: ['Jenkins', 'Azure DevOps', 'Docker', 'Ansible', 'Kubernetes'],
    metrics: [
      { label: 'Deployment speed', value: '+30%' },
      { label: 'Vulnerability reduction', value: '-15%' },
      { label: 'Availability', value: '+30%' },
    ],
    outcomes: [
      'Improved deployment efficiency by 30%.',
      'Reduced vulnerabilities by 15%.',
      'Boosted application availability and performance by 30%.',
    ],
  },
  {
    title: 'Kubeflow Workflow Automation',
    timeframe: 'Dominion Systems',
    role: 'Platform / DevOps Engineer',
    featured: false,
    summary:
      'Integrated Kubeflow on Kubernetes to automate ML pipeline steps and improve analytics platform scalability.',
    challenge:
      'Machine learning delivery required more repeatable workflow orchestration and better operational support around Kubernetes-based data systems.',
    solution:
      'Integrated Kubeflow with Kubernetes workflows and supported the surrounding operational tooling needed to scale analytics delivery.',
    stack: ['Kubeflow', 'Kubernetes', 'Python', 'Bash', 'Prometheus'],
    metrics: [
      { label: 'Workflow maturity', value: 'Automated' },
      { label: 'Platform scale', value: 'Kubernetes' },
      { label: 'Delivery focus', value: 'ML Ops' },
    ],
    outcomes: [
      'Automated ML workflow deployment and scaling.',
      'Supported SRE operations for ML data workflows.',
      'Reduced time-to-market for predictive and analytics features.',
    ],
  },
]
