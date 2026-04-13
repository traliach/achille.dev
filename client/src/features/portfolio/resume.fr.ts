// French resume content — review and adjust phrasing as needed.
import type { ProfileContent } from '../../types/site'

export const profileFr: ProfileContent = {
  name: 'Ali Achille Traore',
  title: 'Ingénieur DevOps et Développeur Full Stack',
  location: 'Télétravail / Hybride / Sur site (États-Unis)',
  availability:
    "Ouvert aux postes en ingénierie DevOps, infrastructure cloud et développement full stack.",
  summary:
    "Ingénieur plateforme et DevOps avec plus de 7 ans d'expérience dans la conception de pipelines CI/CD, d'infrastructures cloud et de plateformes Kubernetes — avec une composante full stack en production (React/TypeScript, Node.js/Express).",
  intro:
    "Mon portfolio couvre les deux disciplines : projets cloud et IaC (infrastructure AWS provisionnée avec Terraform, Kubernetes auto-hébergé sur EC2, plateformes Jenkins + Ansible) et applications full stack (marketplace MERN, système d'imagerie médicale, ce site).",
  about:
    "Je travaille sur les parties de l'infrastructure que les équipes remarquent le plus quand elles tombent en panne : pipelines CI/CD, environnements cloud, handoffs de livraison et support en production. Sept ans chez Dominion Systems m'ont permis de couvrir Jenkins, Azure DevOps, Terraform, Kubernetes, OpenShift et les outils d'observabilité (Prometheus, Grafana, Kibana). Mes projets récents vont plus loin : cloud_resume_infra provisionne 20 ressources AWS avec Terraform et expose un compteur serverless en production ; k8s-platform-lab fait tourner un cluster k3s sur EC2 avec ArgoCD GitOps, Prometheus et Grafana ; devops_platform combine Terraform, Ansible, Jenkins et Docker Compose avec accès SSM sans clé SSH.",
  certifications: [
    'AWS Certified DevOps Engineer - Professional',
    'AWS Certified Cloud Practitioner',
    'Google IT Support Professional Certificate',
  ],
  strengths: [
    'Conception et optimisation de pipelines CI/CD (Jenkins, Azure DevOps, GitHub Actions)',
    "Infrastructure as Code à grande échelle, avec plus de 50 composants automatisés via Terraform et Ansible",
    'Exploitation de Kubernetes et OpenShift sur plus de 10 clusters en production',
    'Observabilité et gestion des incidents (Prometheus, Grafana, Kibana)',
    'Développement full stack : React, TypeScript, Node.js, Express, MongoDB, PostgreSQL',
  ],
  timeline: [
    {
      title: 'Ingénieur DevOps, Dominion Systems',
      period: 'Août 2018 - Présent',
      detail:
        "Optimisation des pipelines CI/CD (Jenkins, Azure DevOps), avec une réduction d'environ 30 % du temps de build et de déploiement, tout en maintenant une disponibilité d'environ 99,9 % sur plus de 10 clusters Kubernetes/OpenShift. Automatisation de plus de 50 composants d'infrastructure avec Terraform et Ansible.",
    },
    {
      title: 'Ingénieur Cloud AWS, Dominion Systems',
      period: 'Juin 2017 - Juillet 2018',
      detail:
        "Exploitation d'infrastructures AWS avec CloudFormation, CodePipeline, API Gateway, RDS, DynamoDB, Aurora, Transit Gateway et connectivité hybride.",
    },
    {
      title: 'Développement Full Stack et IA',
      period: '2025 - Présent',
      detail:
        "Formation intensive Software Engineer / AI-Native chez Per Scholas, axée sur le développement full stack et l'intégration de l'IA : React, TypeScript, Node.js et architectures cloud native.",
    },
  ],
  links: {
    email: 'mailto:t.achille.tech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/achille-traore',
    github: 'https://github.com/traliach',
    resume: '/ali-achille-traore-resume.txt',
  },
}

