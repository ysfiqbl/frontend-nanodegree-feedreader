/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
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


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL and the URL not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name and the name not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* The test suite is about the menu and tests menu and menu element
     * show/hide functionality.
     */
    describe('The Menu', function() {
        var body = $('body');

        /* Test that ensures the menu element is hidden by default.
         */
        it('is be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes visibility when the menu icon is clicked.
          */
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This test suite named "Initial Entries" test the loading of feeds
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('are in the container', function(done) {
            expect($('.feed .entry-link').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite checks if new feeds get loaded.
     */
    describe('New Feed Section', function() {
        var firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed .entry-link').attr('href');
            });
            loadFeed(1, function() {
                secondFeed = $('.feed .entry-link').attr('href');
                done();
            });
        });

        /* Test that ensures that when a new feed is loaded by the loadFeed function
         * the content actually changes.
         */
        it('is different from previous feed', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });

}());
