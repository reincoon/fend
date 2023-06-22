// async function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     if (checkForName(formText)){
//         post('http://localhost:8080/test', 
//         {url: formText}).then(function(data){
//             document.getElementById('results').innerHTML = `
//             <p>Polarity: ${res.polarity}</p>
//             <p>Subjectivity: ${res.subjectivity}</p>
//             <p>Text: ${res.text}</p>`
//         })
    
//     } else alert("Please enter a valid data")
    

//     // console.log("::: Form Submitted :::")
//     // fetch('http://localhost:8080/test')
//     // .then(res => res.json())
//     // .then(function(res) {
//     //     //document.getElementById('results').innerHTML = res.message

        
//     // })
// }

// export { handleSubmit }


async function handleSubmit(event) {
    event.preventDefault();

    // Check what text was put into the form field
    let formText = document.getElementById('name').value;

    // Make a POST request to the server
    const response = await fetch('http://localhost:8080/add-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText }),
    });

    try {
        const data = await response.json();

        // Display the API response in the view
        document.getElementById('polarity').textContent = `Polarity: ${data.score_tag}`;
        document.getElementById('subjectivity').textContent = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('text').textContent = `Text: ${data.text}`;
    } catch (error) {
        console.log('Error:', error);
    }
}

export { handleSubmit };
