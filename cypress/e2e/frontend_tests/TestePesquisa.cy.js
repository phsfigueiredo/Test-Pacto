/// <reference types="cypress" />

import PesquisaActions from '../actions/PesquisaActions.js';

describe('Teste de Pesquisa no Yahoo', () => {
  beforeEach(() => {
    PesquisaActions.visitarPaginaPesquisa();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Pesquisa por título "Pacto Soluções" existente', () => {
    PesquisaActions.pesquisar('Pacto Soluções');
    PesquisaActions.validarResultadoExiste();
    PesquisaActions.validarDescricaoContemPactoSolucoes();
    PesquisaActions.validarPosicaoPagina();
  });
});
