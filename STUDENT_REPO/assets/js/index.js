$("#add_user").submit(function (event) {
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function (event) {
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    let request = {
        "url": `https://d3v5t4ck.herokuapp.com/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    })

})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        let id = $(this).attr("data-id")

        let request = {
            "url": `https://d3v5t4ck.herokuapp.com/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

async function getUser() {
    alert("Random User added from API");
    const re = await fetch('https://randomuser.me/api');
    const { results } = await re.json();
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

            "gender": results[0].gender,
            "title": results[0].name.title,
            "first": results[0].name.first,
            "last": results[0].name.last,
            "city": results[0].location.city,
            "state": results[0].location.state,
            "country": results[0].location.country,
            "postcode": results[0].location.postcode,
            "email": results[0].email,
            "username": results[0].login.username,
            "date": results[0].dob.date,
            "age": results[0].dob.age,
            "phonenumber": results[0].phone,
            "password": results[0].login.password,
            
        })
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
        .catch(function (err) {
            console.info(err + " url: " + url);
        });
}


function sendData(e) {
    const searchResults = document.getElementById('searchResults')
    const selectType = document.getElementById('selectType').value;
    let match = e.value.match(/^[a-zA-Z0-9@._]*/);
    let match2 = e.value.match(/\s*/);
    if (match2[0] === e.value) {
        searchResults.innerHTML = '';
        return;
    }
    if (match[0] === e.value) {
        fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: selectType,
                search: e.value
            })
        }).then(res => res.json()).then(data => {
            let payload = data.result;
            searchResults.innerHTML = '';
            if (payload.length < 1) {
                searchResults.innerHTML = '<p style="font-size: large;text-align: center;"><strong>Sorry no users found</strong></p>';
                return;
            }
         
           
            searchResults.innerHTML+=`<table class="table">
            <caption><h2 style="color: #000;">Search Results</h2></caption>
            <thead class="thead-dark">
                <tr>
                    <th>Profile</th>           
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr> 
            </thead>
        
         </table>`
            payload.forEach(element => {
              
   
                searchResults.innerHTML += `<tr>   <td><img style="border-radius: 28px; height:55px;width: 55px;"src="${element.thumbnail}" alt=""></td>
                <td>${element.name.first}</td><td>${element.email}</td><td>${element.location.city}</td><td>${element.gender}</td><td>${element.phone}</td><td>
                    <a  href="/updateUser?id=${element._id} " name="ss"value="${element._id}"class="btn border-shadow update">
                        <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
                    </a>
                    <a class="btn border-shadow delete" href="/deleteUser?id=${element._id}">
                        <span class="text-gradient"><i class="fas fa-times"></i></span>
                    </a>
                </td></tr>`
            });
        })
        return;
    }
    searchResults.innerHTML = ''
}
