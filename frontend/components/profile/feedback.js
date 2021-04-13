// request
function fetchData() {
    fetch('https://app-5fyldqenma-uc.a.run.app/Users/Feedback')
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Here's a list of repos!
        console.log(data)
        const html = data.map(user => {
            return `
            <div class="user">
                <p>User Name: ${user.name}</p>
                <p>User ID: ${user.user_id}</p>
                <p>User Email: ${user.email}</p>
                <p>User Feedback: ${user.feedback_text}</p>
                <p>Timestamp: ${user.timestamp}</p>
            </div>
            `;
        })
        .join("");
        console.log(html);
        document.querySelector('#app').insertAdjacentHTML("afterbegin", html);
//        document
//            .querySelector('#app')
//            .insertAdjacentHTML("afterbegin", "<h1>Users</h1>")
      })
      .catch(error => {
        console.log(error);
      });
}

fetchData();