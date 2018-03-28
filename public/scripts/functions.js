// Create Azure Account - https://azure.microsoft.com/en-us/free/free-account-students-faq/
// Retrieve API Key - https://azure.microsoft.com/en-ca/try/cognitive-services/
// API Documentation - https://westus.dev.cognitive.microsoft.com/docs/services/TextAnalytics.V2.0/operations/56f30ceeeda5650db055a3c9
function submitComment(commentControl) {
    // TODO - Call API
    const comments = document.getElementsByName(commentControl)[0].value;
    const base = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
    const apiKey = 'a067b8a78745477782fbd19254624913';

    const body = {
        'documents': [
            {
                language: 'en-US',
                id: 1,
                text: comments
            }
        ]
    }

    $.ajax({
        type: 'POST',
        url: base,
        data: JSON.stringify(body),
        processData: false,
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Content-Type': 'application/json'
        }
    }).done((result) => {
        const score = result.documents[0].score;
        const rating = Math.round(score*4)+1;
        const currentItemId = JSON.parse(localStorage.getItem('currentItemId'));
        window.location.href = `/comments?classId=${currentItemId}&rating=${rating}&comments=${comments}`;
    }).fail((xhr, status, err) => {
        alert(err);
    });
}

function navigateToComments(classId) {
    localStorage.setItem('currentItemId', JSON.stringify(classId));
    window.location.href = 'comments?classId=' + classId;
}
