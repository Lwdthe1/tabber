module.exports = {
	showDebugMessages: true,
	config: function(prefs){
		if(prefs) {
			if(prefs.showDebugMessages) showDebugMessages = prefs.showDebudMessages;
		}
	},
	run: function(collection, parallelAction, onFinish, handleError){
		if(collection && isFunction(parallelAction) && isFunction(onFinish)) {
			if(collection.length > 0) {
				if(showDebugMessages) console.log("Running actions in parallel.");
				collection.parallelErrorsMap99 = {};
				var numElements = collection.length;
				var numElementsCompleted = 0;

				/*set the proceed function 
				for each parallel action to call when it finishes with an element*/
				this.proceedAfterInParallelAction = function() {
					numElementsCompleted++;
					
					//check if all parallel actions are complete
					if(numElementsCompleted == numElements) {
						//run the onFinish function
						onFinish();
					}
				}
				
				//run the parallel action on each element of the collection
				for(var i = 0; i < numElements; i++) {
					var currentElement = collection[i];
					if(currentElement) {
						//run the parallel action on the element in background
						setTimeout(parallelAction(currentElement), 0);
					}
				}
			} else {
				if(showDebugMessages) {
					console.log("Provided collection is empty.", true);
				}
				if(isFunction(handleError)) {
					//an error handler was provided. handle the error as desired.
					handleError({message:"Provided collection is empty."});
				} else {
					//no error handler was provided. Handle the error by calling the onFinish method by default
					onFinish();
				}
			}
		} else {
			if(showDebugMessages) console.log("Missing necessary arguments. No collection provided.", true);
			if(isFunction(handleError)) handleError({message:"Missing necessary arguments: " + collection + " " + parallelAction + " " + onFinish});
		}
	}
}
