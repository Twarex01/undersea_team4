describe("Buildings Page", () => {
    beforeEach(() => {
        cy.request('POST', 'https://localhost:5001/api/login', {
            userName: 'test',
            password: 'test'
        })
        .its('body')
        .as('token')

        cy.get('@token').then((response) => {
            localStorage.setItem('token', 'Bearer ' + response)
        })
    })

    function nextRound() {
        cy.request('POST', 'https://localhost:5001/api/round')
    }


    it('should show buildings', () => {
        cy.visit('/buildings')

        cy.get('.building-card-item').should('exist')
    })

    it("should be able to do a successful buy", () => {
        for (let index = 0; index < 5; index++){
            nextRound();
        }
        
        cy.visit('/buildings')
        cy.get('.building-card-item').first().click()
        cy.get("#buyBtn").click()

        cy.get('.building-card-item').first().find(".indicator > span").contains("még 5 kör")
    })
})