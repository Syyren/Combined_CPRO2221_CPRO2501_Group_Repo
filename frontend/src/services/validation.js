export function validateUsername(username) {
  return !username.trim()
    ? "Please enter a valid username"
    : !/^[a-zA-Z0-9._]+$/.test(username)
    ? "Username may only contain letters, digits, periods (.), or underscores (_)."
    : /^[_.]|[_]$/.test(username)
    ? "Username cannot start or end with a period (.) or underscore (_)."
    : /(\.|_){2}/.test(username)
    ? "Consecutive periods (.) or underscores (_) are not allowed."
    : username.length < 6 || username.length > 30
    ? "Username must be 6 to 30 characters long."
    : "";
}

export function validatePassword(password) {
  return password.length < 6 || password.length > 30
    ? "Password must be 6 to 30 characters long."
    : !/[A-Z]/.test(password)
    ? "Password must contain 1 uppercase letter"
    : !/[a-z]/.test(password)
    ? "Password must contain 1 lowercase letter"
    : !/[0-9]/.test(password)
    ? "Password must contain at least 1 number"
    : !/[^a-zA-Z0-9]/.test(password)
    ? "Password must contain at least 1 special character"
    : "";
}

export function validateEmail(email) {
  return !email.trim()
    ? "Please enter a valid email address."
    : !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
    ? "Please enter a valid email address."
    : "";
}

export function validateConfirmPassword(confirmPassword, password) {
  return !confirmPassword.trim()
    ? "Please confirm your password."
    : password !== confirmPassword
    ? "Passwords do not match."
    : "";
}
