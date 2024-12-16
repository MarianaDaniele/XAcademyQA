/// <reference types="Cypress" />

describe('Testing with multiple users', () => 
  {
    let data

    before(() => {
        cy.fixture('data.json').then((loadedData) => {
          data = loadedData // Carga una sola vez el archivo json
        })
      })
   
    beforeEach('Preconditions', () => 
    {
        cy.visit('https://www.saucedemo.com/', {
            onBeforeLoad(win) {
              delete win.navigator.__proto__.serviceWorker
            },
          })
        
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies()
       
    })

    it('Testing E2E with multiple users', () => {
        data.users.forEach((user) => {
          cy.log(`Iniciando pruebas para el usuario: ${user.username}`)
          cy.login(user,data.selectors.login, data.strings)
          cy.addToCart(data.selectors.addToCart, data.strings)
          cy.checkout(user.info,data.selectors.checkout, data.strings)
          cy.logout(data.selectors.logout, data.strings)          
        })
    })
    })   
    
    


