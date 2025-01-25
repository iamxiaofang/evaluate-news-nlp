// Replace checkForName with a function that checks the URL
import { checkForUrl } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();
    // Get the URL from the input field
    const url = document.getElementById('url')
    // Check if the URL is valid
    const valid = checkForUrl(url.value);
    if (!valid) {
        const message = document.createElement('p');
        message.id = 'url_error';
        message.textContent = 'Please enter valid url';
        message.style.color = 'rgb(255, 0, 0)'
        url.insertAdjacentElement('afterend', message);
        return;
    }

    // If the URL is valid, send it to the server using the serverURL constant above
    postData(serverURL, { url: url.value })
        .then(response => response.json())
        .then(result => {
            if (!result.ok) {
                alert(result.error);
                return;
            }
            const { data } = result;

            const results = document.getElementById('results');
            const ul = document.createElement('ul');

            const polarity = document.createElement('li');
            polarity.textContent = `Polarity: ${data.polarity}`;

            const li1 = document.createElement('li');
            li1.textContent = `Subjectivity: ${data.subjectivity}`;

            const li2 = document.createElement('li');
            li2.textContent = `Snippet: ${data.snippet}`

            ul.appendChild(polarity);
            ul.appendChild(li1);
            ul.appendChild(li2);
            results.innerHTML = ul.outerHTML;
        })

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

