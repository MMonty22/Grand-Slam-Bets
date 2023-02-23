# Grand Slam Bets

## How to Install
- Once in this application's GitHub repository, create a copy for yourself by clicking the fork button. In your own fork, click the 'Code' button and select SSH to copy the SSH key.
- Open your Command Line Interface and go to the directory where you want to store your new repo. Type in 'git clone' followed by the SSH key you copied and press enter to run the command.
- Then simply head into that new directory to begin working with the application.

## Setup

- Now that you have your own version you can get started by running a few commands in the terminal to get the backend up and running:

```
/phase-5-proj$ bundle install 
/phase-5-proj$ rails db:migrate
/phase-5-proj$ rails db:seed
/phase-5-proj$ rails s  
```

This will run the backend server on http://localhost:3000/.

- For the frontend:

```
/phase-5-proj$ cd client
/phase-5-proj/client$ npm install
/phase-5-proj/client$ npm start
```

This will run the frontend server on http://localhost:4000/.

## How to Use
- Create an account by clicking on the create account button and filling in the corresponding fields and submitting the form
- Login by clicking the login button then filling out the username and password fields and submitting the login form
- Once logged in you can do the following:
  - View the bets and comments you made separated by today's date and older ones
  - Create a game with the teams and starting pitchers
  - When the game is created the database of pitchers and hitters will be connected to that game
    - The hitters for that game will have certain stats calculated based on the pitcher they are facing for that game
  - Use the data on the page for the game to make an informed decision then create one or more bets
  - View all of the bets for each game and give your thoughts on the bet by clicking the leave a comment button or see what everyone else is saying by clicking the see comments button
  - Back on your home page you can edit or delete your bets and comments from today
    - The old bets and comments can not be edited but can be deleted
  - The next day when the bet is now an old bet it can be given a result
    - Simply click the enter result button then click the W for win or L for loss
    - This will update the user's record and the bet's result