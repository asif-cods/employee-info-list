
const http = new MockAPI();

document.querySelector("#btn-update").style.display = "none";
const form = document.querySelector("#emp-form");
form.style.display = "none";
const table = document.querySelector("#emp-table");
table.style.display = "none";

// Event listensers
document.querySelector("#add-emp").addEventListener("click", function(){
    form.style.display = "block";
    table.style.display = "block";
    display();
})

document.querySelector("#view-emp").addEventListener("click", function(){
    table.style.display = "block";
    display();
})

form.addEventListener("submit", addEmp);

document.querySelector("#emp-list").addEventListener("click",empDelete);

document.querySelector("#emp-list").addEventListener("click",empEdit);

document.querySelector("#btn-update").addEventListener("click", empUpdate);

// Functions

function addEmp(e){
    e.preventDefault(); // Prevent page reload

    const name = document.querySelector("#emp-name").value.trim();
    const jobTitle = document.querySelector("#emp-position").value.trim();
    const country = document.querySelector("#country").value.trim();

    // Console log the input values
    // console.log("Employee Name:", name);
    // console.log("Job Title:", jobTitle);
    // console.log("Country:", country);
    if (!name || !jobTitle || !country) {
        showAlert("Please fill all fields!", "alert-danger");
        return;
    }
    const data = {
        name: name,
        jobTitle: jobTitle,
        country: country
    }
    http.post("https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users", data)
    .then(data => {
        showAlert("Successfully added Emp", "alert-success");
        display();
    })
    .catch(err => console.log("Error occur adding employee", err))
    
    clearField();
    
}


function showAlert(message, className){
    let displayAlert = document.querySelector(".show-alert");
    displayAlert.innerHTML = `
        <div class="alert ${className}" role="alert">
        ${message}
        </div>
    `;
    setTimeout(()=> {
        displayAlert.innerHTML = "";
    }, 4000);

}

function clearField(){
    document.querySelector("#emp-name").value = "";
    document.querySelector("#emp-position").value = "";
    document.querySelector("#country").value = "";
}

function display() {
    // e.preventDefault();
    const empList = document.querySelector("#emp-list");
    empList.innerHTML = ""; // Clear the table before populating

    http.get("https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users")
    .then(data => {
                console.log("API Response-1111:", data);
            // data.forEach(eachData => 
                for (let eachData of data){
                        console.log(eachData);
                        // const row = document.createElement("tr");
                        empList.innerHTML += `
                        <tr id="${eachData.id}">
                            <td>${eachData.name}</td>
                            <td>${eachData.jobTitle}</td>
                            <td>${eachData.country}</td>
                            <td class="d-flex gap-2">
                                <span class="btn btn-warning edit">E</span>
                                <span class="btn btn-danger delete">D</span>
                            </td>
                        </tr>
                        `;
                // empList.appendChild(row);
            }
        // );

            // Add event listeners for edit and delete buttons
            // addEditDeleteListeners();
        })
        .catch(err => console.log("Error occurred while fetching employee info", err));
}


function empDelete(e) {
    if (e.target.classList.contains("delete")) {
        const id = e.target.parentElement.parentElement.getAttribute("id"); // Get employee ID from selected emp list
        console.log("Deleting Employee ID:", id); // Debugging

        if (!id) {
            console.log("Error: No Employee ID found");
            return;
        }

        http.delete(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users/${id}`)
        .then(() => {
            showAlert("Employee deleted successfully!", "alert-danger");
            display(); // Refresh the table after deletion
        })
        .catch(err => console.log("Error deleting employee:", err));
    }
}

let editEmpId = null;
function empEdit(e){
    form.style.display = "block";
    if (e.target.classList.contains("edit")) {
         editEmpId = e.target.parentElement.parentElement.getAttribute("id"); // Get employee ID from selected emp list
        console.log("Editing Employee ID:", editEmpId); // Debugging

        if (!editEmpId) {
            console.log("Error: No Employee ID found");
            return;
        }
        else{
            http.get(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users/${editEmpId}`)
            .then(data => {
                document.querySelector("#emp-name").value = data.name;
                document.querySelector("#emp-position").value = data.jobTitle;
                document.querySelector("#country").value = data.country;
                document.querySelector("#btn-submit").style.display = "none";
                document.querySelector("#btn-update").style.display = "block";
                // console.log(id);
                // empUpdate(id);

               })
            }

        }

}


