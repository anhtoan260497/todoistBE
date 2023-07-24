# 1. Backend Todoist 

- [1. Backend Todoist](#1-backend-todoist)
  - [1.1. Source Code URL](#11-source-code-url)
  - [1.2. Production URL](#12-production-url)
- [2. How to use](#2-how-to-use)
  - [2.1. BaseURL](#21-baseurl)
    - [2.1.1. Auth API](#211-auth-api)
    - [2.1.2. Task API](#212-task-api)
    - [2.1.3. Project API](#213-project-api)
- [3. Libraries Use](#3-libraries-use)


## 1.1. Source Code URL 
[Github Todoist Backend Source Code](https://github.com/anhtoan260497/todoistBE)

## 1.2. Production URL

[Render Todoist Backend Production](https://todoist-be-6li5.onrender.com)

[Vercel Todoist Frontend Production](https://todoist-ten-ebon.vercel.app)

>It's take about `30-45 seconds` to start a server

# 2. How to use

## 2.1. BaseURL

`https://todoist-be-6li5.onrender.com/api/`

### 2.1.1. Auth API

> ### Sign Up
> 
>  **URL** :  https://todoist-be-6li5.onrender.com/api/auth/create <br>
> > **Method** : `POST` <br>
> **Body** : ```{email, password}``` <br>
> ***Response*** : `Success Message`


> ### Login
>  **URL** :  https://todoist-be-6li5.onrender.com/api/auth/login <br>
> **Method** : `POST` <br>
> **Body** : ```{email, password}``` <br>
> ***Response*** : `Token`

> ### Check Login
>  **URL** :  https://todoist-be-6li5.onrender.com/api/auth/logged <br>
> **Method** : `POST` <br>
> **Body** : ```{token}``` <br>
> ***Response*** : `New Token`

### 2.1.2. Task API

> ### Get All Task 
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/ <br>
> **Method** : `POST` <br>
> **Body** : `none` <br>
> ***Response*** : `Data {email, projects}`

> ### Add Task 
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/add <br>
> **Method** : `POST` <br>
> **Body** : `{newTask, project, projectId}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Update Task
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/update <br>
> **Method** : `POST` <br>
> **Body** : `{projects}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Update Task with Filter (Overdue, Today, Upcoming)
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/filter <br>
> **Method** : `POST` <br>
> **Body** : `none` <br>
> ***Response*** : `Data {email, projects}` 

> ### Remove Task
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/remove <br>
> **Method** : `POST` <br>
> **Body** : `{_id, projectName}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Add Subtask
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/subtask/add <br>
> **Method** : `POST` <br>
> **Body** : `{_id, project, subtask}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Checkdone Subtask
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/subtask/add <br>
> **Method** : `POST` <br>
> **Body** : `{_id, project, subtask}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Remove Subtask
> **URL** :  https://todoist-be-6li5.onrender.com/api/task/subtask/add <br>
> **Method** : `POST` <br>
> **Body** : `{_id, project, subtask}` <br>
> ***Response*** : `Data {email, projects}` 

### 2.1.3. Project API

> ### Get All Project
> **URL** :  https://todoist-be-6li5.onrender.com/api/project/ <br>
> **Method** : `GET` <br>
> **Body** : `none` <br>
> ***Response*** : `Data {email, projects}` 

> ### Get One Project
> **URL** :  https://todoist-be-6li5.onrender.com/api/project/ <br>
> **Method** : `GET` <br>
> **Params** : `{id}` <br>
> ***Response*** : `Data {projectData}` 

> ### Update Project
> **URL** :  https://todoist-be-6li5.onrender.com/api/project/update/ <br>
> **Method** : `POST` <br>
> **Body** : `{project}` <br> 
> ***Response*** : `Data {email, projects}` 

> ### Create Project
> **URL** :  https://todoist-be-6li5.onrender.com/api/project/create/ <br>
> **Method** : `POST` <br>
> **Body** : `{project, color}` <br>
> ***Response*** : `Data {email, projects}` 

> ### Delete Project
> **URL** :  https://todoist-be-6li5.onrender.com/api/project/delete/ <br>
> **Method** : `POST` <br>
> **Body** : `{project}` <br>
> ***Response*** : `Data {email, projects}` 

# 3. Libraries Use

- Nodejs
- Express
- Mongoose
- Cors
- Dotenv
- jwt
- MongoDB