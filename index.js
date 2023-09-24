

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const birthDayInput = document.getElementById("birthDay");
    const birthMonthInput = document.getElementById("birthMonth");
    const birthYearInput = document.getElementById("birthYear");
    const yearResult = document.getElementById("year");
    const monthResult = document.getElementById("month");
    const dayResult = document.getElementById("day");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get user inputs
      const day = parseInt(birthDayInput.value);
      const month = parseInt(birthMonthInput.value);
      const year = parseInt(birthYearInput.value);
  
      // Validate inputs
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showError("All fields are required");
        return;
      }
  
      if (day <= 0 || month <= 0 || year <= 0) {
        showError("Invalid input");
        return;
      }

      if (day > 31 || month > 12){
        showError("Invalid input");
        return;
      }
  
      // Calculate age
      const currentDate = new Date();
      const birthDate = new Date(year, month - 1, day);
  
      if (currentDate < birthDate) {
        showError("Invalid birthdate");
        return;
      }
  
      const ageInMilliseconds = currentDate - birthDate;
      const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
      const ageInYears = Math.floor(ageInDays / 365);
      const ageInMonths = Math.floor(ageInDays / 30);
  
      // Display results
      yearResult.textContent = ageInYears;
      monthResult.textContent = ageInMonths;
      dayResult.textContent = ageInDays;
    });
  
    function showError(message) {
      yearResult.textContent = "--";
      monthResult.textContent = "--";
      dayResult.textContent = "--";
  
      birthDayInput.style.borderColor = "red";
      birthMonthInput.style.borderColor = "red";
      birthYearInput.style.borderColor = "red";    
  
      const errorLabel = document.createElement("label");
      errorLabel.className = "error-message";
      errorLabel.textContent = message;
  
      const flexItem = document.querySelector(".flex-item");
      flexItem.appendChild(errorLabel);
    }
  
    // Remove error messages and styles when user starts typing
    birthDayInput.addEventListener("input", removeError);
    birthMonthInput.addEventListener("input", removeError);
    birthYearInput.addEventListener("input", removeError);
  
    function removeError() {
      const errorLabel = document.querySelector(".error-message");
      if (errorLabel) {
        errorLabel.remove();
      }
  
      birthDayInput.style.borderColor = "var(--clr-primary-hsl-500)";
      birthMonthInput.style.borderColor = "var(--clr-primary-hsl-500)";
      birthYearInput.style.borderColor = "var(--clr-primary-hsl-500)";
    }
  });
  