output "atlas_project_id" {
  description = "MongoDB Atlas project ID."
  value       = mongodbatlas_project.main.id
}

output "atlas_project_name" {
  description = "MongoDB Atlas project name."
  value       = mongodbatlas_project.main.name
}
