resource "mongodbatlas_project" "main" {
  name   = var.atlas_project_name
  org_id = var.atlas_org_id

  lifecycle {
    prevent_destroy = true
  }
}

resource "mongodbatlas_advanced_cluster" "main" {
  project_id   = mongodbatlas_project.main.id
  name         = var.atlas_cluster_name
  cluster_type = "REPLICASET"

  replication_specs = [
    {
      region_configs = [
        {
          backing_provider_name = "AWS"
          provider_name         = "TENANT"
          priority              = 7
          region_name           = var.atlas_region

          electable_specs = {
            instance_size = "M0"
          }
        }
      ]
    }
  ]
}
