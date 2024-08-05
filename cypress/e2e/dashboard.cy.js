describe('Dashboard Page Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
        cy.login();
    })

    it('Verify the dashboard page displays Total Sold Properties, Total Available Properties, Total Pending Properties, Total Properties, Property and Schedule Graph', () => {
        cy.wait(3000);
        cy.contains('Total Sold Properties').should('be.visible');
        cy.contains('Total Available Properties').should('be.visible');
        cy.contains('Total Pending Properties').should('be.visible');
        cy.contains('Total Properties').should('be.visible');
        cy.contains('Schedule Overview').should('be.visible');
        cy.get(':nth-child(1) > .card > .card-body').should('be.visible');
        cy.get(':nth-child(2) > .card > .card-body').should('be.visible');
    })
})