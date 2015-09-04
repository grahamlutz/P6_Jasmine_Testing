/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

'use strict';

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not 
         * empty.
         */

        it('have URL that is not empty or undefined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
                expect(allFeeds[i].url).toBeDefined();
            }
        });

        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not 
         * empty.
         */
        it('have name that is not empty or undefined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).not.toBe('');
                expect(allFeeds[i].name).toBeDefined();
            }
        });
    });

    describe('The menu', function() {
        var bodyClass = document.body;
        // ensure the menu element is hidden by default. 

        it('is hidden by default', function() {
            var bodyClassName = 'menu-hidden';

            expect(bodyClass.className).toBe(bodyClassName);
        });
         /* ensures the menu changes visibility when the menu icon
          * is clicked. 
          */
        it('changes visibility when menu icon clicked', function() {
            var menuIcon = $('a.menu-icon-link');
            menuIcon.click();
            expect(bodyClass.className).not.toBe('menu-hidden');

            menuIcon.click();
            expect(bodyClass.className).toBe('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* ensures when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within
         * the .feed container.
         */
        it('are present in .entry', function(done) {
            var entry = $('.entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var currentEntry;
        beforeEach(function(done) {
            loadFeed(0, loadFeed(1, done));
            currentEntry = $('.entry h2').html();
        });
        afterEach(function(done){
            loadFeed(0, done);
        })
        /* ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('changes content', function() {
            console.log(currentEntry);
            console.log($('.entry h2').html());
            expect($('.entry h2').html()).not.toBe(currentEntry);
        });
    });
}());
