class SegurancaPage {
  constructor() {
    this.urlSeguranca = 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade.html';
    this.atualizacaoTexto = 'Atualização:'; // Texto referência
  }

  visitarPaginaSeguranca() {
    cy.visit(this.urlSeguranca);
  }

  validarPalavraAtualizacao() {
    cy.contains(this.atualizacaoTexto).should('exist');
  }

  capturarDataAtualizacao() {
    cy.contains(this.atualizacaoTexto)
      .parent()
      .invoke('text')
      .then((texto) => {
        const dataAtualizacao = texto.replace('Atualização:', '').trim();
        cy.log(`Última atualização encontrada: ${dataAtualizacao}`);
      });
  }
}

export default new SegurancaPage();
