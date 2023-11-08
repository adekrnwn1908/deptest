const questions = [
    {
        question: "Lack of interest or pleasure in doing something.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Feeling sad, depressed or hopeless.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Feeling tired or lacking energy",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Poor appetite or overeating.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Too much sleep or not enough sleep",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Lack of confidence or feeling like a failure or that you have let yourself or your family down.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Difficulty concentrating on something, such as reading, studying or watching television.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Thoughts of death or self-harm",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    {
        question: "Feeling that it would be better to die or wanting to hurt yourself in any way.",
        value:[0,1,2,3],
        choices: ["Never", "A few days", "More than half the days", "Almost every day"],
    },
    // Add more questions here
  ];
  
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit-button");
  const resultElement = document.getElementById("result");
  
  let currentQuestion = 0;
  let score = 0;
  
  // Function to load the current question
  function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${question.question}`;
  
    choicesElement.innerHTML = "";
    question.choices.forEach((choice,value,index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="radio" name="answer" value="${value}" id="choice${index}">
        <label for="choice${index}">${choice}</label>
      `;
      choicesElement.appendChild(li);
    });
  }
  
  // Function to check the answer
  function checkAnswer() {
    const selectedChoice = document.querySelector("input[name='answer']:checked");
  
    if (!selectedChoice) {
      alert("Please select an answer.");
      return;
    }
  
    const userAnswer = parseInt(selectedChoice.value);
    // const correctAnswer = questions[currentQuestion].correctAnswer;
  
    // if (userAnswer === correctAnswer) {
    //   score++;
    // }
  
    score = score + userAnswer;
    console.log("Score: "+score+"Answer: "+userAnswer);
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  // Function to display the quiz result
  function showResult() {
    quizContainer.style.display = "none";
    resultElement.textContent = `You got ${score} out of ${questions.length} questions correct.`;
  }
  
  // Load the first question
  loadQuestion();

  // Event listener for the submit button
  submitButton.addEventListener("click", checkAnswer);