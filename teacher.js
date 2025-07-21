document.addEventListener('DOMContentLoaded', function() {
    const createTestBtn = document.getElementById('create-new-test');
    const testCreator = document.getElementById('test-creator');
    
    // Hiển thị trình tạo bài kiểm tra
    createTestBtn.addEventListener('click', function() {
        testCreator.classList.remove('hidden');
        initializeTestCreator();
    });
    
    // Khởi tạo trình tạo bài kiểm tra
    function initializeTestCreator() {
        const questionTypeSelect = document.getElementById('question-type');
        const addQuestionBtn = document.getElementById('add-question');
        const previewArea = document.getElementById('preview-questions');
        const generateCodeBtn = document.getElementById('generate-code');
        const testCodeInput = document.getElementById('test-code');
        
        let currentTest = {
            name: "",
            code: "",
            questions: []
        };
        
        // Tạo mã bài kiểm tra ngẫu nhiên
        generateCodeBtn.addEventListener('click', function() {
            testCodeInput.value = generateTestCode();
        });
        
        // Thêm câu hỏi mới
        addQuestionBtn.addEventListener('click', function() {
            const questionType = questionTypeSelect.value;
            const questionEditor = document.getElementById('question-editor');
            
            let questionHtml = '';
            
            switch(questionType) {
                case 'element':
                    questionHtml = `
                        <div class="question-form">
                            <h4>Câu hỏi nhận biết nguyên tố</h4>
                            <input type="text" class="question-text" placeholder="Câu hỏi (VD: Nguyên tố có 6 proton là gì?)">
                            <input type="text" class="correct-answer" placeholder="Đáp án đúng">
                            <div class="options-area">
                                <p>Các lựa chọn (nếu là trắc nghiệm):</p>
                                <input type="text" class="option" placeholder="Lựa chọn 1">
                                <input type="text" class="option" placeholder="Lựa chọn 2">
                                <button class="add-option">Thêm lựa chọn</button>
                            </div>
                            <button class="save-question">Lưu câu hỏi</button>
                        </div>
                    `;
                    break;
                    
                case 'equation':
                    questionHtml = `
                        <div class="question-form">
                            <h4>Câu hỏi cân bằng phương trình</h4>
                            <input type="text" class="question-text" placeholder="Phương trình (VD: H2 + O2 → ?)">
                            <input type="text" class="correct-answer" placeholder="Đáp án đúng (VD: 2H2O)">
                            <button class="save-question">Lưu câu hỏi</button>
                        </div>
                    `;
                    break;
            }
            
            questionEditor.innerHTML = questionHtml;
            
            // Xử lý lưu câu hỏi
            const saveQuestionBtn = questionEditor.querySelector('.save-question');
            saveQuestionBtn.addEventListener('click', function() {
                const questionText = questionEditor.querySelector('.question-text').value;
                const correctAnswer = questionEditor.querySelector('.correct-answer').value;
                
                const newQuestion = {
                    type: questionType,
                    question: questionText,
                    answer: correctAnswer
                };
                
                // Thêm options nếu là trắc nghiệm
                if (questionType === 'element') {
                    const options = [];
                    const optionInputs = questionEditor.querySelectorAll('.option');
                    optionInputs.forEach(input => {
                        if (input.value) options.push(input.value);
                    });
                    if (options.length > 0) newQuestion.options = options;
                }
                
                currentTest.questions.push(newQuestion);
                updatePreview();
            });
        });
        
        // Cập nhật xem trước
        function updatePreview() {
            previewArea.innerHTML = '';
            currentTest.questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'preview-question';
                questionDiv.innerHTML = `
                    <p><strong>Câu ${index + 1}:</strong> ${q.question}</p>
                    <p><em>Đáp án: ${q.answer}</em></p>
                `;
                previewArea.appendChild(questionDiv);
            });
        }
    }
});
