
var now = new Date();
var y = now.getFullYear();
var m = now.getMonth() + 1;
var d = now.getDate();

//月と日は0埋めを行う
m = m < 10 ? "0" + m : m;
d = d < 10 ? "0" + d : d;

//yyyy-mm-dd形式
document.querySelector("input[type=date]").value = y + "-" + m + "-" + d;




// Function to show the modal
function showModal(message) {
    var modal = document.getElementById("myModal");
    var modalNote = document.getElementById("modalNote"); // Corrected variable name

    // Set the message in the modal
    modalNote.textContent = message; // Corrected variable name

    // Show the modal
    modal.style.display = "block";

    // Add event listener to close the modal when the close button is clicked
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", function() {
      modal.style.display = "none";
    });
}
// Number Keypad 
var inputEl = document.getElementById('Amount');
var goodKey = '0123456789+ ';

var checkInputTel = function(e) {
  var key = (typeof e.which == "number") ? e.which : e.keyCode;
  var start = this.selectionStart,
    end = this.selectionEnd;

  var filtered = this.value.split('').filter(filterInput);
  this.value = filtered.join("");

  /* Prevents moving the pointer for a bad character */
  var move = (filterInput(String.fromCharCode(key)) || (key == 0 || key == 8)) ? 0 : 1;
  this.setSelectionRange(start - move, end - move);
}

var filterInput = function(val) {
  return (goodKey.indexOf(val) > -1);
}

inputEl.addEventListener('input', checkInputTel);
<input type='tel' id='Amount' />


// Add event listener to the form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the modal immediately to indicate form submission is in progress
    showModal("Submitting form...");

    // Perform an AJAX request to submit the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.action);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Successful response
          var response = xhr.responseText;
          showModal(response); // Show the modal with the response message
          document.getElementById("myForm").reset(); // Clear the form fields
        } else {
          // Error response
          showModal("Error: Something went wrong."); // Show a generic error message
        }
      }
      
    };
    xhr.send(new FormData(this));
});

$(document).ready(function() {
      $.get("/getData", function(data) {
        $("#data").text(data);
      });
    });


