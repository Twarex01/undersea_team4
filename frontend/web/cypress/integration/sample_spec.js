/// <reference types="Cypress" />

describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
      cy.visit('https://example.cypress.io')

      cy.pause()
      
      cy.contains('type').click()

      cy.url().should('include', '/commands/actions')

      cy.get('.action-email')
        .type('fake@gmail.com')
        .should('have.value', 'fake@gmail.com')
    })
  })