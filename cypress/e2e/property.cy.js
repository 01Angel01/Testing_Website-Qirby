describe('Property Page Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
    cy.contains("Login").click();
    cy.login();
  })

  it('Verify the Property Management page displays Property Name, Property Image, Property Price, Property Status, and Action for Property', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.contains('Property Name').should('be.visible');
    cy.contains('Property Image').should('be.visible');
    cy.contains('Property Price').should('be.visible');
    cy.contains('Property Status').should('be.visible');
    cy.contains('Action Property').should('be.visible');
  })

  it('Verify the add property form displays Upload Image, Property Name, Property Price, Property Status, Maps, Property Address, Property Description, Property Facilities, and Save button.', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    cy.get('button').contains('Add Property').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get('form > :nth-child(2) > .form-label').contains('Upload Image').should('be.visible');
    cy.contains('Property Name').should('be.visible');
    cy.contains('Property Price').should('be.visible');
    cy.contains('Property Status').should('be.visible');
    cy.get('#peta-tambah-properti').should('be.visible');
    cy.get('.modal-content').first().scrollTo('bottom', { ensureScrollable: false });
    cy.contains('Property Address').scrollIntoView().should('be.visible');
    cy.contains('Property Description').should('be.visible');
    cy.contains('Property Facilities').should('be.visible');
    cy.contains('Sqft').should('be.visible');
    cy.contains('Bath').should('be.visible');
    cy.contains('Garage').should('be.visible');
    cy.contains('Floor').should('be.visible');
    cy.contains('Bed').should('be.visible');
    const button = cy.get('.btn').contains('Save');
    button.should('be.visible');
  })

  it('The admin adds a property with valid data', () => {
    cy.contains('Property Management').click();
    cy.get('.d-flex > .btn').contains('Add Property').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });

    // Upload Images Property
    cy.get(':nth-child(2) > #formFile').attachFile(["1.jpg", "2.jpg"]);

    cy.wait(3000);
    cy.get('form > :nth-child(4) > .form-control').type('Puri Harvest South Jakarta');
    const price = cy.get('form > .input-group > .form-control');
    price.click();
    price.type('3.900.000.000');

    const status = cy.get('#formulir-tambah-properti > .form-select');
    status.select('Ready');

    const address = cy.get(':nth-child(12) > .form-control');
    address.click().clear();
    address.type('Jalan Metro Pondok Indah, RW 03, Pondok Pinang, Kebayoran Lama, South Jakarta, Special Region of Jakarta, Java, 12310, Indonesia');

    const description = cy.get('#formulir-tambah-properti > :nth-child(13) > .form-control');
    description.click();
    description.type('Property is in a strategic location in South Jakarta Area. Quiet and safe environment. Suitable for residential homes, rental businesses & boarding houses');

    const sqft = cy.get('form > .row > :nth-child(1) > #inputnumber');
    sqft.click();
    sqft.type('5000');

    cy.get('form > .row > :nth-child(4) > #inputbath').click().type('3');
    cy.get('form > .row > :nth-child(2) > #inputgarage').click().type('1');
    cy.get('form > .row > :nth-child(5) > #inputfloor').click().type('2');
    cy.get('form > .row > :nth-child(3) > #inputbed').click().type('3');

    cy.get('.modal-body > form > .btn').contains('Save').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Saved!').should('be.visible');
    cy.contains('Your changes have been saved.').should('be.visible');
    cy.get('.swal2-confirm').click();


    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });

    // Check Data
    cy.wait(3000);
    cy.contains('Puri Harvest South Jakarta').should('be.visible');
    cy.contains('Lihat Foto').should('be.visible');
    cy.contains('3.900.000.000').should('be.visible');
    cy.contains('ready').should('be.visible');
    cy.get(':nth-child(6) > .btn-detail').contains('Edit').should('be.visible');
    cy.contains('Delete').should('be.visible');
  })

  it('The admin adds a property with Null Values', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    cy.get('button').contains('Add Property').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get('.modal-body > form > .btn').contains('Save').click();
    cy.get('#formulir-tambah-properti > :nth-child(4) > .form-control').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })

  it('Edit Data Property with Null Values', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get('.btn-detail').contains('Edit').click();

    const name = cy.get(':nth-child(7) > .form-control');
    name.clear();
    cy.wait(1000);

    const price_edit = cy.get('.modal-body > .input-group > .form-control');
    price_edit.clear();

    const address_edit = cy.get('#addressa');
    address_edit.clear();

    const description_edit = cy.get(':nth-child(17) > .form-control');
    description_edit.clear();

    const sqft = cy.get('.modal-body > .row > :nth-child(1) > #inputnumber');
    sqft.clear();

    const bath = cy.get('.modal-body > .row > :nth-child(4) > #inputbath');
    bath.clear();

    const garage = cy.get('.modal-body > .row > :nth-child(2) > #inputgarage');
    garage.clear();

    const floor = cy.get('.modal-body > .row > :nth-child(5) > #inputfloor');
    floor.clear();

    const bed = cy.get('.modal-body > .row > :nth-child(3) > #inputbed');
    bed.clear();

    const button = cy.get('.btn').contains('Save');
    button.click();

    cy.get(':nth-child(7) > .form-control').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })

  it('Edit Data Property with Correct Values', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get('.btn-detail').contains('Edit').click();

    cy.wait(3000);

    // Edit Image
    cy.get(':nth-child(4) > #formFile').attachFile(["3.png"]);

    // Preview Image
    cy.get('img').should('be.visible');

    const name = cy.get(':nth-child(7) > .form-control');
    name.clear();
    name.type('Kasva House');

    const price_edit = cy.get('.modal-body > .input-group > .form-control');
    price_edit.clear();
    price_edit.type('2.500.000.000');

    const status = cy.get('.modal-body > .form-select');
    status.select('Sold');

    const address_edit = cy.get('#addressa');
    address_edit.clear();
    address_edit.type('Jl. Aselih Dalam No.121, Cipedak, District. Jagakarsa, South Jakarta City, Special Capital Region of Jakarta 12630');

    const description_edit = cy.get(':nth-child(17) > .form-control');
    description_edit.clear();
    description_edit.type('House with complete facilities in an elite area, comfortable and safe residence. Strategic location and flood-free in South Jakarta area');

    const sqft = cy.get('.modal-body > .row > :nth-child(1) > #inputnumber');
    sqft.clear();
    sqft.type('7000');

    const bath = cy.get('.modal-body > .row > :nth-child(4) > #inputbath');
    bath.clear();
    bath.type('5');

    const garage = cy.get('.modal-body > .row > :nth-child(2) > #inputgarage');
    garage.clear();
    garage.type('2');

    const floor = cy.get('.modal-body > .row > :nth-child(5) > #inputfloor');
    floor.clear();
    floor.type('3');

    const bed = cy.get('.modal-body > .row > :nth-child(3) > #inputbed');
    bed.clear();
    bed.type('5');

    const button = cy.get('.btn').contains('Save');
    button.click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Saved!').should('be.visible');
    cy.wait(3000);
    cy.contains('Your changes have been saved').should('be.visible');
    cy.get('.swal2-confirm').click();

    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });

    // Check Data
    cy.contains('Kasva House').should('be.visible');
    cy.contains('2.500.000.000').should('be.visible');
    cy.contains('sold').should('be.visible');
  })

  it('Admin Canceled Delete Property', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.wait(3000);
    cy.get(':nth-child(6) > .btn-danger').contains('Delete').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Are you sure?').should('be.visible');
    cy.contains("You won't be able to revert this!").should('be.visible');
    cy.get('.swal2-cancel').contains('Cancel').click();
    cy.wait(3000);
    cy.get('h1').contains('Property Management').should('be.visible');

    // Check Data
    cy.contains('Kasva House').should('be.visible');
    cy.contains('2.500.000.000').should('be.visible');
    cy.contains('sold').should('be.visible');
  })

  it('Admin Delete Property', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get(':nth-child(6) > .btn-danger').contains('Delete').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Are you sure?').should('be.visible');
    cy.contains("You won't be able to revert this!").should('be.visible');
    cy.get('.swal2-confirm').contains('Yes, delete it!').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Success').should('be.visible');
    cy.contains('Property deleted successfully.').should('be.visible');
    cy.get('.swal2-confirm').contains('OK').click();

    // Check Data
    cy.contains('Kasva House').should('not.exist');
    cy.contains('2.500.000.000').should('not.exist');
    cy.contains('sold').should('not.exist');
  })

  it('Verify that Admins cannot delete a property if a user has already created a schedule for that property', () => {
    cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
    cy.contains('Property Management').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('$ is not defined')) {
        return false;
      }
      return true;
    });
    cy.get(':nth-child(6) > .btn-danger').contains('Delete').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Are you sure?').should('be.visible');
    cy.contains("You won't be able to revert this!").should('be.visible');
    cy.get('.swal2-confirm').contains('Yes, delete it!').click();
    cy.get('.swal2-popup').should('be.visible');
    cy.contains('Error').should('be.visible');
    cy.contains('Cannot delete the property because this property has a schedule with a user.').should('be.visible');
    cy.get('.swal2-confirm').contains('OK');
  })
})
