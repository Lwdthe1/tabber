function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = {
	showDebugMessages: false,
	config: function(prefs){
		if(prefs) {
			if(prefs.showDebugMessages) showDebugMessages = prefs.showDebudMessages;
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	removeCollectionDocumentsBy: function (db, collectionName, query) {
		if(db && collectionName && query) {
			if(showDebugMessages) console.log("Removing db collection docs: " + collectionName + " " + query);
			db.collection(collectionName).remove(query);
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	removeOneCollectionDocumentBy: function (db, collectionName, query) {
		if(db && collectionName && query) {
			if(showDebugMessages) console.log("Removing db collection doc: " + collectionName + " " + query);
			db.collection(collectionName).remove(query, true);
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	clearCollection: function (db, collectionName){
		if(db && collectionName) {
			db.collection(collectionName).remove({},function(err, removed){});
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	setCollectionField: function (db, collectionName, setValue) {
		if(db && collectionName && setValue) {
			if(showDebugMessages) console.log("Setting db collection field: " + collectionName + " " + setValue);
			
			db.collection(collectionName).update({},
			        {$set : setValue},
			        {upsert:false,multi:true}
		    	);
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	unsetCollectionField: function (db, collectionName, unsetValue) {
		if(db && collectionName && unsetValue) {
			if(showDebugMessages) console.log("Unsetting db collection field: " + collectionName + " " + unsetValue);
			
			db.collection(collectionName).update({},
		        {$unset : unsetValue},
		        {upsert:false,multi:true}
		    );
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	findOneByAndRun: function (db, collectionName, searchQuery, callback, handleError){
		if(db && searchQuery && isFunction(callback)) {
			db.collection(collectionName).findOne(searchQuery,function(err, doc) {
				if(err || !doc) {
			    		//failed to find the corresponding publication by id and contributorId. 
			    		//insert the new request
			    		if(err) {
			    			if(showDebugMessages) console.log("Failed to find one doc: " + err.message);
			    		}
			    		if(isFunction(handleError)) {
			    			if(showDebugMessages) console.log("Handling error as defined.")
			    			handleError(err);
			    		}
				} else {
					//find succeeded
					//update the request
					if(showDebugMessages) console.log("FOUND ONE DOC. Running callback: " + JSON.stringify(doc));
					callback(doc);
				}
			});
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	},
	findByAndRun: function (db, collectionName, searchQuery, callback, handleError){
		if(db && searchQuery && isFunction(callback)) {
			db.collection(collectionName).find(searchQuery).toArray(function(err, doc) {
				if(err || !doc) {
			    		//failed to find the corresponding publication by id and contributorId. 
			    		//insert the new request
			    		if(err) {
			    			if(showDebugMessages) console.log("Failed to find one doc: " + err.message, true);
			    		}
			    		if(isFunction(handleError)) {
			    			if(showDebugMessages) console.log("Handling error as defined.")
			    			handleError(err);
			    		}
				} else {
					//find succeeded
					//update the request
					if(showDebugMessages) console.log("FOUND ONE DOC. Running callback: " + JSON.stringify(doc));
					callback(doc);
				}
			});
		} else {
			if(showDebugMessages) console.log("Can't run this tabber. Necessary values missing.");
		}
	}
}
