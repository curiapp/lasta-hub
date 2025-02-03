# Deployment Revision

## Containerisation

The following components should be containerised for deployment:
1. Nginx (the Reverse proxy)
1. Application Server (Node.js)
1. kafka instance
1. Scala service
1. Couchbase instance

Idea: how about automating all these containers with Ansible?

## Orchestration

We are yet to decide which orchestration tool to use for all the containers. The two candidates are: Kubernetes and Docker Compose


## Targets

The deployment should target three environments: **local**, **staging** server and **temporary production** server.
