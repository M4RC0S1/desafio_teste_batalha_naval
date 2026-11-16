// Batalha Naval - regras do tabuleiro
// Tabuleiro 10 x 10 com 4 navios:
//   Porta-aviões (5 casas), Encouraçado (4), Submarino (3), Destroier (2)

const TAMANHO = 10;

const NAVIOS = {
  portaAvioes: 5,
  encouracado: 4,
  submarino: 3,
  destroier: 2,
};

class Tabuleiro {
  constructor() {
    this.tamanho = TAMANHO;
    // grade[linha][coluna] guarda o nome do navio ou null (água)
    this.grade = [];
    for (let i = 0; i < TAMANHO; i++) {
      this.grade.push(new Array(TAMANHO).fill(null));
    }
    this.navios = {}; // tipo -> { tamanho, acertos }
    this.tiros = []; // lista de "linha,coluna" já atacados
  }

  dentroDoTabuleiro(linha, coluna) {
    return (
      Number.isInteger(linha) &&
      Number.isInteger(coluna) &&
      linha >= 0 &&
      linha < TAMANHO &&
      coluna >= 0 &&
      coluna < TAMANHO
    );
  }

  // orientacao: 'H' (horizontal) ou 'V' (vertical)
  posicionarNavio(tipo, linha, coluna, orientacao) {
    if (!(tipo in NAVIOS)) {
      throw new Error('Tipo de navio inválido');
    }
    if (orientacao !== 'H' && orientacao !== 'V') {
      throw new Error('Orientação inválida');
    }
    if (this.navios[tipo]) {
      throw new Error('Navio já posicionado');
    }

    const tamanho = NAVIOS[tipo];
    const casas = [];
    for (let i = 0; i < tamanho; i++) {
      const l = orientacao === 'V' ? linha + i : linha;
      const c = orientacao === 'H' ? coluna + i : coluna;
      if (!this.dentroDoTabuleiro(l, c)) {
        throw new Error('Navio fora do tabuleiro');
      }
      if (this.grade[l][c] !== null) {
        throw new Error('Posição já ocupada');
      }
      casas.push([l, c]);
    }

    for (const [l, c] of casas) {
      this.grade[l][c] = tipo;
    }
    this.navios[tipo] = { tamanho: tamanho, acertos: 0 };
  }

  frotaCompleta() {
    return Object.keys(this.navios).length === Object.keys(NAVIOS).length;
  }

  casasOcupadas() {
    let total = 0;
    for (const linha of this.grade) {
      for (const casa of linha) {
        if (casa !== null) total++;
      }
    }
    return total;
  }

  // retorna 'agua', 'acerto' ou 'afundou'
  atirar(linha, coluna) {
    if (!this.dentroDoTabuleiro(linha, coluna)) {
      throw new Error('Tiro fora do tabuleiro');
    }
    const chave = linha + ',' + coluna;
    if (this.tiros.includes(chave)) {
      throw new Error('Posição já atacada');
    }
    this.tiros.push(chave);

    const tipo = this.grade[linha][coluna];
    if (tipo === null) {
      return 'agua';
    }

    const navio = this.navios[tipo];
    navio.acertos++;
    if (navio.acertos === navio.tamanho) {
      return 'afundou';
    }
    return 'acerto';
  }

  navioAfundado(tipo) {
    const navio = this.navios[tipo];
    return navio !== undefined && navio.acertos === navio.tamanho;
  }

  todosAfundados() {
    if (!this.frotaCompleta()) return false;
    return Object.keys(this.navios).every((tipo) => this.navioAfundado(tipo));
  }
}

module.exports = { Tabuleiro, NAVIOS, TAMANHO };
