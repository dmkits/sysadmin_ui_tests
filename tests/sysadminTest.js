module.exports={
    'Open browser': function(browser){
        browser
            .url('http://localhost:8080/sysadmin')
            .waitForElementVisible('#sysadmin_TopImg', 1000)
    },
    after : function(browser) {
        browser.end(function() {

        });
    }
};
