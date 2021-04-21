// request

function fetchData() {
  
  return fetch(`https://app-5fyldqenma-uc.a.run.app/Users/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user_id: "0",
      name: "admin",
      email: "admin@purdueeats.com",
      password: "PEadmin"
    })
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function(data) {
      return fetch("https://app-5fyldqenma-uc.a.run.app/Users/Feedback", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + data.token
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          const html = data
            .map(user => {
              return `
            <div class="user">
                <p><strong>User Name</strong>: ${user.name}</p>
                <p><strong>User ID</strong>: ${user.user_id}</p>
                <p><strong>User Email</strong>: <a href="mailto:${user.email}">${user.email}</a></p>
                <p><strong>User Feedback Message</strong>: ${user.feedback_text}</p>
                <p><strong>Timestamp</strong>: ${user.timestamp}</p>
            </div>
            `;
            })
            .join("");
            console.log(html)
          document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
  }

fetchData();
