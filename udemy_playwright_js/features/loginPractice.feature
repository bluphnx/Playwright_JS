Feature: Ecommerce3 Validation
    @E2E
    Scenario: Incorrect Login and verify error message
        Given I login to the LoginPractice application with "rahulshettyacademy" and "Learning@"
        Then verify error message is displayed
        

