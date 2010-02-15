/**
 * JSTest is an easy-to-use, non-polluting JavaScript unit testing framework.
 * Copyright (C) 2009 - 2010  William Bowers
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * @author William Bowers <william.bowers@gmail.com>
 */

// JSTEST ----------------------------------------------------------------------

/**
 * The JSTest namespace object - contains all of the JSTest code.
 */
var JSTest = {
	/**
	 * Holds all of the cases that have been defined throughout
	 * the life of the program (i.e., one page load).
	 */
	cases: [],
	
	customAssertMethods: {},
	
	setCustomAssertMethods: function (object) {
		JSTest.utils.extend(JSTest.customAssertMethods, object);
	},
	
	/**
	 * Utility methods necessary for the correct operation of JSTest,
	 * placed here to avoid naming collisions.
	 */
	utils: {
		/** 
		 * A simple utility method that serializes an object (turns it
		 * into its string representation).
		 */
		toJSON: function (object) {
			switch (typeof(object))
			{
			case 'undefined':
				return 'undefined';
			case 'object':
				if (!object) {
					// 'object' is null.
					return 'null';
				} else if (object instanceof Array) {
					// 'object' is an Array.
					var json = '[';
					
					for (var i = 0; i < object.length; i++)
						json += JSTest.utils.toJSON(object[i]) + ', ';
					
					return json.replace(/, $/, '') + ']';
				} else if (object instanceof Date) {
					// 'object' is a Date.
					// Taken from http://www.json.org/json2.js
					function f (n) {
						// Format integers to have at least two digits.
						return n < 10 ? '0' + n : n;
					}
					
					return '"' +
						   object.getUTCFullYear()	   + '-' +
						   f(object.getUTCMonth() + 1) + '-' +
						   f(object.getUTCDate())	   + ' ' +
						   f(object.getUTCHours())	   + ':' +
						   f(object.getUTCMinutes())   + ':' +
						   f(object.getUTCSeconds())   +
						   '"';
				} else {
					var json = '{';
					
					for (var key in object)
						if (object.hasOwnProperty(key))
							json += key + ': ' + JSTest.utils.toJSON(object[key]) + ', ';
					
					return json.replace(/, $/, '') + '}';
				}
			case 'function':
				return object.toString();
			case 'string':
				return '"' + object.replace(/"/g, '\\"') + '"';
			case 'number':
				return object;
			case 'boolean':
				return object.toString();
			}
		},
		
		/**
		 * Returns a stack trace for the given error as an array of objects,
		 * each referencing a file and a line number.
		 */
		getStackTrace: function (error) {
			var stack = [];
			
			if (error.stack) { // Firefox
				var lines = error.stack.split('\n');
				
				for (var i = 0; i < lines.length; i++) {
					if (!lines[i].match(/\([^\)]*\)@.*:[0-9]+/i))
						continue;
					
					var bits = lines[i].split(/\(([^\)]*)\)@(.*):([0-9]+)/i);
					stack.push({
						file: bits[2],
						line: parseInt(bits[3])
					});
				}
			} else if (window.opera && error.message) { // Opera
				/* not tested, placeholder for now
				var lines = error.message.split('\n');
				
				for (var i = 0; i < lines.length; i++) {
					if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
						var line = lines[i];
						
						if (lines[i + 1]) {
							line += ' at ' + lines[i + 1];
							i++;
						}
						
						stack.push(line)
					}
				}
				*/
			}
			
			return stack;
		},
		
		/**
		 * Applies the properties of object2 to object1.
		 * 
		 * EXAMPLE
		 * 
		 * 		var myObject = { foo: 'foo', bar: 'bar' };
		 * 		JSTest.utils.extend(myObject, { baz: 'baz' });
		 * 		
		 * 		myObject.baz // 'baz'
		 */
		extend: function (mainObject) {
			var args = JSTest.utils.argsToArray(arguments).slice(1);
			
			if (args.length == 0)
				return mainObject;
			
			if (args.length > 1) {
				for (var i in args) {
					mainObject = JSTest.utils.extend(mainObject, args[i]);
				}
			} else {
				var extObject = args[0];
				
				for (var key in extObject) {
					if (extObject.hasOwnProperty(key)) {
						mainObject[key] = extObject[key];
					}
				}
			}
			
			return mainObject;
		},
		
		/**
		 * Returns true if string1 starts with the value of string2.
		 */
		startsWith: function (string1, string2) {
			return string1.match(new RegExp('^' + string2)) != null;
		},
		
		/**
		 * Takes an arguments object and turns it into an array.
		 */
		argsToArray: function (arguments) {
			var args = [];
			
			for (var i = 0; i < arguments.length; i++)
				args.push(arguments[i]);
			
			return args;
		},
		
		/**
		 * Returns a copy of 'object'.
		 */
		copy: function (object, newProperties) {
			var copy = {};
			var prop;
			
			for (var property in object) {
				prop = object[property];
				copy[property] = (prop && typeof(prop) == 'object') ? prop.copy() : prop;
			}
			
			return newProperties ? JSTest.utils.extend(copy, newProperties.copy()) : copy;
		},
		
		/**
		 * Returns true if 'object' is empty. That means it's an empty array,
		 * an empty string, null, or undefined.
		 */
		isEmpty: function (object) {
			if (object == null)
				return true;
			
			if (object == undefined)
				return true;
			
			if (object == '')
				return true;
			
			if (object instanceof Array)
				return object.length == 0;
			
			return false;
		},
	},
	
	/**
	 * A JSTest handler is a proxy object that takes output from a JSTest run
	 * and displays it in whatever medium the handler chooses. The 'handlers'
	 * property of JSTest contains JSTest's default handlers, so you can jump
	 * right in and start using it.
	 */
	handlers: {
		/**
		 * This is the JSTest handler contract. Each handler you write should
		 * define most, if not all, of these methods to ensure you get the
		 * most out of JSTest's output.
		 */
		IOutputHandler: function (definition) {
			return function () {
				return JSTest.utils.extend({
					/**
					 * Called when a test case has no tests, just in case you'd like to
					 * alert the person running the tests.
					 */
					noTests: function () {},
					
					/**
					 * Called before every test case.
					 */
					startTestCase: function (caseName) {},
					
					/**
					 * Called before every test.
					 */
					startTest: function (caseName, testName) {},
					
					/**
					 * Called when a test fails.
					 */
					testError: function (caseName, testName, errorMessage) {},
					
					/**
					 * Called after a test runs, whether or not it fails.
					 */
					testResult: function (caseName, testName, passed) {},
					
					/**
					 * Called after a test case is run.
					 */
					testCaseResult: function (caseName, testsRun, testsPassed, testsFailed) {},
					
					/**
					 * Called after a complete run (of multiple test cases).
					 */
					runResult: function (casesRun, casesPassed, casesFailed) {}
				}, definition);
			};
		}
	},
	
	/**
	 * TestCases are the objects that contain all of your tests and the logic
	 * for running them.
	 * 
	 * To create a test case, you create a new 'instance' of this class and
	 * pass in an object containing your individual tests and setup/teardown
	 * methods
	 */
	TestCase: function (tests)
	{
		var testCase = {
			/**
			 * Performs the actual tests, along with the setup and teardown for
			 * the entire case and for each test individually.
			 */
			run: function (verbose, handler) {
				this.tests.handler = handler;
				
				// Default to false.
				verbose = verbose || false;
				
				var tests = this.tests;
				var testCount = 0;
				var failedCount = 0;
				
				// Perform case-level initialization.
				tests.init();
				
				// Output the startTestCase message.
				handler.startTestCase(tests.name);
				
				// Run each test.
				for (var property in tests) {
					if (tests.hasOwnProperty(property) && JSTest.utils.startsWith(property, 'test') &&
						typeof(tests[property]) == 'function') {
						testCount++;
						var passed = true;
						var error;
						
						if (verbose)
							handler.startTest(tests.name, property);
						
						tests.setup();
						try {
							tests[property]();
						} catch (e) {
							passed = false;
							error = e;
							failedCount++;
						}
						tests.cleanup();
						
						if (verbose)
							handler.testResult(tests.name, property, passed);
						
						if (!passed)
							handler.testError(tests.name, property, error);
					}
				}
				
				// Perform case-level cleanup.
				tests.teardown();
				
				if (testCount == 0) {
					handler.noTests();
					return null;
				}
				
				handler.testCaseResult(tests.name, testCount, testCount - failedCount,
					failedCount);
				
				// Return whether all the tests succeeded (failedCount == 0).
				return failedCount == 0;
			},
			
			/**
			 * The object that holds the tests, the setup/teardown methods for the
			 * case, and the very-important assertion methods.
			 */
			tests: JSTest.utils.extend({
					// Defaults.
					handler: null,
					init: function () {},
					setup: function () {},
					cleanup: function () {},
					teardown: function () {}
				}, { // Utilities.
					message: function (message) {
						this.handler.testMessage(this.name, this.currentTest, message);
					},
				}, { // Assertion methods.
					/**
					 * The generic assertion method. If pass !== true throw an error
					 * with the given message and an optional user-defined message.
					 */
					assert: function (pass, message, customMessage) {
						if (pass !== true) {
							message = customMessage ? message + ': ' + customMessage : message;
							throw new Error(message);
						}
					},
					
					/**
					 * Use this when you want to explicitly fail a test.
					 */
					fail: function (message) {
						throw new Error('FAIL: ' + message);
					},
					
					/**
					 * Always fails. Used as a reminder to whoever's running the tests
					 * that there's more to be done.
					 */
					todo: function (message) {
						throw new Error('TODO: ' + message);
					},
					
					/**
					 * Asserts that 'value' is true.
					 */
					assertTrue: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertTrue: got ' + json(value);
						this.assert(value === true, message, customMessage);
					},
				
					/**
					 * Asserts that 'value' is false.
					 */
					assertFalse: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertFalse: got ' + json(value);
						this.assert(value === false, message, customMessage);
					},
					
					/**
					 * Asserts that 'value1' and 'value2' are equal in value. If 'matchType'
					 * is true, it also asserts they are equal in type.
					 */
					assertEqual: function (value1, value2, matchType, customMessage) {
						var json = JSTest.utils.toJSON;
					
						var result;
						var operator;
					
						if (matchType) {
							result = value1 === value2;
							operator = '===';
						} else {
							result = value1 == value2;
							operator = '==';
						}
						
						var message = 'assertEqual: ' + json(value1) + ' does not ' +
							operator + ' ' + json(value2);
						this.assert(result === true, message, customMessage);
					},
				
					/**
					 * Asserts that 'value1' and 'value2' are not equal in value. If 'matchType'
					 * is true, it only asserts they are not equal in type.
					 */
					assertNotEqual: function (value1, value2, matchType, customMessage) {
						var json = JSTest.utils.toJSON;
					
						var result;
						var operator;
					
						if (matchType) {
							result = value1 === value2;
							operator = '===';
						} else {
							result = value1 == value2;
							operator = '==';
						}
						
						var message = 'assertNotEqual: ' + json(value1) + ' ' + operator +
							' ' + json(value2);
						this.assert(result === false, message, customMessage);
					},
					
					/**
					 * Asserts that 'regex' matches 'value'.
					 */
					assertMatch: function (regex, value, customMessage) {
						var message = 'assertMatch: ' + regex +
							' does not match ' + value;
						this.assert(regex.test(value), message, customMessage);
					},
					
					/**
					 * Asserts that 'regex' matches 'value'.
					 */
					assertNotMatch: function (regex, value, customMessage) {
						var message = 'assertNotMatch: ' + regex +
							' matches ' + value;
						this.assert(!regex.test(value), message, customMessage);
					},
					
					/**
					 * Asserts that 'value' has the type specified by 'type'.
					 */
					assertType: function (value, type, customMessage) {
						var message = 'assertType: ' + typeof(value) + ' != ' + type;
						this.assert(typeof(value) == type, message, customMessage);
					},
					
					/**
					 * Asserts that 'value' does not have the type specified by 'type'.
					 */
					assertNotType: function (value, type, customMessage) {
						var message = 'assertNotType: ' + typeof(value) + ' == ' + type;
						this.assert(typeof(value) != type, message, customMessage);
					},
					
					/**
					 * Asserts that 'value1' has the same type as 'value2'.
					 */
					assertSameType: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertSameType: ' + json(value1) + ' and ' +
							json(value2) + ' are not the same type (' +
							typeof(value1) + ' and ' + typeof(value2) + ')';
						this.assert(typeof(value1) == typeof(value2), message, customMessage);
					},

					/**
					 * Asserts that 'value1' does not have the same type as 'value2'.
					 */
					assertNotSameType: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNotSameType: ' + json(value1) + ' and ' +
							json(value2) + ' are the same type (' + typeof(value1) + ')';
						this.assert(typeof(value1) != typeof(value2), message, customMessage);
					},
					
					/**
					 * Asserts that 'value' is null.
					 */
					assertNull: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNull: ' + json(value) + ' is not null';
						this.assert(value === null, message, customMessage);
					},

					/**
					 * Asserts that 'value' is undefined.
					 */
					assertUndefined: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertUndefined: ' + json(value) + ' is not undefined';
						this.assert(value === undefined, message, customMessage);
					},

					/**
					 * Asserts that 'value' is null.
					 */
					assertNotNull: function (value, customMessage) {
						var message = 'assertNotNull: value is null';
						this.assert(value !== null, message, customMessage);
					},

					/**
					 * Asserts that 'value' is undefined.
					 */
					assertNotUndefined: function (value, customMessage) {
						var message = 'assertNotUndefined: value is undefined';
						this.assert(value !== undefined, message, customMessage);
					},
					
					/**
					 * Asserts that isNaN(value) returns true.
					 */
					assertNaN: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNaN: ' + json(value) + ' is a number';
						this.assert(isNaN(value), message, customMessage);
					},
					
					/**
					 * Asserts that isNaN(value) returns false.
					 */
					assertNotNaN: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNotNaN: ' + json(value) + ' is not a number';
						this.assert(!isNaN(value), message, customMessage);
					},
					
					/**
					 * Asserts that 'value1' is greater than 'value2'.
					 */
					assertGreaterThan: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertGreaterThan: ' + json(value1) + ' not > ' +
							json(value2);
						this.assert(value1 > value2, message, customMessage);
					},
					
					/**
					 * Asserts that 'value1' is less than 'value2'.
					 */
					assertLessThan: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertLessThan: ' + json(value1) + ' not < ' +
							json(value2);
						this.assert(value1 < value2, message, customMessage);
					},
					
					/**
					 * Asserts that 'value1' is greater than or equal to 'value2'.
					 */
					assertGreaterThanOrEqual: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertGreaterThanOrEqual: ' + json(value1) +
							' not >= ' + json(value2);
						this.assert(value1 >= value2, message, customMessage);
					},

					/**
					 * Asserts that 'value1' is less than or equal to 'value2'.
					 */
					assertLessThanOrEqual: function (value1, value2, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertLessThanOrEqual: ' + json(value1) +
							' not <= ' + json(value2);
						this.assert(value1 <= value2, message, customMessage);
					},
				
					/**
					 * Asserts that 'func' raises an exception of type 'ErrorClass' when
					 * called with the rest of the arguments passed in.
					 */
					assertRaises: function (ErrorClass, func, customMessage) {
						var args = JSTest.utils.argsToArray(arguments).slice(3);
						var raised = false;
						
						try {
							func.apply(this, args);
						} catch (e) {
							if (e instanceof ErrorClass)
								raised = true;
						}
						
						var message = 'assertRaises: Exception was not raised';
						this.assert(raised, message, customMessage);
					},
					
					/**
					 * Asserts that 'func' does not raise an exception of type 'ErrorClass'
					 * when called with the rest of the arguments passed in.
					 */
					assertNotRaises: function (ErrorClass, func, customMessage) {
						var args = JSTest.utils.argsToArray(arguments).slice(3);
						var raised = false;
						
						try {
							func.apply(this, args);
						} catch (e) {
							if (e instanceof ErrorClass)
								raised = true;
						}
						
						var message = 'assertNotRaises: Exception was raised';
						this.assert(!raised, message, customMessage);
					},
					
					/**
					 * Asserts that 'object' has a property named by 'property'.
					 */
					assertHasProperty: function (object, property, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertHasProperty: ' + json(object) +
							' does not have property \'' + property + '\'';
						this.assert(property in object, message, customMessage);
					},
					
					/**
					 * Asserts that 'object' does not have a property named by
					 * 'property'.
					 */
					assertNotHasProperty: function (object, property, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNotHasProperty: ' + json(object) +
							' has property \'' + property + '\'';
						this.assert(!(property in object), message, customMessage);
					},
					
					/**
					 * Asserts that 'object' is empty. That means it's an empty array,
					 * an empty string, null, or undefined.
					 */
					assertEmpty: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertEmpty: ' + json(value) +
							' is not empty';
						this.assert(JSTest.utils.isEmpty(value), message, customMessage);
					},
					
					/**
					 * Asserts that 'object' is not empty.
					 */
					assertNotEmpty: function (value, customMessage) {
						var json = JSTest.utils.toJSON;
						
						var message = 'assertNotEmpty: ' + json(value) +
							' is empty';
						this.assert(!JSTest.utils.isEmpty(value), message, customMessage);
					}
				}, JSTest.customAssertMethods, tests),
		};
		
		// Add this test to the global list of tests.
		JSTest.cases.push(testCase);
		
		return testCase;
	},
	
	/**
	 * Runs all of the test cases that have been defined up until the point
	 * at which this method is called.
	 */
	run: function (verbose, HandlerClass) {
		if (this.cases.length == 0)
			return;
		
		// Default to false.
		verbose = verbose || false;
		HandlerClass = HandlerClass || JSTest.DefaultHandler;
		var handlerArgs = JSTest.utils.argsToArray(arguments).splice(2);
		
		var casesRun = 0;
		var failedCases = 0;
		
		for (var i = 0; i < this.cases.length; i++) {
			casesRun++;
			
			var result = this.cases[i].run(verbose, HandlerClass.apply(this, handlerArgs));
			
			if (result === false) {
				failedCases++;
			}
		}
	}
};