// function empUpdate() {
//     if (!editEmpId) {
//         console.log("Error: No employee ID found for update.");
//         return;
//     }

//     const name = document.querySelector("#emp-name").value.trim();
//     const jobTitle = document.querySelector("#emp-position").value.trim();
//     const country = document.querySelector("#country").value.trim();

//     if (!name || !jobTitle || !country) {
//         showAlert("Please fill all fields!", "alert-warning");
//         return;
//     }

//     const updatedData = { name, jobTitle, country };

//     http.put(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/id/${editEmpId}`, updatedData)
//     .then((data) => {
//         console.log("before edting",data);

//         showAlert("Employee data updated successfully!", "alert-info");
//         console.log("after edting",data);

//         document.querySelector("#btn-update").style.display = "none";
//         document.querySelector("#btn-submit").style.display = "block";
//         document.querySelector("#emp-form").reset(); // Clear form
//         editEmpId = null; // Reset stored ID
//     })
//     .catch(err => console.log("Error updating employee:", err));
//     display(); // Refresh table after update

// }

// function empUpdate() {
//     if (!editEmpId) {
//         console.log("Error: No employee ID found for update.");
//         return;
//     }

//     const name = document.querySelector("#emp-name").value.trim();
//     const jobTitle = document.querySelector("#emp-position").value.trim();
//     const country = document.querySelector("#country").value.trim();

//     if (!name || !jobTitle || !country) {
//         showAlert("Please fill all fields!", "alert-warning");
//         return;
//     }

//     const updatedData = { name, jobTitle, country };
//     console.log("updating data",updatedData);

//     http.put(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users/${editEmpId}`, updatedData)
//     .then((data) => {
//         showAlert("Employee data updated successfully!", "alert-info");
//         console.log(data);

//         // Reset the form and button states
//         document.querySelector("#btn-update").style.display = "none";
//         document.querySelector("#btn-submit").style.display = "block";
//         // document.querySelector("#emp-form").reset(); // Clear form
//         clearField();
//         editEmpId = null; // Reset stored ID
//         console.log("iddddddddddd",data.id);
//         // Refresh table AFTER the update is successful
//         display();
//     })
//     .catch(err => console.log("Error updating employee:", err));



// http.put(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users/${editEmpId}`, updatedData)
//     .then((data) => {
//         console.log("API Response:", data); // Log the API response
//         showAlert("Employee data updated successfully!", "alert-info");

//         // Reset the form and button states
//         document.querySelector("#btn-update").style.display = "none";
//         document.querySelector("#btn-submit").style.display = "block";
//         clearField(); // Clear form fields
//         editEmpId = null; // Reset stored ID

//         // Refresh table AFTER the update is successful
//         display();
//     })
//     .catch(err => {
//         console.log("Error updating employee:", err);
//         showAlert("Failed to update employee. Please try again.", "alert-danger");
//     });
// }




function empUpdate(e) {
    e.preventDefault();
    if (!editEmpId) {
        console.log("Error: No employee ID found for update.");
        return;
    }

    const name = document.querySelector("#emp-name").value.trim();
    const jobTitle = document.querySelector("#emp-position").value.trim();
    const country = document.querySelector("#country").value.trim();

    if (!name || !jobTitle || !country) {
        showAlert("Please fill all fields!", "alert-warning");
        return;
    }

    const updatedData = { name, jobTitle, country };
    console.log("Sending this data to API:", updatedData); // Log the payload

    http.put(`https://67ce5fa0125cd5af757a47c8.mockapi.io/user/Users/${editEmpId}`, updatedData)
        .then((data) => {
            console.log("API Response:", data); // Log the API response
            showAlert("Employee data updated successfully!", "alert-info");

            // Reset the form and button states
            document.querySelector("#btn-update").style.display = "none";
            document.querySelector("#btn-submit").style.display = "block";
            clearField(); // Clear form fields
            editEmpId = null; // Reset stored ID

            // Refresh table AFTER the update is successful
            display();
        })
        .catch(err => {
            console.log("Error updating employee:", err);
            showAlert("Failed to update employee. Please try again.", "alert-danger");
        });
}