export const skillsFr = [
  { eyebrow: 'Langages', items: ['TypeScript', 'JavaScript', 'Python', 'Ruby'] },
  { eyebrow: 'Frontend', items: ['React', 'React Router', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
  { eyebrow: 'Backend et API', items: ['Node.js', 'Express', 'API REST', 'Authentification JWT', 'Zod', 'Stripe'] },
  { eyebrow: 'Bases de données', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'DynamoDB', 'RDS / Aurora', 'Redshift'] },
  { eyebrow: 'CI/CD et livraison', items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Docker Compose', 'JFrog', 'SonarQube', 'GHCR'] },
  { eyebrow: 'Cloud et IaC', items: ['AWS (S3, CloudFront, CodePipeline, API Gateway)', 'Terraform', 'CloudFormation', 'Ansible', 'Azure', 'GCP'] },
  { eyebrow: 'Conteneurs et orchestration', items: ['Docker', 'Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'OpenShift', 'Docker Compose'] },
  { eyebrow: 'Observabilité et opérations', items: ['Prometheus', 'Grafana', 'Kibana', 'CloudWatch', 'Linux'] },
]

export const projectsFr = [
  {
    title: 'k8s-platform-lab — Self-Hosted Kubernetes Platform',
    role: 'Ingénieur DevOps',
    timeframe: '2025 – 2026',
    stack: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Terraform', 'AWS EC2', 'GitHub Actions', 'Docker', 'Node.js'],
    outcomes: [
      'Chaque push sur main synchronise automatiquement tous les workloads via ArgoCD — sans kubectl apply manuel.',
      'Dashboard Grafana personnalisé affichant les métriques de l\'application scrappées par Prometheus.',
      'verify-cluster.sh exécute 21 contrôles de santé end-to-end en une seule commande.',
    ],
    featured: true,
  },
  {
    title: 'cloud_resume_infra — Plateforme résumé AWS',
    role: 'Ingénieur DevOps',
    timeframe: '2025',
    stack: ['Terraform', 'AWS', 'S3', 'CloudFront', 'Lambda', 'DynamoDB', 'API Gateway', 'ACM', 'Python', 'GitHub Actions'],
    outcomes: [
      'Déployé sur resume.achille.tech — HTTPS via CloudFront + ACM, S3 entièrement privé derrière OAC.',
      'Compteur Lambda atomique avec rôle IAM au moindre privilège et CORS limité à l\'origine.',
      'Trois alarmes CloudWatch surveillent le taux d\'erreur, la durée p95 et les limitations Lambda.',
    ],
    featured: true,
  },
  {
    title: 'devops_platform — Plateforme DevOps auto-hébergée',
    role: 'Ingénieur DevOps',
    timeframe: '2025 – 2026',
    stack: ['Terraform', 'Ansible', 'Jenkins', 'Docker Compose', 'Prometheus', 'Grafana', 'AWS EC2', 'GitHub Actions', 'React', 'Nginx', 'GHCR'],
    outcomes: [
      'Chaque push déclenche un build complet, un push GHCR et un redéploiement EC2 via Jenkins en ~60 secondes.',
      'Jenkins entièrement configuré en tant que code avec JCasC — aucune configuration manuelle.',
      'Accès EC2 via AWS SSM Session Manager — pas de port 22 ouvert, pas de clé SSH.',
    ],
    featured: true,
  },
  {
    title: 'Restaurant Deals, marketplace MERN',
    role: 'Développeur Full Stack',
    timeframe: '2026',
    stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Groq API', 'Tailwind CSS v4'],
    outcomes: [
      "Workflow de validation des offres côté serveur, avec file d'approbation administrateur et portail propriétaire.",
      "Widget IA convertissant des requêtes en langage naturel en filtres d'offres en temps réel.",
      'Panier avec persistance via localStorage, historique des commandes et paiement Stripe.',
    ],
    featured: true,
  },
]