// STOCK HANDLERS ----------------------------------------------------------------------

/**
 * The default Firebug handler. Simply prints normal output using
 * console.info() and error output using console.error(). Firebug
 * must be installed and enabled for this handler to work.
 */
JSTest.handlers.FirebugHandler = function () {
	return {
		pad: '  ',
		bullet: ' - ',
		
		noTests: function () {
			console.info(this.bullet + 'No tests to run');
		},
		
		startTestCase: function (caseName) {
			caseName = caseName || '<No Name>';
			console.info('Case: ' + caseName);
		},
		
		startTest: function (caseName, testName) {
			console.info(this.bullet + 'Running \'' + testName + '\'');
		},
		
		testMessage: function (caseName, testName, message) {
			
		},
		
		testError: function (caseName, testName, error) {
			var text = this.bullet + testName + '() failed' + ': ' + error.message;
			console.error(text);
		},
		
		testResult: function (caseName, testName, passed) {
			var status = passed ? 'pass' : 'fail';
			console.info(this.pad + this.bullet + status);
		},
		
		testCaseResult: function (caseName, testsRun, testsPassed, testsFailed) {
			if (testsFailed == 0) {
				if (testsPassed > 1)
					console.info(this.bullet + 'All ' + testsRun + ' tests passed');
			} else {
				console.info(this.bullet + testsFailed + ' test' +
					(testsFailed != 1 ? 's' : '') + ' failed');
			}
		},
		
		runResult: function (casesRun, casesPassed, casesFailed) {
			if (casesFailed == 0) {
				console.info('ALL TESTS RAN SUCCESSFULLY');
			} else {
				console.error(casesFailed + ' TEST SUITE' +
				 	(casesFailed != 1 ? 'S' : '') + ' RAN WITH ERRORS');
			}
		},
	};
};

