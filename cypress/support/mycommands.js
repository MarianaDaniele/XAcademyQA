
Cypress.Commands.add('login', (user, selectors,strings) => {
    cy.get(selectors.user).type(user.username)
    cy.get(selectors.password).type(user.password)
    cy.get(selectors.btnLogin).click()
    cy.url().should('include', strings.urlLoginOk)   
    
  }) 

Cypress.Commands.add('addToCart', (selectors, strings) => {
  cy.get(selectors.item).each(($el) => {
    cy.wrap($el).within(() => {
      cy.contains(strings.labelBtn).click()
    })
  })
  cy.get(selectors.badge).should('contain.text', '6')
  
});  

Cypress.Commands.add('checkout', (user, selectors, strings) => {
  cy.get(selectors.cart).click()
  cy.url().should('include', strings.urlCart)
  cy.get(selectors.btnCheckout).click()
  cy.url().should('include', strings.urlCheckoutForm)
  cy.get(selectors.formFirstName).type(user.firstName)
  cy.get(selectors.formLastName).type(user.lastName)
  cy.get(selectors.formPostalCode).type(user.postalCode)
  cy.get(selectors.formBtnContinue).click()
  cy.get(selectors.btnFinish).click()
  cy.url().should('include', strings.urlCheckoutComplete)
  cy.get('h2').should('contain.text', strings.messageOk)  
})

Cypress.Commands.add('logout', (selectors, strings) => {
  cy.get(selectors.burger).click({ force: true })
  cy.get(selectors.optionLogout).click({ force: true })
  cy.url().should('include', strings.urlLogout)
})


