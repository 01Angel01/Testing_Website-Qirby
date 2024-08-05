describe('Schedule Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
        cy.login();
    })

    it('Verify the Schedule page display Name Property, Name User, Phone User, Date Schedule, Time Schedule, PIC, Note, Status Schedule and Action for Schedule',
        () => {
            cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
            cy.contains('Schedule').click();
            Cypress.on('uncaught:exception', (err, runnable) => {
                if (err.message.includes('$ is not defined')) {
                    return false;
                }
                return true;
            });
            cy.contains('Name Property').should('be.visible');
            cy.contains('Name User').should('be.visible');
            cy.contains('Phone User').should('be.visible');
            cy.get('.table-responsive').scrollTo(500, 0);
            cy.wait(2000);
            cy.contains('Date Schedule').should('be.visible');
            cy.contains('Time Schedule').should('be.visible');
            cy.get('[aria-label="PIC: activate to sort column ascending"]').contains('PIC').should('be.visible');
            cy.get('[aria-label="Note: activate to sort column ascending"]').contains('Note').should('be.visible');
            cy.contains('Status Schedule').should('be.visible');
            cy.contains('Action User').should('be.visible');
        })

    it('The admin views the details of the schedule', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-detail').contains('Detail').click();
        cy.contains('Name').should('be.visible');
        cy.contains('Phone').should('be.visible');
        cy.contains('Schedule Date').should('be.visible');
        cy.contains('Schedule Time').should('be.visible');
        cy.contains('PIC').should('be.visible');
        cy.contains('Note').should('be.visible');
        cy.contains('Status').should('be.visible');
        cy.contains('Edit PIC').should('be.visible');
        cy.contains('Edit Note').should('be.visible');
        cy.get('.btn-success').contains('Accept').should('be.visible');
        cy.get('.btn-danger').contains('Reject').should('be.visible');
    })

    it('The admin accept schedule user', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-detail').contains('Detail').click();
        cy.get('#edit-pic-1').type('Admin');
        cy.wait(3000);
        cy.get('#edit-catatan-1').type('Please make sure your WhatsApp is always active during that time.');
        cy.get('.btn-success').contains('Accept').click();

        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Saved!').should('be.visible');
        cy.contains('Your changes have been saved.').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click();
        cy.wait(2000);

        cy.contains('Admin').should('be.visible');
        cy.get('.table-responsive').scrollTo(500, 0);
        cy.wait(2000);
        cy.get('.odd > :nth-child(7)').contains('Please make sure your WhatsApp is always active during that time.').should('be.visible');
        cy.get('.odd > :nth-child(8)').contains('Accept').should('be.visible');
    })

    it('The admin done schedule user', () => {
        cy.get(':nth-child(3) > div > .nav-link > .nav-icon').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-detail').contains('Detail').click();
        cy.get('.modal-body > .btn').contains('Done').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Saved!').should('be.visible');
        cy.contains('Your changes have been saved.').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click();
        cy.wait(2000);
        cy.get('.table-responsive').scrollTo(500, 0);
        cy.wait(2000);
        cy.get('.odd > :nth-child(8)').contains('Done').should('be.visible');
    })

    it('The admin reject schedule user', () => {
        cy.get(':nth-child(3) > div > .nav-link > .nav-icon').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-detail').contains('Detail').click();
        cy.wait(2000);
        cy.get('#edit-catatan-1').type('Your phone number is inactive');
        cy.get('.btn-danger').contains('Reject').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Saved!').should('be.visible');
        cy.contains('Your changes have been saved.').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click();
        cy.get('.table-responsive').scrollTo(500, 0);
        cy.wait(2000);
        cy.get('.odd > :nth-child(8)').contains('Reject').should('be.visible');
    })

    it('The admin canceled deleted schedule', () => {
        cy.get(':nth-child(3) > div > .nav-link').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-danger').contains('Delete').click();
        cy.contains('Are you sure?').should('be.visible');
        cy.contains("You won't be able to revert this!").should('be.visible');
        cy.get('.swal2-cancel').contains('Cancel').click();

        // Check Data
        cy.get('.table-responsive').scrollTo(500, 0);
        cy.wait(2000);
        cy.get('.odd > :nth-child(8)').contains('Reject').should('be.visible');
    })

    it('The admin deleted schedule', () => {
        cy.get(':nth-child(3) > div > .nav-link').click();
        cy.contains('Schedule').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-danger').contains('Delete').click();
        cy.contains('Are you sure?').should('be.visible');
        cy.contains("You won't be able to revert this!").should('be.visible');
        cy.get('.swal2-confirm').contains('Yes, delete it!').click();
        cy.wait(2000);
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Success').should('be.visible');
        cy.contains('Schedule deleted').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click({ force: true });
        cy.wait(2000);

        // Check Data
        cy.get('.table-responsive').scrollTo(500, 0);
        cy.wait(2000);
        cy.contains('Reject').should('not.exist');
    })
})