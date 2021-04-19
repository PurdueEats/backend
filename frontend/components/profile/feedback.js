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
                <p>User Name: ${user.name}</p>
                <p>User ID: ${user.user_id}</p>
                <p>User Email: ${user.email}</p>
                <p>User Feedback Message: ${user.feedback_text}</p>
                <p>Timestamp: ${user.timestamp}</p>
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
