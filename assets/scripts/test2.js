function submitTest1() {
    const form = document.getElementById("testForm");
    const resultsDiv = document.getElementById("results");
    const answers = {
        q1: "b",
        q2: "a",
        q3: "a",
        q4: "a",
        q5: "b",
        q6: "a",
        q7: "a",
        q8: "a",
        q9: "b",
        q10: "a",
        q11: "b",
        q12: "b",
        q13: "a",
        q14: "c",
        q15: "b",
        q16: "b",
        q17: "a",
        q18: "b",
        q19: "a",
        q20: "b",
        q21: "c",
        q22: "b",
        q23: "c",
        q24: "b",
        q25: "a",
        q26: "a",
        q27: "c",
        q28: "a",
        q29: "b",
        q30: "c"
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