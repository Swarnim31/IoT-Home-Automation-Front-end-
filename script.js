const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
    const searchText = searchInput.value.toLowerCase();
    const elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = element.textContent || element.innerText;

        if (text && text.toLowerCase().includes(searchText)) {
            element.style.backgroundColor = "yellow";
            element.style.color = "black";
        } else {
            element.style.backgroundColor = "transparent";
            element.style.color = "white";
        }
    }
});

searchInput.addEventListener("input", function() {
    searchButton.disabled = !searchInput.value;
});

searchButton.disabled = false;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

// Function to validate and login
function validateAndLogin() {
    var input = $(".validate-input .input100");
    var check = true;
  
    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
  
    if (check) {
      var username = $('input[name="email"]').val();
      var password = $('input[name="pass"]').val();
  
      fetch("https://192.168.186.112/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle success response
          if (data.message === "success") {
            // Set a cookie with the username
            document.cookie = `username=${username}; expires=${new Date(
              Date.now() + 86400e3
            ).toUTCString()}; path=/`;
  
            // Set a boolean cookie indicating the user is logged in
            document.cookie = `isLoggedIn=true; expires=${new Date(
              Date.now() + 86400e3
            ).toUTCString()}; path=/`;
        
  
            // Redirect to the loader page
            window.location.href = "lights.html";
          } else {
            alert("Login failed. Please check your credentials.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  
    $(".validate-form .input100").each(function () {
      $(this).focus(function () {
        hideValidate(this);
      });
    });
  
    function validate(input) {
      if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
        if (
          $(input)
            .val()
            .trim()
            .match(
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null
        ) {
          return false;
        }
      } else {
        if ($(input).val().trim() == "") {
          return false;
        }
      }
      return true;
    }
  
    function showValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).addClass("alert-validate");
    }
  
    function hideValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
  }
  

  

