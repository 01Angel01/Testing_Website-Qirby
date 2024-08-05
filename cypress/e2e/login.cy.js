describe("Login Page Test Cases", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
    })

    it("Successfully Load the Login Page", () => {
        cy.url().should("eq", "http://localhost:8000/login");
        cy.title().should("eq", "Qirby Admin | Login");
        cy.contains("Login").should('be.visible');
        cy.contains("Username").should('be.visible');
        cy.contains("Password").should('be.visible');
        const button = cy.get('.btn').contains("LOGIN");
        button.should('be.visible');
    });

    it("Login with Null Values", () => {
        cy.url().should("eq", "http://localhost:8000/login");
        const button = cy.get('.btn').contains("LOGIN");
        button.click();
        cy.get('#username').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it("Login with Wrong Values", () => {
        cy.url().should("eq", "http://localhost:8000/login");
        const username = cy.get("input[name = 'username']");
        username.type("Testing12345");

        const password = cy.get("input[name='password']");
        password.type("12345678");

        const button = cy.get('.btn').contains("LOGIN");
        button.click();
        cy.get('.swal2-header').contains('Oops...');
        cy.contains('Your credentials are wrong').should('be.visible');
    });

    it("Login with Correct Values", () => {
        cy.login();
        cy.url().should("eq", "http://localhost:8000/home");
        cy.contains("Dashboard");
    });
});