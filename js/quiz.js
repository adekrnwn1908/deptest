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
    }
    //  Add more questions here
  ];
  
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit-button");
  const resultElement = document.getElementById("result");
  const titleElement = document.getElementById("title");
  const gaugeElement = document.getElementById("anychart-embed-samples-gauge-linear-04");
  const depLevelLabel = document.getElementById("depression-level-label");  

  
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
  
    if (currentQuestion < questions.length-1) {
      loadQuestion();
    } else if(currentQuestion < questions.length){
      loadQuestion();
      submitButton.textContent = "SUBMIT";
    }else {
      showResult();
    }
  }
  
  // Function to display the quiz result
  function showResult() {
    quizContainer.style.display = "none";
    var textResult = "";
    if(score > 19) {
      textResult = "Severe depression, it is recommended to give antidepressants alone or in combination with intensive psychotherapy.";
    }else if(score > 14){
      textResult ="Moderate depression, it is recommended to give antidepressants or psychotherapy.";
    }else if(score > 9){
      textResult ="Mild depression, recommended therapy is observation of existing symptoms within 1 month (improvement or worsening) and consideration of giving antidepressants or brief psychotherapy.";
    }else if(score > 4){
      textResult ="Symptoms of mild depression, recommended therapy is psychoeducation if there is worsening of symptoms.";
    }else{
      textResult ="There are no symptoms of depression.";
    }
    score = score/27*100;
    depLevelLabel.style.visibility = "visible";
    drawGauge()
    titleElement.textContent = "Test Results";
    resultElement.textContent = textResult;
    gaugeElement.style.display = "";
    
  }
  
  // Load the first question
  loadQuestion();

  // Event listener for the submit button
  submitButton.addEventListener("click", checkAnswer);

  function ac_add_to_head(el){
    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(el,head.firstChild);
  }
  function ac_add_link(url){
    var el = document.createElement('link');
    el.rel='stylesheet';el.type='text/css';el.media='all';el.href=url;
    ac_add_to_head(el);
  }
  function ac_add_style(css){
    var ac_style = document.createElement('style');
    if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
    else ac_style.appendChild(document.createTextNode(css));
    ac_add_to_head(ac_style);
  }

  ac_add_link('https://cdn.anychart.com/releases/8.11.1/css/anychart-ui.min.css?hcode=a0c21fc77e1449cc86299c5faa067dc4');
  ac_add_style(document.getElementById("ac_style_samples-gauge-linear-04").innerHTML);
  ac_add_style(".anychart-embed-samples-gauge-linear-04{width:600px;height:450px;}");

  function drawGauge(result){
    // create data
    var data = [score];
    console.log(score)
 
    // set the gauge type
    var gauge = anychart.gauges.linear();
 
    // set the data for the gauge
    gauge.data(data);
 
    // set the layout
    gauge.layout('horizontal');
 
    // create a color scale
    var scaleBarColorScale = anychart.scales.ordinalColor().ranges(
    [
        {
            from: 0,
            to: 25,
            color: ['#2AD62A', '#CAD70b']
        },
        {
            from: 25,
            to: 50,
            color: ['#CAD70b', '#FFD700']
        },
        {
            from: 50,
            to: 75,
            color: ['#FFD700', '#EB7A02']
        },
        {
            from: 75,
            to: 100,
            color: ['#EB7A02', '#D81E05']
        }
    ]
    );
 
    // create a Scale Bar
    var scaleBar = gauge.scaleBar(0);
 
    // set the height and offset of the Scale Bar (both as percentages of the gauge height)
    scaleBar.width('10%');
    scaleBar.offset('31.5%');
 
    // use the color scale (defined earlier) as the color scale of the Scale Bar
    scaleBar.colorScale(scaleBarColorScale);
 
    // add a marker pointer
    var marker = gauge.marker(0);
 
    // set the offset of the pointer as a percentage of the gauge width
    marker.offset('31.5%');
 
    // set the marker type
    marker.type('triangle-up');
 
    // set the zIndex of the marker
    marker.zIndex(10);
    marker.width('20');
 
    // configure the scale
    var scale = gauge.scale();
    scale.minimum(0);
    scale.maximum(100);
    scale.ticks().interval(10);
 
    // configure the axis
    var axis = gauge.axis();
    axis.minorTicks(true)
    axis.minorTicks().stroke('#cecece');
    axis.width('1%');
    axis.offset('29.5%');
    axis.orientation('top');
 
    // format axis labels
    axis.labels().format('{%value}%');
 
    // set paddings
    gauge.padding([0, 50]);
 
    // set the container id
    gauge.container('container');
 
    // initiate drawing the gauge
    gauge.draw();
  }