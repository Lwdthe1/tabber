# tabber
A library of  mongodb helper functions to make manipulating your db and its collections better (er).

## Installation

  npm install tabber --save

## Usage
Initialize inParallel like so:
  ```javascript
  //require tabber
  var Tabber = require('tabber');

  //create a new instance of tabber
  var tabber = new Tabber(true);
  ```
###A Simple Example
You could use tabber to find one user by a unique key-value pair in your mongodb and then use tabber again to find all notifications that belong to that user.
  ```javascript
      tabber.findOneByAndRun(db, "usersCollection", {
        email: "uniqueUserEmail@coolsite.com"
      }, function(user){
        //success
        if(user) {
          //do something with it
          tabber.findByAndRun(db, "notificationsCollection", {
            userId: user._id
          }, function(notifications){
            //success
            if(notifications) {
              //do something with the user's notifications
            }
          }, function(err){
            //handle the error
          });
        }
      }, function(err){
        //handle the error
      });

  ```

## Config

###Debug Messages
  Debug messages are NOT printed to the console by default but you can choose to have them printed like so:
  ```javascript
  	var tabber = new Tabber(false);

    //OR 

    var tabber = new Tabber();
  ```  

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release

##Credits
I used this article to learn how to publish npm articles:
https://quickleft.com/blog/creating-and-publishing-a-node-js-module/
