# tabber
A library of  mongodb helper functions to make manipulating your db and its collections better (er).

## Installation

  npm install in-parallel --save

## Usage
Initialize inParallel like so:
  ```javascript
  //required tabber
	var Tabber = require('tabber');

  //create a new instance of tabber
  var tabber = new Tabber(true);
  ```
###A Simple Example
  ```javascript
    tabber.config({"showDebugMessages": true});

      tabber.findOneByAndRun(db, NOTIFICATIONS_COLLECTION, {
        userId: 1836
      }, function(notification){
        //success
        if(notification) {
          //do something with it
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
