document.addEventListener("DOMContentLoaded", function() {
    registerBudgetSliderListeners();
    registerCustomCheckboxToggles();
});

/* Budget Slider - update value visible in DOM */
var registerBudgetSliderListeners = function() {
    var budgetSlider = document.querySelector('[data-budget-slider]');
    budgetSlider.addEventListener('input', function() {
        updateBudgetSliderValue(this.value);
    });
    // IE 10 don't support input event, need to read for change event too
    budgetSlider.addEventListener('change', function() {
        updateBudgetSliderValue(this.value);
    });

    var budgetValue = document.querySelector('[data-budget-value]');
    var updateBudgetSliderValue = function(value) {
        budgetValue.innerHTML = value;
    }
};

/* Custom checkboxes - Handle toggle (click) events */
var registerCustomCheckboxToggles = function() {
    document.querySelectorAll('[data-checkbox-toggle]').forEach(function(toggle) { 
        toggle.addEventListener('click', function() {
            var checkboxName = this.dataset.checkboxToggle;
            var checkbox = document.querySelector('[data-checkbox="'+checkboxName+'"]');
            var newState = ! JSON.parse(checkbox.dataset.checked);
            checkbox.classList.toggle('checkbox-on');
            checkbox.dataset.checked = newState;

            // Call checkbox listerner __name__ChangedEvent() if exists
            if (typeof window[checkboxName+"ChangedEvent"] === "function") { 
                window[checkboxName+"ChangedEvent"](newState);
            }
        });
    });
};

/* Inquiry checkbox */
window.inquiryChangedEvent = function(state) {
    var inquiryDetails = document.querySelector('[data-inquiry-details]');
    var inquiryDetailsWrapper = document.querySelector('.inquiry-details__wrapper');
    if (inquiryDetails.clientHeight) {
      inquiryDetails.style.height = 0;
      inquiryDetails.style.opacity = 0.3;
    } else {
      inquiryDetails.style.height = inquiryDetailsWrapper.clientHeight + "px";
      inquiryDetails.style.opacity = 1;
    }
}