define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
     var steps = [ // initialize to the same value as what's set in config.json for consistency
            { "label": "Step 1", "key": "step1" }
        ];
        var currentStep = steps[0].key;
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        console.log('data-----'+data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );
        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        console.log(inArguments);
        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }
    function onGetTokens(tokens) {
        console.log('tokens----------'+tokens);
        authTokens = tokens;
    }
    function onGetEndpoints(endpoints) {
        console.log('endpoints-----------'+endpoints);
    }
    function save() {
        var header = $('#header').val();
        var messagename = $('#messagename').val();
        var sendername = $('#sendername').val();
        var messagename = $('#messagename').val();
        var messagesubject = $('#messagesubject').val();
        var messagebody = $('#messagebody').val();
        var calltoactionlabel = $('#calltoactionlabel').val();
        var calltoactionurl = $('#calltoactionurl').val();
       /* payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{InteractionDefaults.Email}}"
        }];
        
        payload['metaData'].isConfigured = true;
        console.log(payload);
        connection.trigger('updateActivity', payload);*/
        
        console.log("test---------------");
        console.log("header---------------"+header);
        console.log("messagename----------"+messagename);
        console.log("sendername-----------"+sendername);
        console.log("messagename-------------"+messagename);
        console.log("messagesubject------------"+messagesubject);
        console.log("messagebody-------------"+messagebody);
        console.log("calltoactionlabel------------"+calltoactionlabel);
        console.log("calltoactionurl------------"+calltoactionurl);
        
    }


});
