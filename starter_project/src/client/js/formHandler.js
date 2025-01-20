// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    // Check if the URL is valid
    // If the URL is valid, send it to the server using the serverURL constant above
    postData(serverURL, { text: formText })
        .then(response => response.json())
        .then(data => { console.log(data); return data; })
}

// Function to send data to the server
async function postData(url, data) {
    return fetch(url, {
        method: 'post',
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(data),
    })
}
// Export the handleSubmit function
export { handleSubmit };

