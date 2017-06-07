module.exports={
    'Open browser': function(browser){
        browser
            .url('http://localhost:8080/sysadmin')
            .assert.title("REPORTS")
            .waitForElementVisible('#sysadmin_app_mode', 1000)
            .waitForElementVisible('#sysadmin_app_port', 1000)
            .waitForElementVisible('#sysadmin_dbName', 1000)
            .waitForElementVisible('#sysadmin_connectToDBState', 1000)
            .waitForElementVisible('#sysadmin_ConnUserName', 1000)
            .assert.containsText('#sysadmin_app_mode',"MODE:test")
            .assert.containsText('#sysadmin_app_port',"PORT:8080")
            .assert.containsText('#sysadmin_dbName',"DB NAME:GMSSample")
            .assert.containsText('#sysadmin_connectToDBState','DB CONNECTION STATE:Failed to connect to database! Reason:Ошибка входа пользователя "sa".')
            .assert.containsText('#sysadmin_ConnUserName',"USER: sa")

            .click('#display_startup_params')
            .pause(1000)

            .assert.containsText('body',"system startup parameters:")
            .assert.containsText('body',"Configuration loaded.")

            .assert.elementPresent('label[for="db.server"]',"label for db.server is present")
            .assert.elementPresent('label[for="db.port"]',"label for db.port  is present")
            .assert.elementPresent('label[for="db.name"]',"label for db.name  is present")
            .assert.elementPresent('label[for="db.user"]',"label for db.user  is present")
            .assert.elementPresent('label[for="db.password"]',"label for db.password  is present")
            .assert.elementPresent('label[for="reports.config"]',"label for reports.config  is present")

            .assert.valueContains('input[id="db.server"]',"192.168.0.93")
            .assert.valueContains('input[id="db.port"]',"1433")
            .assert.valueContains('input[id="db.name"]',"GMSSample")
            .assert.valueContains('input[id="db.user"]',"sa")
            .assert.valueContains('input[id="db.password"]',"GMSgms123")
            .assert.valueContains('input[id="reports.config"]',"")

            .end();
    },
    after : function(browser) {
        browser.end(function() {

        });
    }
};
