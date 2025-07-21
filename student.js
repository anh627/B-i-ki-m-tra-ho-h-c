document.addEventListener('DOMContentLoaded', function() {
    const startTestBtn = document.getElementById('start-test');
    const testContainer = document.getElementById('test-container');
    const resultContainer = document.getElementById('result-container');
    
    let currentTest = null;
    let studentAnswers = {};
    
    // Bắt đầu làm bài kiểm tra
    startTestBtn.addEventListener('click', function() {
        const studentName = document.getElementById('student-name').value;
        const testCode = document.getElementById('test-code').value;
        
        if (!studentName || !testCode) {
            alert('Vui lòng nhập tên và mã bài kiểm tra');
            return;
        }
        
        currentTest = loadTest(testCode);
        
        if (!currentTest) {
            alert('Không tìm thấy bài kiểm tra với mã này');
            return;
        }
        
        testContainer.classList.remove('hidden');
        displayQuestions();
    });
    
    // Hiển thị các câu hỏi
    function displayQuestions() {
        const questionArea = document.getElementById('question-area');
        questionArea.innerHTML = '';
        
        currentTest.questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'test-question';
            
            let questionHtml = `
                <p class="question-text">Câu ${index + 1}: ${q.question}</p>
            `;
            
            if (q.type === 'element' && q.options) {
                questionHtml += `<div class="options">`;
                q.options.forEach((opt, optIndex) => {
                    questionHtml += `
                        <label>
                            <input type="radio" name="q${index}" value="${opt}">
                            ${opt}
                        </label><br>
                    `;
                });
                questionHtml += `</div>`;
            } else {
                questionHtml += `
                    <input type="text" class="answer-input" data-question="${index}" placeholder="Nhập câu trả lời">
                `;
            }
            
            questionDiv.innerHTML = questionHtml;
            questionArea.appendChild(questionDiv);
        });
    }
    
    // Xử lý nộp bài
    document.getElementById('submit-test').addEventListener('click', function() {
        // Thu thập câu trả lời
        currentTest.questions.forEach((q, index) => {
            if (q.type === 'element' && q.options) {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                studentAnswers[index] = selected ? selected.value : '';
            } else {
                studentAnswers[index] = document.querySelector(`.answer-input[data-question="${index}"]`).value;
            }
        });
        
        // Tính điểm
        let score = 0;
        let reviewHtml = '';
        
        currentTest.questions.forEach((q, index) => {
            const isCorrect = studentAnswers[index] === q.answer;
            if (isCorrect) score++;
            
            reviewHtml += `
                <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Câu ${index + 1}:</strong> ${q.question}</p>
                    <p>Bạn trả lời: ${studentAnswers[index] || '(Bỏ trống)'}</p>
                    <p>Đáp án đúng: ${q.answer}</p>
                </div>
            `;
        });
        
        // Hiển thị kết quả
        testContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        document.getElementById('score-display').innerHTML = `
            <p>Bạn đạt được: ${score}/${currentTest.questions.length} điểm</p>
        `;
        
        document.getElementById('answer-review').innerHTML = reviewHtml;
    });
});
