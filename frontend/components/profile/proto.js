// request
function fetchData() {
    fetch('https://purdueeats-304919.uc.r.appspot.com/Users/')
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