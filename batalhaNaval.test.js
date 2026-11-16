const { Tabuleiro, NAVIOS, TAMANHO } = require('./batalhaNaval');

// Monta um tabuleiro com a frota completa, usado em vários testes
function criarTabuleiroCompleto() {
  const t = new Tabuleiro();
  t.posicionarNavio('portaAvioes', 0, 0, 'H'); // (0,0) até (0,4)
  t.posicionarNavio('encouracado', 2, 0, 'H'); // (2,0) até (2,3)
  t.posicionarNavio('submarino', 4, 0, 'H'); // (4,0) até (4,2)
  t.posicionarNavio('destroier', 6, 0, 'H'); // (6,0) até (6,1)
  return t;
}

describe('Tabuleiro 10 x 10', () => {
  test('CT01 - tabuleiro deve ter 10 linhas e 10 colunas', () => {
    const t = new Tabuleiro();
    expect(TAMANHO).toBe(10);
    expect(t.grade.length).toBe(10);
    t.grade.forEach((linha) => expect(linha.length).toBe(10));
  });

  test('CT02 - tabuleiro novo deve começar vazio (só água)', () => {
    const t = new Tabuleiro();
    expect(t.casasOcupadas()).toBe(0);
  });

  test('CT03 - posições dos cantos (0,0) e (9,9) são válidas', () => {
    const t = new Tabuleiro();
    expect(t.dentroDoTabuleiro(0, 0)).toBe(true);
    expect(t.dentroDoTabuleiro(9, 9)).toBe(true);
  });

  test('CT04 - posições fora do limite são inválidas', () => {
    const t = new Tabuleiro();
    expect(t.dentroDoTabuleiro(-1, 0)).toBe(false);
    expect(t.dentroDoTabuleiro(0, 10)).toBe(false);
    expect(t.dentroDoTabuleiro(10, 10)).toBe(false);
  });
});

describe('Tamanho dos navios', () => {
  test('CT05 - porta-aviões ocupa 5 casas', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('portaAvioes', 0, 0, 'H');
    expect(NAVIOS.portaAvioes).toBe(5);
    expect(t.casasOcupadas()).toBe(5);
  });

  test('CT06 - encouraçado ocupa 4 casas', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('encouracado', 0, 0, 'H');
    expect(t.casasOcupadas()).toBe(4);
  });

  test('CT07 - submarino ocupa 3 casas', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('submarino', 0, 0, 'H');
    expect(t.casasOcupadas()).toBe(3);
  });

  test('CT08 - destroier ocupa 2 casas', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('destroier', 0, 0, 'H');
    expect(t.casasOcupadas()).toBe(2);
  });

  test('CT09 - frota completa tem 4 navios e ocupa 14 casas', () => {
    const t = criarTabuleiroCompleto();
    expect(t.frotaCompleta()).toBe(true);
    expect(t.casasOcupadas()).toBe(14);
  });
});

describe('Posicionamento dos navios', () => {
  test('CT10 - navio na vertical ocupa a mesma coluna em linhas seguidas', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('submarino', 2, 5, 'V');
    expect(t.grade[2][5]).toBe('submarino');
    expect(t.grade[3][5]).toBe('submarino');
    expect(t.grade[4][5]).toBe('submarino');
    expect(t.grade[5][5]).toBe(null);
  });

  test('CT11 - navio pode encostar na borda (porta-aviões da coluna 5 até a 9)', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('portaAvioes', 9, 5, 'H');
    expect(t.grade[9][9]).toBe('portaAvioes');
  });

  test('CT12 - não permite navio saindo do tabuleiro na horizontal', () => {
    const t = new Tabuleiro();
    expect(() => t.posicionarNavio('portaAvioes', 0, 6, 'H')).toThrow(
      'Navio fora do tabuleiro'
    );
    expect(t.casasOcupadas()).toBe(0);
  });

  test('CT13 - não permite navio saindo do tabuleiro na vertical', () => {
    const t = new Tabuleiro();
    expect(() => t.posicionarNavio('encouracado', 7, 0, 'V')).toThrow(
      'Navio fora do tabuleiro'
    );
  });

  test('CT14 - não permite sobrepor dois navios', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('portaAvioes', 0, 0, 'H');
    expect(() => t.posicionarNavio('submarino', 0, 4, 'V')).toThrow(
      'Posição já ocupada'
    );
    expect(t.casasOcupadas()).toBe(5);
  });

  test('CT15 - não permite posicionar o mesmo navio duas vezes', () => {
    const t = new Tabuleiro();
    t.posicionarNavio('destroier', 0, 0, 'H');
    expect(() => t.posicionarNavio('destroier', 5, 5, 'H')).toThrow(
      'Navio já posicionado'
    );
  });

  test('CT16 - não permite tipo de navio que não existe', () => {
    const t = new Tabuleiro();
    expect(() => t.posicionarNavio('fragata', 0, 0, 'H')).toThrow(
      'Tipo de navio inválido'
    );
  });
});

describe('Tiros', () => {
  test('CT17 - tiro em casa vazia retorna "agua"', () => {
    const t = criarTabuleiroCompleto();
    expect(t.atirar(9, 9)).toBe('agua');
  });

  test('CT18 - tiro em casa com navio retorna "acerto"', () => {
    const t = criarTabuleiroCompleto();
    expect(t.atirar(0, 0)).toBe('acerto');
  });

  test('CT19 - não permite atirar duas vezes na mesma casa', () => {
    const t = criarTabuleiroCompleto();
    t.atirar(3, 3);
    expect(() => t.atirar(3, 3)).toThrow('Posição já atacada');
  });

  test('CT20 - não permite atirar fora do tabuleiro', () => {
    const t = criarTabuleiroCompleto();
    expect(() => t.atirar(10, 0)).toThrow('Tiro fora do tabuleiro');
    expect(() => t.atirar(0, -1)).toThrow('Tiro fora do tabuleiro');
  });

  test('CT21 - acertar todas as casas do destroier retorna "afundou"', () => {
    const t = criarTabuleiroCompleto();
    expect(t.atirar(6, 0)).toBe('acerto');
    expect(t.atirar(6, 1)).toBe('afundou');
    expect(t.navioAfundado('destroier')).toBe(true);
    expect(t.navioAfundado('submarino')).toBe(false);
  });

  test('CT22 - jogo termina quando os 4 navios forem afundados', () => {
    const t = criarTabuleiroCompleto();
    for (let c = 0; c < 5; c++) t.atirar(0, c); // porta-aviões
    for (let c = 0; c < 4; c++) t.atirar(2, c); // encouraçado
    for (let c = 0; c < 3; c++) t.atirar(4, c); // submarino
    expect(t.todosAfundados()).toBe(false); // ainda falta o destroier
    t.atirar(6, 0);
    t.atirar(6, 1);
    expect(t.todosAfundados()).toBe(true);
  });
});
