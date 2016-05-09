# tabber
A library of  mongodb helper functions to make manipulating your db and its collections better (er).

## Installation

  npm install in-parallel --save

## Usage
Initialize inParallel like so:
  ```javascript
	//the proceedAfterParallelAction() method is provided
	var tabber = require('tabber');
  ```
###A Simple Example
  ```javascript
  ```
###A Less Simple Example With MongoDB Queries
Imagine you have a bunch of users and each user has a bunch of photos all stored in a mongodb. If you have to get each user's photo and do something with them.
  ```javascript
  	
   ```

## Config

###Debug Messages
  Debug messages are NOT printed to the console by default but you can choose to have them printed like so:
  ```javascript
  	tabber.config({showDebugMessages:true});
  ```  

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release

##Credits
I used this article to learn how to publish npm articles:
https://quickleft.com/blog/creating-and-publishing-a-node-js-module/
