"use strict";

var chai = require("chai"), expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

var moment = require('moment');

var phgms = require('../index');

function createDependencies() {
	return {
		moment: moment
	};
}

describe('PHGMS calculates information', function() {
	beforeEach(function() {
		this.dependencies = createDependencies();
		this.gms = new phgms(this.dependencies, "OFF");
		this.createMoment = moment();
	});

	context("When state changes", function() {
		beforeEach(function() {
			this.gms.handleMessage("BTN_ON");
		});

		it("should put the state to ON", function() {
			return expect(this.gms.getState()).to.have.property('state').that.is.equal("ON");
		});

		it("should update the stateLastChangedTimestamp", function() {
			return expect(this.gms.getState()).to.have.property('stateLastChangedTimestamp').that.is.deep.equal(moment());
		});	

		it("should update the stateLastUpdatedTimestamp", function() {
			return expect(this.gms.getState()).to.have.property('stateLastUpdatedTimestamp').that.is.deep.equal(moment());
		});
	});

	context("When state remains the same", function() {
		beforeEach(function() {
			this.gms.handleMessage("BTN_OFF");
		});

		it("should retain the state to OFF", function() {
			return expect(this.gms.getState()).to.have.property('state').that.is.equal("OFF");
		});

		it("should not update the stateLastChangedTimestamp", function() {
			return expect(this.gms.getState()).to.have.property('stateLastChangedTimestamp').that.is.deep.equal(this.createMoment);
		});	

		it("should update the stateLastUpdatedTimestamp", function() {
			return expect(this.gms.getState()).to.have.property('stateLastUpdatedTimestamp').that.is.deep.equal(moment());
		});
	});
});