// Set today's date in the date input
document.addEventListener('DOMContentLoaded', function() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    document.querySelector("input[type=date]").value = y + "-" + m + "-" + d;
});

// Function to show the modal
function showModal(message) {
    var modal = document.getElementById("myModal");
    var modalNote = document.getElementById("modalNote");

    // Set the message in the modal
    modalNote.textContent = message;

    // Show the modal
    modal.style.display = "block";

    // Add event listener to close the modal when the close button is clicked
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Add event listener to the form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Remove previous error highlighting
    document.querySelectorAll('.error').forEach(function(element) {
        element.classList.remove('error');
    });

    // Collect form data
    var formData = new FormData(this);
    var valid = true;

    // Define categories with corresponding IDs
    var categories = [
        'Food',
        'Bills',
        'Housing',
        'Transports',
        'Shopping',
        'Personal_Discretionary',
        'Income',
        'Credit_Card',
        'Cashback'
    ];

    // Validate each category
    categories.forEach(function(category) {
        var description = formData.get(category + '_Description');
        var amount = formData.get(category + '_Amount');

        // Check if amount is filled and description is missing
        if (amount && !description) {
            valid = false;
            document.getElementById(category + '_Description').classList.add('error');
            showModal('Please provide a description for ' + category.replace('_', ' ') + '.');
        }

        // Check if description is filled and amount is missing
        if (description && !amount) {
            valid = false;
            document.getElementById(category + '_Amount').classList.add('error');
            showModal('Please provide an amount for ' + category.replace('_', ' ') + '.');
        }
    });

    if (!valid) return;

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
    xhr.send(formData);
});