describe('Logout Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
        cy.login();
    })

    it('Admin cancel logout from the website', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        cy.contains('Logout').click();
        cy.contains('Are you sure you want to logout?').should('be.visible');
        cy.get('.btn-secondary').contains('Cancel').click();
        cy.url().should("eq", "http://localhost:8000/home");

    })

    it('Admin logout from the website', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        cy.contains('Logout').click();
        cy.contains('Are you sure you want to logout?').should('be.visible');
        cy.get('.btn-primary').contains('Logout').click();
        cy.url().should("eq", "http://localhost:8000/");
        cy.title().should("eq", "Landing Page Admin Website");
        cy.contains("Login");
    })
})