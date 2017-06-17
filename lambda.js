/**
 * This is taken from the Alexa skill for Trivia
 */

var aws = require('aws-sdk');

// this is used by the new analytics

var APP_ID = 'amzn1.ask.skill.c425d705-863e-4761-8951-e867067f4677';
var VoiceInsights =require('voice-insights-sdk'),
  VI_APP_TOKEN = '551c5fc1-749b-32d6-8b7f-ceb8f9cf772e';

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "What year did the Nine Years' War begin?": [
            "16 88",
            "1702",
            "15 88",
            "16 54",
            "1723"
        ]
    },
    {
        "What year was the Hudson's Bay Company founded?": [
            "16 70",
            "15 23",
            "16 23",
            "1701",
            "1770"
        ]
    },
    {
        "Which royal wedding did not take place in Westminster Abbey?": [
            "King Henry VIII",
            "King Richard II",
            "Queen Elizabeth II",
            "Prince Andrew, Duke of York",
            "Prince William, Duke of Cambridge"
        ]
    },
    {
        "How many children did Queen Victoria have?": [
            "9",
            "7",
            "11",
            "5",
            "6",
            "none"
        ]
    },
    {
        "Who invented Electromagnetic induction, the operating principle of transformers and nearly all modern electric generators?": [
            "Michael Faraday",
            "James Bowman Lindsay",
            "Patrick Bell",
            "William Sturgeon",
            "Alexander Bain",
            "Kirkpatrick Macmillan"
        ]
    },
    {
        "What year did John Maynard Keynes publish The General Theory of Employment, Interest and Money?": [
            "1936",
            "1912",
            "1928",
            "1941"
        ]
    },
    {
        "What year did Charles Babbage propose the idea for a Difference engine, an automatic mechanical calculator?": [
            "1822",
            "1872",
            "1865",
            "1898",
            "1883"
        ]
    },
    {
        "Which is the oldest line on the London Underground?": [
            "Metropolitan line",
            "Piccadilly line",
            "Central line",
            "District line",
            "Circle line"
        ]
    },
    {
        "King's College London is named after which royal figure?": [
            "King George IV",
            "King William IV",
            "King George III",
            "King George V",
            "King George I"
        ]
    },
    {
        "In 1753, King George II gave his formal assent to the Act of Parliament establishing which attraction?": [
            "British Museum",
            "National Gallery",
            "National Portrait Gallery",
            "Tate Modern Art Gallery",
            "Victoria and Albert Museum"
        ]
    },
    {
        "What dukedom was Winston Churchill born into?": [
            "Marlborough",
            "Devonshire",
            "Rutland",
            "Somerset",
            "St Albans"
        ]
    },
    {
        "Which monarch was executed after being convicted of high treason in the English Civil War?": [
            "King Charles I",
            "King James VI",
            "King Charles II",
            "King William IV",
            "King George I"
        ]
    },
    {
        "What year did the Battle of Neville's Cross occur which dictated control of the Isle of Man?": [
            "13 46",
            "14 46",
            "15 46",
            "12 46",
            "15 12"
        ]
    },
    {
        "Who won the Nobel Prize for Literature in 1907?": [
            "Rudyard Kipling",
            "George Orwell",
            "Herman Melville",
            "George Gissing",
            "Henry Miller"
        ]
    },
    {
        "What year was William Shakespeare born into?": [
            "15 64",
            "14 78",
            "15 43",
            "15 92",
            "16 11"
        ]
    },
    {
        "How many gold medals did the Great Britain win in the 1908 Summer Olympics held in London?": [
            "56",
            "26",
            "22",
            "12",
            "3"
        ]
    },  
    {
        "Who gave royal charter status to the University of Cambridge in 12 31?": [
            "King Henry III",
            "King John",
            "King Edward I",
            "King Edward II",
            "King Edward III"
        ]
    },
    {
        "What year was the Battle of Hastings?": [
            "10 66",
            "14 21",
            "13 66",
            "12 21",
            "11 17"
        ]
    },
    {
        "Where was William the Conqueror born?": [
            "Normandy",
            "Brittany",
            "Corsica",
            "Wales",
            "Scotland"
        ]
    },
    {
        "Which dynasty was Macbeth born into?": [
            "House of Dunkeld",
            "House of Alpin",
            "House of Sverre",
            "House of Bruce",
            "House of Stuart"
        ]
    },
    {
        "What year did Margaret Thatcher assume office becoming the first female Prime Minister of the U.K.?": [
            "1979",
            "1977",
            "1974",
            "1981",
            "1978"
        ]
    },
    {
        "What year was the British newspaper The Observer first published in?": [
            "1791",
            "1876",
            "1856",
            "1862",
            "1845"
        ]
    },
    {
        "Who led a Naval expedition that touched five continents from 1791 to 1795?": [
            "George Vancouver",
            "Peter Puget",
            "Thomas Pitt",
            "Charles Stuart",
            "Joseph Baker"
        ]
    },
    {
        "Who was the first governor of the East India Company?": [
            "Thomas Smythe",
            "John Watts",
            "Christopher Newport",
            "Robert Devereux",
            "George Villiers"
        ]
    },
    {
        "What year did Roger Bannister become the first runner to do a mile in less than four minutes?": [
            "1954",
            "1913",
            "1961",
            "1967",
            "1949"
        ]
    },
    {
        "What year did Mike Hawthorn became the first Briton to win the Formula One World Championship?": [
            "1958",
            "1962",
            "1954",
            "1970",
            "1950"
        ]
    },
    {
        "What was the title of the early work of science fiction written by Margaret Cavendish?": [
            "The Blazing World",
            "Amazing Travels",
            "The Road Forward",
            "New World Order",
            "The Change is Coming"
        ]
    },
    {
        "What novel was not written by Jane Austen?": [
            "A Christmas Carol",
            "Sense and Sensibility",
            "Mansfield Park",
            "Pride and Prejudice",
            "Emma"
        ]
    },
    {
        "What year was Charles Dickens born?": [
            "1812",
            "1802",
            "1792",
            "1845",
            "1833"
        ]
    },
    {
        "During a period of 57 days and nights starting the seventh of September 1940 how many times was London bombed?": [
            "56",
            "52",
            "45",
            "42",
            "37"
        ]
    },
    {
        "Which leader was scheduled to retire in 1939 but continued to serve to lead the Royal Air Force through the Battle of Britain?": [
            "Hugh Dowding",
            "Winston Churchill",
            "Frederick Pile",
            "Owen Tudor Boyd",
            "Sir Leslie Gossage"
        ]
    },
    {
        "How many people died in the Great Plague of the 17th century?": [
            "100 thousand",
            "50 thousand",
            "20 thousand",
            "10 thousand",
            "five thousand"
        ]
    },
    {
        "What is the height of the St Pauls Cathedral?": [
            "111 metres",
            "99 metres",
            "125 metres",
            "102 metres",
            "133 metres"
        ]
    },
    {
        "Who designed the red telephone box?": [
            "Sir Giles Gilbert Scott",
            "George Godwin",
            "Charles Robert Cockerell",
            "John Loughborough Pearson",
            "Frank Gehry"
        ]
    },
    {
        "What is the second largest metropolitan area in the UK?": [
            "Birmingham Area",
            "Manchester Area",
            "Leeds Bradford Area",
        	"Liverpool Birkenhead Area",
        	"Newcastle Sunderland Area"
        ]
    },
    {
        "Which historical figure is not associated with the Midlands Enlightenment?": [
            "Adam Smith",
            "James Watt",
            "Joseph Priestley",
            "Josiah Wedgwood", 
            "James Keir"
        ]
    },
    {
        "Who was not one of the Seven Bishops of the Church of England that were imprisoned and tried in the 17th Century?": [
            "Frederick Cornwallis",
            "Thomas Ken",
            "John Lake",
            "William Lloyd",
            "William Sancroft"
        ]
    },
    {
        "What was the population of Liverpool in middle of the 16th century?": [
            "500",
            "5000",
            "10 thousand",
            "20 thousand",
            "50 thousand"
        ]
    },
    {
        "When was a seven metre high stone wall built around the Newcastle to protect it from Northern invaders?": [
            "13th century",
            "11th century",
            "12th century",
            "9th century",
            "15th century"
        ]
    },
    {
        "What century was Chaucer born in?": [
            "14th century",
            "13th century",
            "12th century",
            "11th century",
            "15th century"
        ]
    },
    {
        "What work was not written by Chaucer?": [
            "Sir Gawain and the Green Knight",
            "The Canterbury Tales",
            "The House of Fame",
            "The Complaint of Mars",
            "The Legend of Good Women"
        ]
    },
    {
        "Where is Sherwood Forest located in?": [
            "Nottinghamshire",
            "Derbyshire",
            "Leicestershire",
            "Lincolnshire",
            "Wales"
        ]
    },
    {
        "What year was composer Henry Purcell born?": [
            "16 59",
            "1721",
            "1761",
            "15 83",
            "16 03"
        ]
    },
    {
        "What month of the year did the Titanic sink in?": [
            "April",
            "January",
            "May",
            "February",
            "December"
        ]
    },
    {
        "What was the sequel to Alice in Wonderland written by Lewis Carroll?": [
            "Through the Looking Glass",
            "Jabberwocky",
            "The Hunting of the Snark",
            "Sylvie and Bruno",
            "Practical Tortoise Raising"
        ]
    },
    {
        "What year did Queen Elizabeth II begin her reign?": [
            "1952",
            "1946",
            "1956",
            "1962",
            "1965"
        ]
    },
    {
        "Who was the reigning British monarch when Queen Elizabeth II was born?": [
            "King George V",
            "King George VI",
            "Queen Victoria",
            "King Edward VII",
            "King Edward VIII"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        // validate that the echo app id matches what has been published
        if (event.session.application.applicationId !== "amzn1.ask.skill.c425d705-863e-4761-8951-e867067f4677") {
            context.fail("Invalid Application ID");
        }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(session, callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // initialize voice analytics 
    console.log("initialize session");
    VoiceInsights.initialize(session, VI_APP_TOKEN);

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    console.log("Intent Invoked: " + intentName);

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(session, callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// this is the basic welcome message that initiates the game

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Five Difficult Trivia Questions";

function getWelcomeResponse(session, callback) {
    var sessionAttributes = {},
        speechOutput = "British History Quiz. I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many correct as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    var godSaveQueen = 'https://s3.amazonaws.com/britishtrivia/sounds/godSaveQueen.mp3';
    speechOutput += repromptText;
    var audioOutput = "<speak>";
        audioOutput = audioOutput + "<audio src=\"" + godSaveQueen + "\" />";
        audioOutput = audioOutput + speechOutput;
        audioOutput = audioOutput + "</speak>";
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };

    console.log("session: " + JSON.stringify(sessionAttributes));
    
    // log to analytics for further processing
    var db = new aws.DynamoDB();
    var d = new Date().toString();
    
    var currentQuestion = currentQuestionIndex.toString();
    var correctAnswer = correctAnswerIndex.toString();
    var questionAsked = gameQuestions[0].toString();
    
    console.log(JSON.stringify(session));
    
    var params = {
        TableName: 'britishTriviaTbl',
        Item: { // a map of attribute name to AttributeValue
            InvokeTS: { S: d },
            currentQuestion: {  S: currentQuestion },
            correctAnswer: { S: correctAnswer },
            questionId: { S: questionAsked },
    //        userId: { S: session.user.userId },
            sessionId: { S: session.sessionId },
            request: { S: "Start Game" }
        }
    };

    db.putItem(params, function(err, data) {
        if (err) console.log(err); // an error occurred
        else {
            console.log("success" + data); // successful response

	    // analytics tracking
	    VoiceInsights.track('WelcomeMessage', {}, speechOutput, (err, res) => {
	        console.log('voice insights logged' + JSON.stringify(res));
	        var flagIcon = "unionJack";
                callback(sessionAttributes,
                    buildAudioCardResponse(CARD_TITLE, audioOutput, repromptText, flagIcon, repromptText, shouldEndSession));
            });
        }
    });
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    // log to analytics for further processing
    var db = new aws.DynamoDB();
    var d = new Date().toString();
    
    // create strings that can be used to write to analytic table
    var currentQuestion = session.attributes.currentQuestionIndex.toString();
    var correctAnswer = session.attributes.correctAnswerIndex.toString();
    var questionAsked = session.attributes.questions[session.attributes.currentQuestionIndex].toString();
    var userScore = session.attributes.score.toString();

    console.log("current Question: " + currentQuestion + " correct Answer: " + correctAnswer + " question Asked: " + questionAsked);

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));

    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));

    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";
        var wasUserCorrect = "FALSE";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
            wasUserCorrect = "TRUE";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "incorrect. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }

        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";

            var params = {
                TableName: 'britishTriviaTbl',
                Item: { // a map of attribute name to AttributeValue
                    InvokeTS: { S: d },
                    currentQuestion: {  S: currentQuestion },
                    correctAnswer: { S: correctAnswer },
                    questionId: { S: questionAsked },
                    userCorrect: { S: wasUserCorrect },
                    userScore: { S: userScore },
            //        userId: { S: session.user.userId },
                    sessionId: { S: session.sessionId },
                    request: { S: "Final Question Answered" }
                }
            };

            console.log("session: " + JSON.stringify(session));

            db.putItem(params, function(err, data) {
                if (err) console.log(err); // an error occurred
                else {
		    console.log("success" + data); // successful response
                    console.log('analytics test - question answered');
                    VoiceInsights.track(intent.name, intent.slots, speechOutput.speech, (err, res) => {
                        console.log('voice insights logged' + JSON.stringify(res));
                        callback(session.attributes,
                            buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
		    });
		}
            });
                
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };

            var params = {
                TableName: 'britishTriviaTbl',
                Item: { // a map of attribute name to AttributeValue
                    InvokeTS: { S: d },
                    currentQuestion: {  S: currentQuestion },
                    correctAnswer: { S: correctAnswer },
                    questionId: { S: questionAsked },
                    userCorrect: { S: wasUserCorrect },
            //        userId: { S: session.user.userId },
                    sessionId: { S: session.sessionId },
                    request: { S: "Question Answered" }
                }
            };

            db.putItem(params, function(err, data) {
                if (err) console.log(err); // an error occurred
        	else {
		    console.log("success" + data); // successful response

                    // temp code to test analytics
                    console.log('analytics test - question answered');
                    VoiceInsights.track(intent.name, intent.slots, speechOutput, (err, res) => {
                        console.log('voice insights logged' + JSON.stringify(res));
                        callback(sessionAttributes,
                            buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
                    });
		}
            });
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function buildAudioCardResponse(title, output, cardInfo, objectName, repromptText, shouldEndSession) {
    var smallImagePath = "https://s3.amazonaws.com/britishtrivia/cards/" + objectName + "-small.PNG";
    var largeImagePath = "https://s3.amazonaws.com/britishtrivia/cards/" + objectName + "-large.PNG";
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        card: {
            type: "Standard",
            title: title,
            text: cardInfo,
            image: {
                smallImageUrl: smallImagePath,
                largeImageUrl: largeImagePath
            }
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildAudioResponse(title, output, cardInfo, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        card: {
            type: "Simple",
            title: title,
            content: cardInfo
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}