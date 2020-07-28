/// <reference types="cypress" />

describe('Login Page', () => {

    const loginUrl = "http://localhost:4200/login"

    function login(user){
        cy.visit('/login')
        cy.get('#userName').type(user.userName)
        cy.get('#password').type(user.password)
        return cy.get('#submitBtn').click()
    }

    it('sets jwt token when logging in', () => {
        const user = {userName: "test", password: "test"};
      
        login(user).should(() => {
            expect(localStorage.getItem('token')).to.be.not.null
        })

        cy.url().should('eq', 'http://localhost:4200/')
        cy.get('.profile-box > p').should('contain', user.userName)
    })

    it("shouldn't let in with invalid name/password", () => {
        const user = {userName: "invalid", password: "invalid"};

        login(user);
        cy.url().should('eq', loginUrl)
        cy.get('simple-snack-bar').should('exist')
        cy.get('simple-snack-bar > span').should('contain.text', "Nem megfelelo")
    })

    it("shouldn't send invalid data to server", () => {
        const user = {userName: " ", password: " "};

        login(user);

        cy.url().should('eq', loginUrl)
        cy.get('.error').should('contain.text', "Érvénytelen felhasználónév!")
        cy.get('.error').should('contain.text', "Érvénytelen jelszó!")
    })
  })