/**
 * A simple html handler. Must be initialized with a block-level html
 * element for its information for it to work correctly.
 */
JSTest.handlers.HTMLHandler = function (container) {
	var headers = ['test', 'status', 'message'];
	var hiddenHeaders = ['test'];
	var numHeaders = 0;
	
	var table = document.createElement('table');
	table.setAttribute('class', 'jstest-test-case');
	container.appendChild(table);
	
	var caption = document.createElement('caption');
	table.appendChild(caption);
	
	var thead = document.createElement('thead');
	var headrow = document.createElement('tr');
	thead.appendChild(headrow);
	table.appendChild(thead);
	
	for (var i in headers) {
		var header = headers[i];
		
		if (typeof(header) == 'function')
			continue;
		
		numHeaders++;
		
		var th = document.createElement('th');
		th.setAttribute('class', header);
		headrow.appendChild(th);
		
		if (hiddenHeaders.indexOf(header) == -1)
			th.appendChild(document.createTextNode(header));
	}
	
	return {
		utils: {
			getLastTest: function () {
				return table.lastChild;
			},
			
			getTestColumn: function (column, testrow) {
				testrow = testrow || this.getLastTest();
				
				for (var i in testrow.childNodes) {
					var child = testrow.childNodes[i];
					if (child.getAttribute('class') == column)
						return child;
				}
				
				return null;
			},
		},
		
		noTests: function () {
			var text = 'No tests to run';
			
			var row = document.createElement('tr');
			table.appendChild(row);
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(text));
			td.setAttribute('colspan', numHeaders);
			row.appendChild(td);
		},
	
		startTestCase: function (caseName) {
			caseName = caseName || '<No Name>';
			
			// Output the title.
			caption.appendChild(document.createTextNode(caseName));
		},
	
		startTest: function (caseName, testName) {
			var testrow = document.createElement('tr');
			table.appendChild(testrow);
			
			for (var i in headers) {
				var header = headers[i];
				
				if (typeof(header) == 'function')
					continue;
				
				var td = document.createElement('td');
				td.setAttribute('class', header);
				testrow.appendChild(td);
			}
			
			var testcol = this.utils.getTestColumn('test');
			testcol.appendChild(document.createTextNode(testName));
		},
		
		testMessage: function (caseName, testName, message) {
			var testcol = this.utils.getTestColumn('message');
			
			var span = document.createElement('span');
			span.setAttribute('class', 'jstest-test-message pass');
			var image = document.createElement('img');
			image.setAttribute('src', 'tick.png');
			span.appendChild(image);
			span.appendChild(document.createTextNode(message));
			
			testcol.appendChild(span);
		},
		
		testError: function (caseName, testName, error) {
			var testcol = this.utils.getTestColumn('message');
			
			var span = document.createElement('span');
			span.setAttribute('class', 'jstest-test-message fail');
			var image = document.createElement('img');
			image.setAttribute('src', 'cancel.png');
			span.appendChild(image);
			span.appendChild(document.createTextNode(error.message));
			
			testcol.appendChild(span);
		},
	
		testResult: function (caseName, testName, passed) {
			var testrow = this.utils.getLastTest();
			
			var status = passed ? 'pass' : 'fail';
			testrow.setAttribute('class', status);
			
			var testcol = this.utils.getTestColumn('status');
			testcol.appendChild(document.createTextNode(status));
		},
	
		testCaseResult: function (caseName, testsRun, testsPassed, testsFailed) {
			var span = document.createElement('span');
			span.setAttribute('class', 'test-case-result-label');
			caption.appendChild(span);
			
			if (testsFailed > 0) {
				var label = testsFailed + ' of ' + testsRun + ' tests failed';
			} else {
				var label = 'All tests passed';
			}
			
			span.setAttribute('class', span.getAttribute('class') + ' ' +
				(testsFailed > 0 ? 'fail' : 'pass'));
			span.appendChild(document.createTextNode(label));
		},
		
		runResult: function (casesRun, casesPassed, casesFailed) {
			
		},
	};
};

// CONFIG ----------------------------------------------------------------------

JSTest.DefaultHandler = JSTest.handlers.FirebugHandler;
