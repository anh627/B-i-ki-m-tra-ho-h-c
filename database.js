// Cơ sở dữ liệu bài kiểm tra
const testDatabase = {
    // Ví dụ một bài kiểm tra
    "123456": {
        name: "Bài kiểm tra nguyên tố cơ bản",
        questions: [
            {
                type: "element",
                question: "Nguyên tố có 8 proton là gì?",
                answer: "Oxygen",
                options: ["Nitrogen", "Oxygen", "Carbon", "Sắt"]
            },
            {
                type: "equation",
                question: "Cân bằng phương trình: H2 + O2 → ?",
                answer: "2H2O"
            }
        ]
    }
};

// Lưu bài kiểm tra mới
function saveTest(testCode, testData) {
    testDatabase[testCode] = testData;
    localStorage.setItem('chemistryTests', JSON.stringify(testDatabase));
}

// Tải bài kiểm tra
function loadTest(testCode) {
    return testDatabase[testCode];
}

// Tạo mã ngẫu nhiên
function generateTestCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
