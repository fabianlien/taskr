# taskr - [Live Link](https://taskr-react.herokuapp.com/)

<br>

![taskr landing page screenshot](public/screenshots/Screenshot_landing_page.jpg)

## *"taskr is a quick and easy to use task manager. It helps you keep track of your important tasks and lets you request tasks from your friends!"*

<br>

### taskr strives to make tasking both simple and fun. The intuitive UI created using React.JS makes for a comprehensible and effortless experience. Future updates will increase functionality and complexity by adding user-created "task clusters" where multiple users can collaborate and task together, and making taskr an effective tool for complex task assignments and workflow. 

<hr>
<br>

## Project goals

The main goal of this project is to use React.JS to create a functional frontend web application and corresponding database API for managing my personal tasks. Furthermore it needs to be intuitive and simple and the platform should make implementing future features easy. The scope of this project has been narrowed significantly to fit the project timeline.  

Necessary core functionality:
 - Authentication
 - Tasks (CRUD)
 - Clusters (CRUD)
 - User Profiles
 - Searchbars and filtering
 - Good UX Design


<hr>
<br>

## Features

<br>

### *UX Design*
This project is developed with a UX-first approach where I have used my self as the target audience. My goal is to create an experience that is overall so effortless that even a lazy person like myself will opt for using it when given the choice. Through the development it has been important to consider how to avoid rendering to much information at any given time in order to keep an understated aesthetic.

<br>

### *Custom styling*
taskr uses custom CSS styling along with react bootstrap to create a minimalist, pastel-themed UI that remains recognizable despite being fairly simplistic.

<br>

### *Responsive design*
taskr has been developed and tested for use with both larger screens as well as tablets or phones. In order to ensure a ubiquitous and consistent experience regardless of what device the end user is utilizing.

<br>

### *User Features*
 **Navbar:**  
 To avoid cluttering the screen and distracting the user from their tasks the navbar has a minimalist appearence and offers only navigation to the home (profile) page and authentication. All other navigation occurs intuitively via other user features.  
 ![Screenshot of the navbar](public/screenshots/Screenshot_navbar.jpg)

 **Authentication:**  
 In order to use taskr, a user must sign-up using a free account. This will automatically generate a profile for all registered users and allows them to access taskr anywhere. Registration is kept simple and requires only a valid username and password. In future updates verification may become necessary in order to provide users with a "forgot password?" option.  
![Screenshot of the sign up page](public/screenshots/Screenshot_signup.jpg)

 **Profile:**  
 Once authentication is completed by the user the main page becomes the users profile, from which all authenticated navigation takes place. This is done to avoid needless navigation between different pages. The profile features a section where the user can choose to display personal info (currently name, a short biography, and a profile picture. This will likely be extended with more optional content in future updates), an area displaying relevant statistical information about the user account (currently only the users number of "active tasks". This will also be expanded in future updates).
 ![Screenshot of a sample user profile](public/screenshots/Screenshot_profile.jpg)  

 **Task/Request:**  
 The primary feature of taskr is to create and manage tasks, as well as send task requests to other users, which if they accept, gives them ownership of the task. Tasks/requests are accessed through communication with the database via a custom REST API (created in Django Rest). The user have several options to consider when creating tasks, each of which are displayed when relevant. An authenticated user can easily edit a task/request (for which they are the owner) at any time.
 ![Screenshot of the page for creating a new task](public/screenshots/Screenshot_create_task.jpg)  

**Task Items:**  
Each individual task can be supplied with an optional amount of Task Items (by the task owner). That will appear as a list with new items being rendered below the previous one. The task items can be checked once they are completed, which will automatically move them to the bottom of the item list. This makes taskr useful for managing more complex tasks or things like shoppinglists.  
![Screenshot of a task list](public/screenshots/Screenshot_items.jpg)  

**Task/Request tabs:**  
Logged in users will have access to two tabs directly underneath their profile information which when clicked on determine if either the currents profiles affilated tasks or requests are to be displayed (a third tab will be added for "Clusters" in a future update). Using a combination of back end filtering and conditional rendering in React different tasks/requests are displayed (using the same components) depending on whether or not the user is viewing their own profile or the profile of another user. This makes finding tasks/requests quick and comprehensible.  
![Screenshot of the Request/Task tabs](public/screenshots/Screenshot_tabs.jpg)  

 **Searchbars:**  
 There are two searchbars at the users disposible. The first is a user searchbar, which allows a logged in user to find other registered user by typing (a partial) name or username in the search field. Upon clicking on a search results the user navigates to said users profile. Each profile also contains a task/request searchbar which, similarly, allows the user to search for specific tasks/requests belonging to the current profile and/or authenticated user. 
 ![Screenshot of the task searchbar](public/screenshots/Screenshot_task_search.jpg)  

**Lists:**  
Each aformentioned tab contains a list displaying an overview of each relevant task/request. These preview lists are ordered by due date and whether or not they are complete. This allows the user to obtain an overview of the most urgent tasks at a glance. Each item on the list is collapsable to only its header, giving the user an adjustable overview of the tasks/requests. The lists use the "React-Infinite-scroll" component in place of traditional pagination.This is done to make the UX more seemless.  
![Screenshot of a sample "task preview" list](public/screenshots/Screenshot_list.jpg)  

**Detail Views:**  
taskr provides users with detailed view pages for browsing individual tasks or creating/editing a task. This allows the user to focus entirely on the task at hand (pun intended) without being distracted by other less relevant information. 
![Screenshot of an active task in detail view](public/screenshots/Screenshot_detail.jpg)  

<br>

### Future Features and Implementations

