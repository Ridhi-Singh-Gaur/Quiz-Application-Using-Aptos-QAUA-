function redirectToPage(){
    if(x.checked){
        window.location.href="userDetails&Quiz.html";
    }
    else{
        window.location.href="Leaderboard_Result.html"
    }
}
let x=document.getElementById("agree");
x.addEventListener('change',redirectToPage)
document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quizForm');
    const submitButton = document.getElementById('submitQuiz');

    // Check if elements are found
    if (quizForm && submitButton) {
        console.log('Elements found!');  // Log to confirm elements are found

        // Event listener for form submission
        quizForm.addEventListener('submit', function (event) {
            event.preventDefault();  // Prevent default form submission behavior
            console.log('Submit button clicked!');  // Log to confirm the button click

            // Capture user details
            let fullName = document.getElementById('fullName').value;
            let gender = document.querySelector('input[name="gender"]:checked').value;
            let enrollment = document.getElementById('enrollment').value;
            let city = document.getElementById('city').value;

            // Calculate quiz score (2 marks for each correct answer)
            let totalMarks = 0;
            const correctAnswers = {
                q1: 'Speed*Time',
                q2: '(Principe*Rate*Time)/100',
                q3: 'Selling Price-Cost Price',
                q4: '12',
                q5: '1000'
            };

            // Evaluate answers
            for (let question in correctAnswers) {
                const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (userAnswer && userAnswer.value === correctAnswers[question]) {
                    totalMarks += 2;  // Each correct answer adds 2 marks
                }
            }

            // Prepare data to send
            let quizData = {
                fullName: fullName,
                gender: gender,
                enrollment: enrollment,
                city: city,
                totalMarks: totalMarks
            };

            // Send data to server and handle redirection on success
            fetch('http://localhost:1089/submitQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .then(data => {
                console.log('Success:', data);
                alert('Quiz submitted successfully!');
                window.location.href = "Leaderboard_Result.html";  // Redirect to leaderboard after success
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error submitting the quiz.');
            });
        });
    } else {
        console.error('quizForm or submitQuiz is not found');  // Log if elements are not found
    }
});
