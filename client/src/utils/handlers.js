/**
 * Handles the sign up action from the Hero section
 * @param {Event} e - Form submission event
 * @param {string} username - The entered username
 */
export const handleSignUpSubmit = (e, username) => {
    e.preventDefault();

    if (!username.trim()) {
        console.warn("Username cannot be empty");
        alert("Please enter a username to claim your link.");
        return;
    }

    // In a real application, this would redirect or API call
    console.log(`Initiating signup flow for: linkdock.com/${username}`);
    alert(`Redirecting to claim: linkdock.com/${username}`);
};
