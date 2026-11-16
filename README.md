# Batalha Naval - Casos de Teste

Trabalho de casos de teste para o jogo Batalha Naval, escrito em JavaScript e testado com Jest.

## Requisitos testados

- Tabuleiro 10 x 10
- Frota com 4 navios:

| Navio        | Casas |
|--------------|-------|
| Porta-aviões | 5     |
| Encouraçado  | 4     |
| Submarino    | 3     |
| Destroier    | 2     |

## Arquivos

- `batalhaNaval.js` - implementação do tabuleiro (posicionar navios e atirar)
- `batalhaNaval.test.js` - casos de teste
- `package.json` - configuração do projeto e do Jest

## Como rodar

É preciso ter o [Node.js](https://nodejs.org) instalado.

```bash
npm install
npm test
```

## Casos de teste

### Tabuleiro 10 x 10

| ID   | Descrição                                   | Resultado esperado            |
|------|---------------------------------------------|-------------------------------|
| CT01 | Verificar o tamanho do tabuleiro            | 10 linhas e 10 colunas        |
| CT02 | Criar um tabuleiro novo                     | Nenhuma casa ocupada          |
| CT03 | Validar os cantos (0,0) e (9,9)             | Posições válidas              |
| CT04 | Validar (-1,0), (0,10) e (10,10)            | Posições inválidas            |

### Tamanho dos navios

| ID   | Descrição                                   | Resultado esperado            |
|------|---------------------------------------------|-------------------------------|
| CT05 | Posicionar o porta-aviões                   | 5 casas ocupadas              |
| CT06 | Posicionar o encouraçado                    | 4 casas ocupadas              |
| CT07 | Posicionar o submarino                      | 3 casas ocupadas              |
| CT08 | Posicionar o destroier                      | 2 casas ocupadas              |
| CT09 | Posicionar a frota completa                 | 4 navios e 14 casas ocupadas  |

### Posicionamento dos navios

| ID   | Descrição                                        | Resultado esperado              |
|------|--------------------------------------------------|---------------------------------|
| CT10 | Posicionar submarino na vertical em (2,5)        | Ocupa (2,5), (3,5) e (4,5)      |
| CT11 | Posicionar porta-aviões encostado na borda (9,5) | Posicionado até (9,9)           |
| CT12 | Posicionar porta-aviões em (0,6) na horizontal   | Erro "Navio fora do tabuleiro"  |
| CT13 | Posicionar encouraçado em (7,0) na vertical      | Erro "Navio fora do tabuleiro"  |
| CT14 | Posicionar um navio em cima de outro             | Erro "Posição já ocupada"       |
| CT15 | Posicionar o mesmo navio duas vezes              | Erro "Navio já posicionado"     |
| CT16 | Posicionar um navio que não existe ("fragata")   | Erro "Tipo de navio inválido"   |

### Tiros

| ID   | Descrição                                   | Resultado esperado              |
|------|---------------------------------------------|---------------------------------|
| CT17 | Atirar em uma casa vazia                    | Retorna "agua"                  |
| CT18 | Atirar em uma casa com navio                | Retorna "acerto"                |
| CT19 | Atirar duas vezes na mesma casa             | Erro "Posição já atacada"       |
| CT20 | Atirar fora do tabuleiro                    | Erro "Tiro fora do tabuleiro"   |
| CT21 | Acertar todas as casas do destroier         | Retorna "afundou"               |
| CT22 | Afundar os 4 navios                         | Jogo termina (todos afundados)  |

## Resultado

Os 22 casos de teste passam.

```
Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
```
