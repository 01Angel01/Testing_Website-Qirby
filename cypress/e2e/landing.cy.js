describe("Landing Page Test Cases", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
    })

    it("Successfully displayed the Landing Page", () => {
        cy.title().should("eq", "Landing Page Admin Website");
        cy.contains("Admin Website Qirby").should('be.visible');
        const button = cy.get('.btn').contains("Login");
        button.should('be.visible');
    });
});