function isFunction(functionToCheck) { 
	var getType = {}; 
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'; 
} 

module.exports = function(showDBMessages) { 
	this.showDebugMessages = !!showDBMessages;

	this.config = function(prefs){ 
		if(prefs) { 
			if(prefs.showDebugMessages) this.showDebugMessages = !!prefs.showDebudMessages; 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	};

	this.removeCollectionDocumentsBy = function (db, collectionName, query) { 
		if(this.showDebugMessages) console.log("Running tabber.removeCollectionDocumentsBy");
		 if(db && collectionName && query) { 
		 	if(this.showDebugMessages) console.log("Removing db collection docs: " + collectionName + " " + query); 
		 	db.collection(collectionName).remove(query); 
	 	} else { 
	 		if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
 		} 
	}; 

	this.removeOneCollectionDocumentBy = function (db, collectionName, query) { 
		if(this.showDebugMessages) console.log("Running tabber.removeOneCollectionDocumentBy"); 
		if(db && collectionName && query) { 
			if(this.showDebugMessages) console.log("Removing db collection doc: " + collectionName + " " + query); 
			db.collection(collectionName).remove(query, true); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	}; 

	this.clearCollection = function (db, collectionName){ 
		if(this.showDebugMessages) console.log("Running tabber.clearCollection"); 
		if(db && collectionName) { 
			db.collection(collectionName).remove({},function(err, removed){}); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	};
	
	this.setCollectionField = function (db, collectionName, setValue) { 
		if(this.showDebugMessages) console.log("Running tabber.setCollectionField"); 
		if(db && collectionName && setValue) { 
			if(this.showDebugMessages) console.log("Setting db collection field: " + collectionName + " " + setValue); 
			db.collection(collectionName).update({}, {$set : setValue}, {upsert:false,multi:true} ); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	};

	this.unsetCollectionField = function (db, collectionName, unsetValue) { 
		if(this.showDebugMessages) console.log("Running tabber.unsetCollectionField"); 
		if(db && collectionName && unsetValue) { 
			if(this.showDebugMessages) console.log("Unsetting db collection field: " + collectionName + " " + unsetValue); 
			db.collection(collectionName).update({}, {$unset : unsetValue}, {upsert:false,multi:true} ); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	};

	this.findOneByAndRun = function (db, collectionName, searchQuery, callback, handleError){ 
		if(this.showDebugMessages) console.log("Running tabber.findOneByAndRun"); 
		if(db && searchQuery && isFunction(callback)) { 
			db.collection(collectionName).findOne(searchQuery,function(err, doc) { 
				if(err || !doc) { 
					// find failed
					if(err) { 
						if(this.showDebugMessages) console.log("Failed to find one doc: " + err.message); 
					} 

					if(isFunction(handleError)) { 
						if(this.showDebugMessages) console.log("Handling error as defined.");
						handleError(err); 
					} 
				} else { 
					//find succeeded 
					if(this.showDebugMessages) console.log("Tabber Found a doc. Running callback: " + JSON.stringify(doc));
					callback(doc); 
				} 
			}); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	};

	this.findByAndRun = function (db, collectionName, searchQuery, callback, handleError){
		if(this.showDebugMessages) console.log("Running tabber.findByAndRun");
		if(db && searchQuery && isFunction(callback)) {
			db.collection(collectionName).find(searchQuery).toArray(function(err, doc) {
				if(err || !doc) { 
					//failed to find the corresponding publication by id and contributorId. 
					if(err) { 
						if(this.showDebugMessages) console.log("Failed to find one doc: " + err.message, true);
					} 

					if(isFunction(handleError)) {
						if(this.showDebugMessages) console.log("Handling error as defined.");
						handleError(err); 
					} 
				} else { 
					//find succeeded 
					if(this.showDebugMessages) console.log("Tabber Found Docs. Running callback: " + JSON.stringify(doc)); 
					callback(doc); 
				} 
			}); 
		} else { 
			if(this.showDebugMessages) console.log("Can't run this tabber. Necessary values missing."); 
		} 
	}; 
}