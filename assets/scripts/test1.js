function submitTest1() {
    const form = document.getElementById("testForm");
    const resultsDiv = document.getElementById("results");
    const answers = {
        q1: "c",
        q2: "a",
        q3: "b",
        q4: "a",
        q5: "b",
        q6: "b",
        q7: "a",
        q8: "a",
        q9: "c",
        q10: "b",
        q11: "a",
        q12: "a",
        q13: "c",
        q14: "b",
        q15: "b",
        q16: "b",
        q17: "c",
        q18: "b",
        q19: "b",
        q20: "a",
        q21: "b",
        q22: "a",
        q23: "c",
        q24: "c",
        q25: "a",
        q26: "a",
        q27: "a",
        q28: "b",
        q29: "a",
        q30: "b"
    };
    let score = 0;

    for (const question in answers) {
        const selectedAnswer = form[question].value;
        if (selectedAnswer === answers[question]) {
            score++;
        }
    }

    resultsDiv.innerHTML = `Your score: ${score} out of ${Object.keys(answers).length}`;
}