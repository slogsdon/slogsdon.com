---
title: ASP.NET Core WebAPI in Azure App Service
author: shane
layout: post
categories:
  - All Posts
  - Programming
  - Devops
tags:
  - .net
  - csharp
  - azure
description:
---

In my opinion, Azure App Services are an easy and direct way to launch your ASP.NET Core application for the outside world to access. Azure App Service offers a free tier, perfect for tinkering or getting a new project off the ground.

## Prepare the Application

First comes the code:

```
$ yo aspnet
$ cd ProjectName
$ dotnet restore
$ dotnet build
```

Then comes the commit:

```
$ git init
$ git commit -am "Initial commit"
```

## Create App Service

Image of add new resource

- App name
- Subscription
- Resource Group
- App Service plan/Location
- Create

Wait for your notification that the deployment was succesful

Find resource, either under 'All Resources` or on dashboard if you elected to pin it there

If you haven't set up a deployment user/password on your Azure account before, Goto App Deployment > Deployment Credentials

Image of App Deployment section

- FTP/deployment username
- Password
- Confirm password

## Local Git deployment

Goto App Deployment > Deployment Options

- Choose Source -> Local Git Repository
- Ok

Under Settings > Properties, copy Git URL

```
$ git remote add azure https://slogsdon@slogsdon-programname.scm.azurewebsites.net:443/slogsdon-ProgramName.git
$ git push azure master
Password for 'https://slogsdon@slogsdon-programname.scm.azurewebsites.net:443':
Counting objects: 14, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (14/14), 6.07 KiB | 0 bytes/s, done.
Total 14 (delta 0), reused 0 (delta 0)
remote: Updating branch 'master'.
remote: Updating submodules.
remote: Preparing deployment for commit id '660e32f957'.
remote: Generating deployment script.
remote: Project file path: .\project.json
remote: Generated deployment script files
remote: Running deployment command...
remote: Handling ASP.NET Core Web Application deployment.
remote: Restoring packages for D:\home\site\repository\project.json...
remote:   GET https://api.nuget.org/v3-flatcontainer/microsoft.netcore.app/index.json
remote:   GET https://api.nuget.org/v3-flatcontainer/microsoft.aspnetcore.mvc/index.json
# ... package restore
remote: ....................
remote: Committing restore...
remote: Writing lock file to disk. Path: D:\home\site\repository\project.lock.json
remote: D:\home\site\repository\project.json
remote: Restore completed in 151105ms.
remote:
remote: NuGet Config files used:
remote:     C:\DWASFiles\Sites\#1slogsdon-ProgramName\AppData\NuGet\NuGet.Config
remote:
remote: Feeds used:
remote:     https://api.nuget.org/v3/index.json
remote:
remote: Installed:
remote:     259 package(s) to D:\home\site\repository\project.json
remote: Microsoft (R) Build Engine version 15.1.0.0
remote: Copyright (C) Microsoft Corporation. All rights reserved.
remote:
remote: Build started 1/1/2017 5:50:46 PM.
remote: Project "D:\home\site\repository\project.json" on node 1 (Publish target(s)).
remote: MSBUILD : error MSB4025: The project file could not be loaded. Data at the root level is invalid. Line 1, position 1. [D:\home\site\repository\project.json]
remote: Done Building Project "D:\home\site\repository\project.json" (Publish target(s)) -- FAILED.
remote:
remote: Build FAILED.
remote:
remote: "D:\home\site\repository\project.json" (Publish target) (1) ->
remote:   MSBUILD : error MSB4025: The project file could not be loaded. Data at the root level is invalid. Line 1, position 1. [D:\home\site\repository\project.json]
remote:
remote:     0 Warning(s)
remote:     1 Error(s)
remote:
remote: Time Elapsed 00:00:00.20
remote: Failed exitCode=1, command=dotnet publish "project.json" --output "D:\local\Temp\8d4326e571d5047" --configuration Release
remote: An error has occurred during web site deployment.
remote:
remote: Error - Changes committed to remote repository but deployment to website failed.
To https://slogsdon-programname.scm.azurewebsites.net:443/slogsdon-ProgramName.git
 * [new branch]      master -> master
```

## Reap benefits

```
$ curl http://slogsdon-programname.azurewebsites.net
```
