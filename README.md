# Introduction
  - This web application build with <strong>Django</strong> as backend and 
  <strong>  React + TypeScript </strong> in frontend
  - I tried to do some bonus requirements, I will show the run of the web application in a video to make things more clear about some other points.
  - You can watch the video I added and take a quick look at the all system
# Installition

 - ## Backend
    - Install Python 3.11.8 or later version on your machine
    - install the requirements.txt file you can find on <strong>Backend</strong> folder using the following command line
    ```
        pip install -r requirements.txt
    ```  
    - Note:
        + I used sqlite3 in this project to make it easy to run the code and the database file is already included in the backend project files so you don't need to run migrations or migrate to launch database.

    - then run the next command to run the backend server 
    ```
        python manage.py runserver
    ```
    
 - ## Frontend
    -  install Node.Js v18.18.0 or later version on your machine
    - go to the frontend folder and run the next command to install the project packages
    ```
        npm install
    ```
    - then run the next command to run the frontend 
    ```
        npm run dev
    ```
---
## Development Process
 - I decided to start with Database design to make the next steps more clear in the development

 
 ### Authentication & Permissions
  - i used <strong>JWT & Refresh Tokens</strong> with <strong>Djoser</strong> framework it depends on Simple JWT library to create refresh tokens, but I decided to make some modifications to that like 
    - Injecting  the refresh token in the cookie and automatically retrieving it from the cookie without depending on the frontend to store it
    - add custom attributes on 'access_token' as shown in the next image
    ![alt text](image.png)

    - i built a custom user model as you asked with the following attributes
        (id, username, email, role)
    
 - And on the frontend, I built some custom filters to make no content appear to non-authorized users based on his role 
    - make him not access the pages he doesn't have permission to access
        ![alt text](image-1.png)
      
    - hide content in pages he can access but some content he shouldn't show like
    ![alt text](image-2.png)
    ![alt text](image-3.png)
---
 ### Modules & Apps
 - the backend has 2 main applications except (accounts)

    - #### Companies
        Has all companies and their departments endpoints like 
        - Companies
            - list companies, details page, Create, Update, Delete Company
            - some sub endpoints like [ListCompaniesSelectList, CompanyForm] endpoints to get companies as select list (in case of creating Employee and Need only [id, name]) or edit company so we need its old data.
        - Departments
            - exactly the same as Company but have some extra endpoints
            like get company departments (all-data or select-list)
        
        - Employees
            - I made a mistake by assigning endpoints to the Employees app. I ran out of time to make the necessary changes. I was confused about the workflow, so some things were unclear to me. I'll provide more details soon.  


    - #### Employees
        This app has endpoints like list, details, create, update, delete, and get form data (in case of update).

        - <strong>Get Hiring Stages endpoint</strong>  (bonus)
            - This endpoint should return the valid next step for the hiring process as described in the task. There are three cases to consider:
            in the task description but there are three cases 
                - employee just created so the return is [ 'Application Received' ] 
                - The next step is ['Interview Scheduled' or 'Not Accepted']
                - in case of 'Interview Scheduled' the next step is ['Hired' or 'Not Accepted']
            The implementation mainly depends on the database schema I used to attribute to link the next two steps with the current one by adding ['next_fulfilled', 'next_rejected'] to easily determine what happens next in the two cases.
            ![alt text](image-5.png)

    ### Handle Cascading Deletions
    In my code, I implemented <strong>"soft delete"</strong> along with <strong>"Do Noting"</strong> to address this issue. To prevent this problem, I created a global filter to retrieve only non-deleted records by creating a <strong>"BaseModel"</strong> and making all other entities inherit from it. I also created custom functions to <strong>"soft_delete()"</strong>, <strong>"delete()"</strong>, and <strong>"retrieve_deleted_items()"</strong>.
    ![alt text](image-6.png)


## System Flow 
- List Companies
    (has some basic info about a company like name and description)
    - Company Page
        (has some details like departments count, employee count, created at, departments name, and description)
        - Dashboard (Admin or Manager)
            - Home: has form to edit company [name, description]
            - departments 
                - has a list of departments
                - create a new department
                - edit department (in this company)
                - delete department (in this company)
            - Employees
                - has a Report Table for all company Employees
                - Add a New Employee (with an already existing user account) (in this company)
                - edit employee data (in this company)
                - delete employee (in this company)
            - Delete the Company Page
                - to delete the company you should enter your password to check the authentication
    - Employees
        - List of Employees Cards with option to see details of each
        - Can Create a new Employee
            - in this form, we don't have the company_id like in the previous case so the form here has a select input to select a company and then the Departments should updated based on the selected company
    

            


https://github.com/Abdelrahman-Moharram/EMS-Task/assets/41553398/ee833a94-8e8f-46f7-8490-91a692dd1f9c



