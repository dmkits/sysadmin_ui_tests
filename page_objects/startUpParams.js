var startUpParamsCommands = {
    resetDBConfig: function () {
        var instance=this;
        this.api.pause(1000);
        return instance.waitForElementVisible('@dbServer',1000)
            .waitForElementVisible('@dbPort',1000)
            .waitForElementVisible('@dbName',1000)
            .waitForElementVisible('@dbUser',1000)
            .waitForElementVisible('@dbPassword',1000)
            .waitForElementVisible('@repoConfig',1000)
            .clearValue('@dbServer', function () {
                instance.setValue('@dbServer', '192.168.0.93');
            })
            .clearValue('@dbPort', function () {
                instance.setValue('@dbPort', '1433');
            })
            .clearValue('@dbName', function () {
                instance.setValue('@dbName', 'GMSSample38xml')
            })
            .clearValue('@dbUser', function () {
                instance.setValue('@dbUser', 'sa')
            })
            .clearValue('@dbPassword', function () {
                instance.setValue('@dbPassword', 'GMSgms123')
            })
            .clearValue('@repoConfig', function () {
                instance.setValue('@repoConfig', '');
            })
            .click('@StoreAndReconnectBtn');
    }
};

module.exports={
    commands:[startUpParamsCommands],
    elements:{
        dbServer:'input[id="db.server"]',
        dbPort:'input[id="db.port"]',
        dbName:'input[id="db.name"]',
        dbUser:'input[id="db.user"]',
        dbPassword:'input[id="db.password"]',
        repoConfig:'input[id="reports.config"]',
        loadSettingsBtn:"#SA_startup_params_BtnAppLocalConfigLoad",
        StoreAndReconnectBtn:'#SA_startup_params_BtnAppLocalConfigSaveAndReconnect',
        localConfigInfo:'#sa_startup_params_appLocalConfig'
    }
};
