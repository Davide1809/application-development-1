# Git Notes - Week 2

## Local Vs. Remote Repositories

- **Local Repository**: Your local repository resides on your machine, so you can create and work on your repository offline anytime you wish.
- **Remote Repository**: Remote repositories are hosted on servers (like GitHub). This is where the entire team comes together as one single repository of shared code. You develop and code all changes within your local repository, and then transfer those changes (push) from your local repository to your remote repository so that others can view them.

## Repository, Commit, Branch

- A **repository** is the main folder for a project. A repository contains all the files associated with a specific project and a hidden folder, called `.git`, which maintains a record of all the changes that have ever occurred to the project repository. 
- A **commit** is considered the equivalent of a snapshot in time: every commit records the state of the project and includes a message that describes what was changed during that commit. Writing descriptive commit messages is like a way to leave yourself and others helpful notes during the progression of the project. 
- A **branch** is created to allow multiple developers to work on different features concurrently without interfering with each other. Main branches are usually called `main`.

## Staging Area

The **staging area** is the intermediate area where the files are kept before they are committed. Here, you can review all the modifications you made and specify which modifications to include in the upcoming commit using the `git add` command. The staging area allows you to select which files to commit, even if you've made modifications to several files; for example, if five files were changed, you could commit the modifications to three of them in the next commit and leave the others uncommitted for later. In short, the staging area is your way of deciding to create the next snapshot of the repository using only the changes that were made to specific files.

## Push vs Pull

- When you **push** changes, you upload your locally modified files to a remote repository, thus allowing you to share with your teammates all of the work that you have done. 
- When you **pull** changes, you're doing the opposite of pushing; you are downloading all of the most current changes from the remote repository to your local repository. A good practice before starting to work on any new file is to always "pull" the changes first, so you will be working from the most current codebase.

## .gitignore

A **.gitignore** file can be viewed as Git's "do not track" allocation list. The file lists all files and folders that should be ignored by Git, including the node_modules directory, build files, log files and .env files containing sensitive information that we do not want to track in our repository. Keeping these files out of our repository will help us keep the contents of our repository limited to the actual source code and prevent cluttering it with files that are automatically generated or that we do not want to share.

## README

A **README** file is the way to welcome new visitors to your project and to provide instructions on how to use it. The last thing a visitor sees when they enter your repository is your README, and you want to create an attractive first impression, so take the time to create a well-written README that explains what your project does, how to install it, and how to use it, along with any other helpful information, like links to other useful resources. Having a well-written README will create a more professional appearance for your project and will assist others in contributing to your project.