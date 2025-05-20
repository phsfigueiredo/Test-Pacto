/// <reference types="cypress" />

import SegurancaActions from '../actions/SegurancaActions.js';

describe('Validação da página de Segurança e Privacidade no UOL', () => {
  beforeEach(() => {
    SegurancaActions.visitarPaginaSeguranca();
  });

  it('Verifica se a palavra "Atualização" está presente', () => {
    SegurancaActions.validarPalavraAtualizacao();
     SegurancaActions.capturarDataAtualizacao();
  });

  
});
