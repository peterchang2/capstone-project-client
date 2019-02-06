# WhiskeyVerse Capstone Project

### How It Works
Once the user sign up and sign in, the user can browse a Whiskey List and add an item to a Favorites List and/or Wish List. In the Favorites List the user can view all the items that were added and delete an item or update the user score. In the Wish List the user can view all the added items and delete an item.

### Links
- Front End Repo: https://github.com/peterchang2/whiskeyverse-project-client
- Back End Repo: https://github.com/peterchang2/whiskeyverse-project-api
- Deployed Client: https://peterchang2.github.io/whiskeyverse-project-client/#/
- Heroku: https://smokeyverse.herokuapp.com/

### Install Instruction
* Fork and clone this repository.
* Create a new branch, `training`, for your work.
* Checkout to the `training` branch.
* Install dependencies with `npm install`.
* Run `npm start` to run website on local.

### Technologies
* React
* JavaScript
* JSX
* HTML
* BootStrap
* SASS
* Material-UI Framework
* Material-UI-DataTables

### Screenshot
![screenshot](https://i.imgur.com/ZXDCfjT.png?1)

### Wireframes
![wireframes](https://i.imgur.com/ol8DMl8.jpg?2)

### User Stories
* User can sign up.
* User can sign in.
* User can change password.
* User can sign out.
* User can view a seeded list of whiskey.
* User can add whiskey to a Favorites List or Wish List.
* User can update a user score for a whiskey and delete a whiskey. in Favorites List.
* User can delete a whiskey in the Wish List.

### Unsolved Problems, Future Implementations
The application is functional but it can use better styling and further logic improvement. Future implementations may include user upload for whiskey that is not on the list. The seeded data can also be updated yearly and refactored with more information. A search function and pagination for the whiskey table will make the site more user friendly.

### Thought Process and Planning
The process started with determining what to use for the back end infracture. For this application it makes sense to use Rails for the relational tables for the User and Whiskeys. I broke down the building process in the chunks between the Whiskey List, Favorite List and Wish List. Each list has an INDEX action to show all and SHOW action to show an individual whiskey with it's appropriate route. Troubleshooting each chunks upon completion to ensure functionality before moving to the next chunk. Styling was saved until the last day of production.
