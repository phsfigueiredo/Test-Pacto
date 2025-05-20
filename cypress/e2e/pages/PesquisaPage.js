class PesquisaPage {
  constructor() {
    this.searchInput = 'input[name="p"]';
    this.resultadoDescricao = '.first > .dd > .compText > .fc-dustygray';
    this.posicaoPagina = '#cols';
    this.urlBase = 'https://search.yahoo.com/';
  }

  visitarPaginaPesquisa() {
    cy.visit(this.urlBase);
  }

  pesquisar(termo) {
    cy.get(this.searchInput).type(`${termo}{enter}`);
  }

  validarResultadoExiste() {
    cy.get(this.resultadoDescricao).should('exist');
  }

  validarDescricaoContemPactoSolucoes() {
    cy.get(this.resultadoDescricao)
      .invoke('text')
      .then((texto) => {
        expect(texto.toLowerCase()).to.include('pacto');
        expect(texto.toLowerCase()).to.include('soluções');
      });
  }

  validarPosicaoPagina() {
    cy.get(this.posicaoPagina)
      .invoke('text')
      .then((texto) => {
        if (texto.includes('1')) {
          cy.log('✅ A página está em primeiro lugar!');
        } else {
          cy.log(`🔎 A página está na posição: ${texto}`);
        }
      });
  }
}

export default new PesquisaPage();
