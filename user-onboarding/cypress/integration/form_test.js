// write tests here
describe('User App', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const nameInput = () => cy.get('input[name=name]');
  const emailInput = () => cy.get('input[name=email]');
  const passwordInput = () => cy.get('input[name=password]');
  const termsBoxInput = () => cy.get('[type=checkbox]');
  const submitBtn = () => cy.get("button[id='submitBtn']");
  const  foobarInput = () => cy.get('input[name=foobar]');

  it('SANITY CHECK to make sure tests work', () => {

    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({}); // strict ===
    expect({}).to.eql({}); // not strict ==

  })

  it('the proper elements are showing', () => {
    nameInput().should('exist');
    emailInput().should('exist');
    passwordInput().should('exist');
    termsBoxInput().should('exist');
    submitBtn().should('exist');
    foobarInput().should('not.exist');
    // cy.contains('Submit').should('exist');
    // cy.contains(/submit/i).should('exist');
  })

  describe('Filling out the inputs and submitting', () => {
    // We can use optional describe blocks to organize and group our tests
    // Can we navigate to the url
    it('can navigate to the url', () => {
        cy.url()
          .should('include', 'localhost');
    })

    // submit button should start out disabled
    it('submit button starts out disabled', () => {
        submitBtn()
          .should('be.disabled');
    })

    // type in the inputs
    it('can type in the inputs', () => {
      nameInput()
          .should('have.value', '')
          .type('username')
          .should('have.value', 'username');
      emailInput()
          .should('have.value', '')
          .type('email')
          .should('have.value', 'email');
      passwordInput()
          .should('have.value', '')
          .type('SixOrMore')
          .should('have.value', 'SixOrMore');
    })

    it('can check the box of Terms of Service', () => {
      nameInput()
          .should('have.value', '')
          .type('username')
          .should('have.value', 'username');
      emailInput()
          .should('have.value', '')
          .type('email')
          .should('have.value', 'email');
      passwordInput()
          .should('have.value', '')
          .type('SixOrMore')
          .should('have.value', 'SixOrMore');
      termsBoxInput()
          .click()
    })
    
    // submit button is NOT disabled after typing in the inputs
    it('the submit button enables when all inputs are filled out', () => {
        nameInput()
          .type('anything!');
        emailInput()
          .type('yes_123@gmail.com');
        passwordInput()
          .type('SixOrMoreYes');
        termsBoxInput()
          .click();
        submitBtn()
          .should('not.be.disabled');
    })

    it('button works and can submit a form', () => {
      nameInput()
        .type('TestOnly');
      emailInput()
        .type('test@gmail.com');
      passwordInput()
        .type('Test123');
      termsBoxInput()
        .click();
      submitBtn()
        .click();
    })
    // submit button should be enabled if all required inputs are filled
    it('checking for validation', () => {
      nameInput()
        .type('Mark')
        .should('have.value', 'Mark');
      emailInput()
        .type('escosuramarkse@gmail.com')
        .should('have.value', 'escosuramarkse@gmail.com');
      passwordInput()
        .type('Mark123')
        .should('have.value', 'Mark123');
      termsBoxInput()
        .click()
    })
   // clears the text fields
    it('can empty text fields', () => {
      nameInput()
        .type('Mark')
        .clear();
      emailInput()
        .type('escosuramarkse@gmail.com')
        .clear();
      passwordInput()
        .type('Mark123')
        .clear();
      termsBoxInput()
        .click()
        .wait(2500)
        .click()
        .wait(2500);
  })

})
  describe('Adding a new user' , () => {
    it('can submit a new user', () => {
      // first user
        nameInput()
          .type('Janita');
        emailInput()
          .type('janita_123@gmail.com');
        passwordInput()
          .type('SixOrMoreYes123');
        termsBoxInput()
          .click();
        cy.contains(/Janita/i)
          .should('exist');
        submitBtn()
          .click()
          .wait(2500);

      // second user
        nameInput()
          .type('Mark');
        emailInput()
          .type('mark_123@gmail.com');
        passwordInput()
          .type('SixOrMoreYes1234');
        termsBoxInput()
          .click();
        cy.contains(/Mark/i)
          .should('exist')
        submitBtn()
            .click();
    })

  })

})