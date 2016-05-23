"use strict";

module.exports = function(dependencies) {
	var state = "ON";
	var stateLastChangedTimestamp = dependencies.moment();
	var stateLastUpdatedTimestamp = dependencies.moment();

	var handleMessage = function(msg) {
		stateLastUpdatedTimestamp = dependencies.moment();
		var prevState = state;

		if(msg === "BTN_NO") {
			state = "OFF";
		} else if(msg === "BTN_ON") {
			state = "ON";
		}

		if(prevState !== state) {
			stateLastChangedTimestamp = dependencies.moment();
		}
	};

	var getState = function() {
		return {
			state: state,
			stateLastChangedTimestamp: stateLastChangedTimestamp,
			stateLastUpdatedTimestamp: stateLastUpdatedTimestamp
		};
	};

	return {
		handleMessage: handleMessage,
		getState: getState
	}
};