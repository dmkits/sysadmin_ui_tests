module.exports={
    'Sysadmin Header Tests':function(browser){
       var mainHeader=browser.page.sysadminHeader();

        mainHeader.navigate()
            .waitForElementVisible('body', 1000)
            .assert.visible("@img")
            .assert.title('REPORTS')
            .assert.containsText('@mode', "MODE:test")
            .assert.containsText('@port', "PORT:8080")
            .assert.containsText('@dbName', "DB NAME:GMSSample")
            .assert.containsText('@dbConnectionState', 'Connected')
            .assert.containsText('@user', "USER: sa")
            .assert.visible('@SpartUpParamsBtn')
            .assert.visible('@ReportsConfigBtn')
            .click('@SpartUpParamsBtn');
    },
    'Sysadmin Startup params Tests': function (browser) {
        var paramsPage = browser.page.startUpParams();
        paramsPage
           .waitForElementVisible('@localConfigInfo',1000, true, function(){
                browser.pause(2000, function(){
                    paramsPage.assert.containsText('@localConfigInfo', "Configuration loaded.")
                });
            })
        .click('@loadSettingsBtn', function(){
                browser.pause(5000, function(){
                    paramsPage.assert.containsText('@localConfigInfo', "Configuration reloaded.")
                });
            })
            .waitForElementVisible('@dbServer', 2000)
            .clearValue('@dbServer', function () {
              //  paramsPage.assert.valueContains('@dbServer', '')
                  paramsPage.setValue('@dbServer', '192.168.0.93_false', function () {
                        var mainHeader=browser.page.sysadminHeader();
                        paramsPage
                            .click('@StoreAndReconnectBtn', function(){
                                browser.pause(6000, function(){
                                    paramsPage.assert.containsText('@localConfigInfo', "Configuration saved.")
                                        .assert.containsText('@localConfigInfo', "Failed to connect to database!")
                                });
                            });
                        mainHeader
                            .waitForElementVisible('@dbConnectionState', 1000)
                            .assert.containsText("@dbConnectionState","Failed to connect to database!");
                    });
            })
            .resetDBConfig()
            .waitForElementVisible('@dbName', 1000)
            .clearValue('@dbName', function () {
                //  paramsPage.assert.valueContains('@dbServer', '')
                paramsPage.setValue('@dbName', 'GMSSample38xml_false', function () {
                    var mainHeader=browser.page.sysadminHeader();
                    paramsPage
                        .click('@StoreAndReconnectBtn', function(){
                            browser.pause(1000, function(){
                                paramsPage.assert.containsText('@localConfigInfo', "Configuration saved.")
                                    .assert.containsText('@localConfigInfo', "Failed to connect to database!")
                            });
                        });
                    mainHeader.waitForElementVisible('@dbName', 1000)
                        .assert.containsText("@dbName","GMSSample38xml_false")
                        .waitForElementVisible('@dbConnectionState', 1000)
                        .assert.containsText("@dbConnectionState","Failed to connect to database!");
                });
            })
            .resetDBConfig()
            .waitForElementVisible('@dbUser', 1000)
            .clearValue('@dbUser', function () {
                paramsPage.assert.valueContains('@dbUser', '')
                    .setValue('@dbUser', 'sa1', function () {
                        var mainHeader=browser.page.sysadminHeader();
                        paramsPage.assert.valueContains('@dbUser', 'sa1')
                                  .click('@StoreAndReconnectBtn');
                        mainHeader.waitForElementVisible('@user', 1000)
                            .assert.containsText("@user","sa1")
                            .waitForElementVisible('@dbConnectionState', 1000)
                            .assert.containsText("@dbConnectionState","Failed to connect to database!");
                    });
            })
            .resetDBConfig()
            .waitForElementVisible('@dbPassword', 1000)
            .clearValue('@dbPassword', function () {
                paramsPage.assert.valueContains('@dbPassword', '')
                    .setValue('@dbPassword', 'false', function () {
                        var mainHeader=browser.page.sysadminHeader();
                        paramsPage.assert.valueContains('@dbPassword', 'false')
                            .click('@StoreAndReconnectBtn');
                        mainHeader
                            .waitForElementVisible('@dbConnectionState', 1000)
                            .assert.containsText("@dbConnectionState","Failed to connect to database!");
                    });
            })
        .resetDBConfig();
        browser.end();
    }
};