**Clusters:**  
The largest forseeble update to taskr will include allowing for the creation of Task Clusters. A cluster will allow a user to create and manage lots of tasks and requests across multiple user under a single "cluster". By inviting a user to the cluster the user can now view/manage tasks within that cluster (if the cluster owner permits the user). Individual tasks can also be assigned to individual users so that only they can update/complete the task. The functionality provided by clusters would make taskr very useful in real-world workplace situations. It was not included in the scope of this project as it requires **a lot** of time.  

**Permanent records:**  
Another small feature to include in future updates is a permanent record of all tasks. Currently, when a task is deleted, it is completely removed from the database. A more preferable approach to managing old data would be to removed the user content but keep file statistics such as: when it was created, when it was completed, and who completed it. This is not currently included as it is not a priority nor a core function of the app.

**Attach files to tasks:**  
In a smaller future update, taskr will allow users to attach files such as jpg's and pdf's as task items. This would make taskr more useful as it would eliminate the need for users to resort to other means to provide eachother with docs. This has not been included so far as it is not part of taskrs core functionality.

**Follow users:**
A future update would allow a user to follow other users. This will become an important feature once "clusters" are available, and will also provide relevant statistics for further future updates.

<hr>
<br>

## Development

<br>

### *Agile Tools*

#### **User Stories:**
The project utilizes user stories as a method of development. The user stories are categorized into EPICs and provided with MoSCoW prioritization. Developing using user stories ensure that no unnecessary coding is done that wont be include in the production version of the project. All user stories are mapped below:

* Authentication:
   - (M) As a first time user, I can create a user account, so that I can log in to taskr.
   - (M) As a registered user, I can sign in to my account, so that I can access my account privelages.
   - (M) As a site user, I can view my logged in status in the navbar, so that can see if I am logged in.
   - (M) As a site user, I can remain signed in until I choose to sign out, so that I don't have to sign in everytime I open the webpage on the same device.  

* Design (UX):
  - (M) As a first time site user, I can read about taskr's purpose on the homepage, so that I can quickly learn what I need about taskr.
  - (M) As a signed in user, I can view my profile page, so that I can view all my relevant tasks.
  - (M) As a signed in user, I can view completed and uncompleted tasks in seperate fields, ordered by due date and priority, so that I can easily identify which task I should do next.
  - (S) As a signed in user, I can view notifications via the navbar, so that I get a notifications when one of my cluster memberships changes, or I have a new task request.

* User Profiles:
  - (S) As a registered user, I can choose to add personal information and a profile image, so that *I can choose what personal information i want to display to other users.
  - (C) As a signed in user, I can see basic statistics about my tasks on my profile page, so that I can get an overview of how I'm doing.

* Tasks:
  - (M) As a signed in user, I can click a button in my profile page, so that I can add a new task.
  - (M) As a signed in user, I can tick a box for a task, so that I change the task status to "completed".
  - (S) As a site user, I can choose if a task has a high or low priority, so that my prioritzed tasks stand out.
  - (M) As a site user, I can set a due date for a task, so that I can view my tasks in order of urgency.
  - (S) As a site user, I can add task items to a task, so that I can tick of individual items for each task as I progress.
  - (M) As a site user, I can I can type a text description for my task, so that I can remind my self about the task requirements.
  - (M) As a site user, I can click on a tasks edit button, so that I can make changes to my task.
  - (M) As a site user, I can click a button to delete a task, so that it is gone forever.
  - (M) As a site user, I can *choose between a tasks visibility being "public" or "private", *, so that I can set personal tasks that only I can see.
  - (M) As a site user, I can *choose between a tasks visibility being "public" or "private", *, so that I can set personal tasks that only I can see.
  - (M) As a task request recipient, I can click "Accept" or "Reject", so that I can choose whether or not to accept a task.
  - (C) As a site user, I can tick all the items of a task, so that the task automatically completes.
  -(C) As a site user, I can see a progress bar for a task, so that i am aware of what percentage of the task is completed.
  - (C) As a site user, I can comment on another users task, so that I can easily communicate relevant information about the task.
  
* Searchbars and filtering:
    - (M) As a registered user, I can type the name of a task into a searchbar, so that I quickly can find specific tasks.
    - (M) As a signed in user, I can type in a username into a search bar, so that I can click to view that users profile.
    - (M) As a signed in user, I can type a task name into a search bar, so that I can filter through my tasks by name and display only relevant tasks.
    - (S) As a site user, I can search for a specific cluster by name, so that only tasks for the specified cluster are displayed.
    - (C) As a site user, I can click on an ordering option in my search results area, so that my search query tasks are displayed in the order I want.

* Clusters:
    - (S) As a site user, I can assign a task to a custom "cluster", so that I can group my tasks together.
    - (C) As a site user, I can assign a color to a custom cluster, so that my clusters are color-coded.
    - (S) As a cluster creator, I can add users to my cluster, so that I can choose who gets access to the cluster.
    - (S) As a cluster owner, I can assign tasks individually, so that I can distribute the tasks amongst the task members as I see fit.
    - (C) As a cluster owner, I can make another user "owner", so that they are also able to distribute tasks or add members.
    - (S) As a cluster member, I can click a button to leave a cluster, so that I am no longer a member of that cluster.









#### **Kanban Board:**
The Project utilizes Githubs Kanban board via the "projects" tab. The board is used to track the current progress of the projects user stories. So far 23 out of 35 user stories have been completed. See the Kanban [here](https://github.com/fabianlien/taskr/projects/1).

<br>

### *Frontend*

#### **Wire Frames:**
An initial wire frame mock-up was created for a desktop style app. The overall layout in the final version for this project differs quite a bit and was changed in favor of a more conventional layout. See below:  
![Screenshot of wire frame mock-up](public/screenshots/Screenshot_wireframe.jpg)

#### **Developer Role**


<br>

### *Backend*

<hr>
<br>

## Testing

## Deployment

## Credits