// Dashboard.js

const validEmail = "admin@sasi.ac.in"; // This will be handled by the backend
const validPassword = "password123"; // This will be handled by the backend

function nextStep(stepId) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));

    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("loginError");

    // Send login data to the backend
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput, password: passwordInput }),
        });

        if (response.ok) {
            errorMessage.textContent = ""; 
            nextStep("dashboard");
        } else {
            errorMessage.textContent = "Invalid email or password. Please try again.";
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    nextStep('login');
});