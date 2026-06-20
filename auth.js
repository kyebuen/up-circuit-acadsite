/* auth.js - Connected to the Cloud Backend */

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const inputEmail = document.getElementById('username').value.trim();
    const inputPassword = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    // Visual feedback
    errorMessageDiv.textContent = "Connecting to server...";
    errorMessageDiv.style.color = "#94a3b8";

    try {
        // Send login attempt to your PythonAnywhere server
        const response = await fetch('https://kyebuen.pythonanywhere.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputEmail,
                password: inputPassword
            })
        });

        const result = await response.json();

        if (response.ok) {
            // Success: Set the session badge and redirect
            sessionStorage.setItem('isLoggedIn', 'true');
            
            errorMessageDiv.style.color = "#34d399"; 
            errorMessageDiv.textContent = "Login successful! Redirecting...";
            
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            // Failure: Show the error from the server
            errorMessageDiv.style.color = "#f87171";
            errorMessageDiv.textContent = result.message;
        }
        
    } catch (error) {
        // Network or Server errors
        errorMessageDiv.style.color = "#f87171";
        errorMessageDiv.textContent = "Cannot connect to server. Please try again later.";
        console.error("Server Error:", error);
    }
});
