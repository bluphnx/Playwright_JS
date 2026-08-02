Feature: Ecommerce Validation

    Scenario: Place order and verify in order history
        Given I login to the ecommerce application with "r123am@gmail.com" and "Amazon@123"
        When I search for "ADIDAS ORIGINAL" and add it to cart
        And I verify product is displayed in the cart 
        And I enter account details and place the order for the "r123am@gmail.com"
        Then I should see the order in the order history page

