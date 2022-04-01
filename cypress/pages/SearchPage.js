
class SearchPage {

  static elements = {
    INPUT_TEXT: 'input.gLFyf.gsfi',
    BUTTON_SEARCH: 'input.gNO89b',
  }

  static visit() {
    cy.visit('/');
  }

  static fillLoginData(text) {
    cy.get(this.elements.INPUT_TEXT).type(text);
  }

  static clickSearchBtn() {
    cy.get(this.elements.BUTTON_SEARCH).last().click({ force: true });
  }
}

export default SearchPage;