$(document).ready(function () {
	//Global Variables
	var correct = 0;
	var incorrect = 0;
	var currentQuestion = 0;
	var userAnswer = "";
	var ansTimeout = 4000;

	var myQuestions = [
		{
			question: "A liger...it's pretty much my favorite animal. It's like a lion and a tiger mixed - bred for its skills in magic.",
			choices: ["Napoleon Dynamite", "Superbad", "Elf",],
			answer: "Napoleon Dynamite",
			gif: "assets/images/Napoleon.gif"
		},
		{
			question: "I'm just one stomach flu away from my goal weight.",
			choices: ["Mean Girls", "Clueless", "The Devil Wears Prada"],
			answer: "The Devil Wears Prada",
			gif: "assets/images/Devil.gif"
		},
		{
			question: "I have nipples, Greg. Could you milk me?",
			choices: ["Meet the Parents", "Stepbrothers", "Dumb and Dumber"],
			answer: "Meet the Parents",
			gif: "assets/images/nipples.gif"
		},
		{
			question: "Its just a flesh wound.",
			choices: ["Princess Bride", "Monty Python and the Holy Grail", "Fight Club"],
			answer: "Monty Python and the Holy Grail",
			gif: "assets/images/monty.gif"
		},
		{
			question: "There's a jungle cat in the bathroom!",
			choices: ["Kung Fu Panda", "The Hangover", "Zootopia"],
			answer: "The Hangover",
			gif: "assets/images/tiger.gif"
		},
		{
			question: "You sit on a throne of lies.",
			choices: ["The Lego Movie", "Robin Hood", "Elf"],
			answer: "Elf",
			gif: "assets/images/elf.gif"
		},
		{
			question: "I sometimes have a feeling I can do crystal meth, but then I think 'mmm better not'.",
			choices: ["Pitch Perfect", "Friday", "Zoolander"],
			answer: "Pitch Perfect",
			gif: "assets/images/crystalMeth.gif"
		},
		{
			question: "I don't know how to put this but I'm kind of a big deal.",
			choices: ["Doctor Strange", "Black Panther", "Anchorman"],
			answer: "Anchorman",
			gif: "assets/images/anchorman.gif"

		},
		{
			question: "There goes our last female.",
			choices: ["Ice Age", "Gone Girl", "Zootopia"],
			answer: "Ice Age",
			gif: "assets/images/lastFemale.gif"
		},
		{
			question: "She doesn't even go here!",
			choices: ["Mean Girls", "10 Things I Hate About You", "Legally Blonde"],
			answer: "Mean Girls",
			gif: "assets/images/meanGirls.gif"
		}];

	// on-click event begin when start button clicked
	$("#start").on("click", function () {
		reset();
		event.preventDefault();
		//Displays the first question
		displayQuestions(currentQuestion);

		//hide start button by adding hidden class
		$("#start").addClass("hidden");
		$("#responses").removeClass("hidden");
		$("#movie-gif").removeClass("hidden");

		//show timer by removing hidden class
		$("#time-left").removeClass("hidden");
		resetTimer();

	});

	$(".answer-choice").on("click", function (event) {
		event.preventDefault();
		userAnswer = $(this).text();
		stop();
		console.log("User Asnwer", userAnswer);
		//run function nextQ
		checkQuestion();
	});

	//Set up Timer
	var time = 10;

	var timeInterval;

	//Run Timer Function
	function runTimer() {
		timeInterval = setInterval(decrement, 1000);
	};

	// Decrement function
	function decrement() {
		var correctAnswer = myQuestions[currentQuestion].answer;
		var currentGif = myQuestions[currentQuestion].gif;
		//  Decrease time left by one.
		time--;
		//Show the time left on screen
		$("#timer").text("Time remaining: " + time + " seconds");
		//  When time left hits zero
		if (time === 0) {
			stop();
			userAnswer = "wrong";
			$("#results").text("Time's Up! The correct answer was " + correctAnswer);
			$("#movie-gif").attr("src", currentGif);
			console.log(userAnswer);
			console.log("Inside time interval");
			incorrect++;
			displayTimer();

			nextQ();
		};
	};

	//Reset Timer function
	function resetTimer() {
		time = 10;
		$("#timer").text("Time remaining: " + time + " seconds");
	};

	function displayTimer() {
		$("#timer").text("Answer Review");
	}
	//Stop Timer function
	function stop() {
		clearInterval(timeInterval);
	};


	function displayQuestions() {
		clearResults();
		clearQ();
		resetTimer();
		$("#movie-gif").attr("src", '');
		$("#responses").removeClass("hidden");
		$("#question").html(myQuestions[currentQuestion].question);
		$("#answer-a").html(myQuestions[currentQuestion].choices[0]);
		$("#answer-b").html(myQuestions[currentQuestion].choices[1]);
		$("#answer-c").html(myQuestions[currentQuestion].choices[2]);
		runTimer();
	};


	//Reset for end of game
	function reset() {
		currentQuestion = 0;
		correct = 0;
		incorrect = 0;
		userAns = "";
		resetTimer();
	};

	//Display end page
	function displayEnd() {
		clearQ();
		clearResults();
		$("#time-left").addClass("hidden");
		$("#answer-a").text("Correct Answers: " + correct);
		$("#answer-b").text("Incorrect Answers: " + incorrect);
		//$("#answer-c").addClass("hidden");
		$("#restart").removeClass("hidden");
		$("#restart").text("Click the Start Button to Play Again");
		//Restart game
		reset();
		$("#movie-gif").addClass("hidden");
		$("#start").removeClass("hidden");
		$("#restart").on("click", function () {

		});
	};

	//Function to clear the question and answer choices and stop timer
	function clearQ() {
		var questionDiv = $("#question");
		questionDiv.empty();

		var responsesDiv = $(".answer-choice");
		responsesDiv.empty();

		stop();
	};


	//Check if answer was right or wrong
	function checkQuestion() {
		clearQ();
		var correctAnswer = myQuestions[currentQuestion].answer;
		var currentGif = myQuestions[currentQuestion].gif;

		if (myQuestions[currentQuestion].answer === userAnswer) {
			$("#results").text("Congratulations! You chose the right answer!");
			correct++;
			displayTimer();
			$("#movie-gif").attr("src", currentGif);
		}
		else if (userAnswer === "wrong") {
			$("#results").text("Time's Up! The correct answer was " + correctAnswer);
			incorrect++;
			displayTimer();
			$("#movie-gif").attr("src", currentGif);
		}
		else {
			$("#results").text("Wrong! The correct answer was " + correctAnswer);
			incorrect++;
			displayTimer();
			$("#movie-gif").attr("src", currentGif);

		};
		nextQ();
	};


	//Function to change the question 
	function nextQ() {
		
		
		currentQuestion++;
		//If the count is the same as the length of the question array, the counts reset to 0
		if (currentQuestion === myQuestions.length) {
			setTimeout(displayEnd, ansTimeout);
		}
		else {
			setTimeout(displayQuestions, ansTimeout);
		};
	};

	//Function to clear results div
	function clearResults() {
		$("#results").empty();

	};

});
