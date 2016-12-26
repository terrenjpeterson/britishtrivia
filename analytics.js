// lambda function written in nodeJS to query table data

console.log('loading required functions');

var AWS = require('aws-sdk');

console.log('starting to execute function');

exports.handler = function(event, context) {
    // start executing function
    console.log('processing request');
    
    // leverage dynamo DB
    var dynamodb = new AWS.DynamoDB({region: 'us-east-1'});
    var request = "Final Question Answered";

    // set parameters to do a scan based on reading date
    var params = {
        TableName: 'britishTriviaTbl',
        //Limit: 50,
        ScanFilter: { 'request' : 
            {
                'AttributeValueList' : [ { S : request } ],
                'ComparisonOperator' : 'EQ'
            }
        },
        //ExclusiveStartKey : {"InvokeTS":{"S":"Sun Dec 25 2016 12:52:56 GMT+0000 (UTC)"}}
        ExclusiveStartKey : {"InvokeTS":{"S":"Sat Dec 24 2016 14:29:52 GMT+0000 (UTC)"}}
    };
    //
    dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                // scan will return an array of raw unsorted data
                historyArray = data.Items;
                //var exportData = [];
                var exportData = "";
                var exportLine = "";
                
                console.log(historyArray.length + " rows returned");
                console.log("last key: " + JSON.stringify(data.LastEvaluatedKey));
                console.log("first entry: " + JSON.stringify(historyArray[0]));
                
                for (i = 0; i < historyArray.length; i++) {
                    requestDateTime = historyArray[i].InvokeTS.S;
                    requestDate = requestDateTime.substring(4,15);
                    requestTime = requestDateTime.substring(16,24);
                    userScore = historyArray[i].userScore.S;
                    userCorrect = historyArray[i].userCorrect.S;
                    sessionId = historyArray[i].sessionId.S;
                
                    exportLine = request + "," + requestDate + "," + requestTime + "," + userScore + "," +
                        userCorrect + "," + sessionId + "\n";
                    //exportLine = requestDate + "," + requestTime + "," + historyArray[i].songTitle.S + "," + sessionId + "\n";
                    //exportData.push(exportLine);
                    exportData = exportData + exportLine;
                    
                //    console.log(exportLine);
                //    console.log(historyArray[i].songTitle.S);
                }

                var s3 = new AWS.S3();

                //var postData = JSON.stringify(exportData);
                postData = exportData;

                var putParams = {Bucket : 'musicmakerskill',
                    Key : 'britishTriviaData.csv',
                    Body: postData};

                // write to an S3 bucket

                s3.putObject(putParams, function(err, data) {
                    if(err)
                        console.log('Error posting data' + err);
                    else {
                    //    console.log('Successfully posted data' + );
                        console.log('Successfully posted data');
                        context.succeed();
                    }
                });
            }
        }
    );
};
