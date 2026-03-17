variable "atlas_org_id" {
  description = "MongoDB Atlas organization ID."
  type        = string
}

variable "MONGODB_ATLAS_CLIENT_ID" {
  description = "MongoDB Atlas service account client ID."
  type        = string
  sensitive   = true
}

variable "MONGODB_ATLAS_CLIENT_SECRET" {
  description = "MongoDB Atlas service account client secret."
  type        = string
  sensitive   = true
}

variable "atlas_project_name" {
  description = "MongoDB Atlas project name."
  type        = string
}

variable "atlas_cluster_name" {
  description = "MongoDB Atlas cluster name."
  type        = string
}

variable "atlas_region" {
  description = "MongoDB Atlas region for the M0 cluster."
  type        = string
  default     = "US_EAST_1"
}
