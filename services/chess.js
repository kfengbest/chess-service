/*
  a b c d e f g h
8 R N B Q K B N R
7 P P P P P P P P
6
5
4
3
2 p p p p p p p p
1 r n b q k b n r
*/

const KNIGHT = 'N';
const PAWN = 'P';
const KING = 'K';
const BISHOP = 'B';
const QUEEN = 'Q';
const ROOK = 'R';


const WHITE = 'W';
const BLACK = 'B';
const PLAYERS = [BLACK, WHITE];
const MOVE_NORMAL = "normal";
const MOVE_ATTACK = "attack";

const VALID_PIECES = 'NPKBQR';
const SECOND_RANK = { B: '7', W: '2' };


/*
   0x88:  1000 1000
   0 :    0000 0000
   16:    0001 0000
   32:    0010 0000
   48:    0011 0000
   64:    0100 0000
   80:    0101 0000
   96:    0110 0000
   112    0111 0000   
*/
const SQUARES = {
    a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
    a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23,
    a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39,
    a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55,
    a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71,
    a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87,
    a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};

const PAWN_OFFSETS = {
    B: [16, 32, 17, 15],
    W: [-16, -32, -17, -15],
};

class Chess {
    constructor(board, nextPlayer = BLACK) {
        if (board) {
            this.board = board;
            this.nextPlayer = nextPlayer;
        } else {
            this.resetBoard();
        }
    }

    emptyBoard() {
        const squares = Object.keys(SQUARES);
        this.board = {};
        this.nextPlayer = BLACK;
        squares.map(square => {
            this.board[square] = {
                color: '',
                piece: '',
            };
            return square;
        });
    }

    getNextPlayer() {
        return this.nextPlayer;
    }

    resetBoard() {
        this.emptyBoard();
        this.board.a8 = { color: BLACK, piece: ROOK };
        this.board.b8 = { color: BLACK, piece: KNIGHT };
        this.board.c8 = { color: BLACK, piece: BISHOP };
        this.board.d8 = { color: BLACK, piece: QUEEN };
        this.board.e8 = { color: BLACK, piece: KING };
        this.board.f8 = { color: BLACK, piece: BISHOP };
        this.board.g8 = { color: BLACK, piece: KNIGHT };
        this.board.h8 = { color: BLACK, piece: ROOK };

        this.board.a7 = { color: BLACK, piece: PAWN };
        this.board.b7 = { color: BLACK, piece: PAWN };
        this.board.c7 = { color: BLACK, piece: PAWN };
        this.board.d7 = { color: BLACK, piece: PAWN };
        this.board.e7 = { color: BLACK, piece: PAWN };
        this.board.f7 = { color: BLACK, piece: PAWN };
        this.board.g7 = { color: BLACK, piece: PAWN };
        this.board.h7 = { color: BLACK, piece: PAWN };

        this.board.a1 = { color: WHITE, piece: ROOK };
        this.board.b1 = { color: WHITE, piece: KNIGHT };
        this.board.c1 = { color: WHITE, piece: BISHOP };
        this.board.d1 = { color: WHITE, piece: QUEEN };
        this.board.e1 = { color: WHITE, piece: KING };
        this.board.f1 = { color: WHITE, piece: BISHOP };
        this.board.g1 = { color: WHITE, piece: KNIGHT };
        this.board.h1 = { color: WHITE, piece: ROOK };

        this.board.a2 = { color: WHITE, piece: PAWN };
        this.board.b2 = { color: WHITE, piece: PAWN };
        this.board.c2 = { color: WHITE, piece: PAWN };
        this.board.d2 = { color: WHITE, piece: PAWN };
        this.board.e2 = { color: WHITE, piece: PAWN };
        this.board.f2 = { color: WHITE, piece: PAWN };
        this.board.g2 = { color: WHITE, piece: PAWN };
        this.board.h2 = { color: WHITE, piece: PAWN };
    }

    getBoard() {
        return this.board;
    }

    isInBoard(position) {
        if (typeof position === 'string') {
            position = SQUARES[`${position}`.toLowerCase()];
            if (position === undefined) {
                return null;
            }
        }

        const first_pos = SQUARES.a8;
        const last_pos = SQUARES.h1;
        if (
            position >= first_pos &&
            position <= last_pos &&
            (position & 0x88) === 0   //0x88:  1000 1000
        ) {
            return position;
        }
        return null;
    }

    valueToCord(value) {
        const swaped = Object.fromEntries(
            Object.entries(SQUARES).map(a => a.reverse())
        );
        return swaped[value];
    }

    getRank(position) {
        if (typeof position === 'string') {
            return position[1];
        }
        return this.valueToCord(position)[1];
    }

    getSquare(position) {
        if(this.isInBoard(position)) {
            return this.board[position];
        } else {
            return {
                color: '',
                piece: '',
            }
        }
    }

    canPawnDoubleJump(color, position) {
        if (typeof position === 'string') {
            position = SQUARES[position];
        }
        const rank = this.getRank(position);
        if (rank === SECOND_RANK[color]) {
            const offsets = PAWN_OFFSETS[color];

            const move = offsets[1] + position;
            let pos = this.valueToCord(move);
            const targetSquare = this.board[pos];

            const front = offsets[0] + position;
            pos = this.valueToCord(front);
            const frontSquare = this.board[pos];

            if (targetSquare && frontSquare) {
                if (!targetSquare.piece && !frontSquare.piece) {
                    return true;
                }
            }
        }
        return false;
    }

    getLegalMoves(playerColor, piece, position) {
        const pos_value = this.isInBoard(position);
        const legalMoves = [];
        if (pos_value !== null && VALID_PIECES.includes(piece)) {
            if (piece === PAWN) {
                const offsets = PAWN_OFFSETS[playerColor];
                const pawnPossibleMoves = [];
                // normal jump
                pawnPossibleMoves.push(offsets[0] + pos_value);

                // double jump
                if (this.canPawnDoubleJump(playerColor, pos_value)) {
                    pawnPossibleMoves.push(offsets[1] + pos_value);
                }

                for (let i = 0; i < pawnPossibleMoves.length; i++) {
                    const move = pawnPossibleMoves[i];
                    if (this.isInBoard(move)) {
                        const pos = this.valueToCord(move);
                        const square = this.board[pos];
                        if (!square.piece) {
                            legalMoves.push(pos);
                        }
                    }
                }

                for (let i = 2; i < 4; i++) {
                    const pawn_attack = offsets[i] + pos_value;
                    if (this.isInBoard(pawn_attack)) {
                        const pos = this.valueToCord(pawn_attack);
                        const square = this.board[pos];
                        if (square.piece && square.color !== playerColor) {
                            legalMoves.push(pos);
                        }
                    }
                }
            } else {
                // The other pieces's potential movement has not been impelmented yet.
            }
        }
        let legalMovesRes = legalMoves.map( to => {

            let flag = MOVE_NORMAL; // normal movement
            if (this.board[to].color) {
                if (this.board[to].color !== playerColor) {
                    flag = MOVE_ATTACK; // attack movement
                }
            }
            return {
                to : to,
                piece: this.board[to].piece,
                color: this.board[to].color,
                result: flag
            }
        })
        return legalMovesRes;
    }

    canMove(playerColor, piece, from, to) {
        const legalMoves = this.getLegalMoves(playerColor, piece, from);
        let res = legalMoves.filter( e => e.to === to);
        return res.length === 1 ? res[0] : null;
    }

    move(playerColor, from, to) {
        const square = this.board[from];
        let targetMove = null;
        if (square.color && square.color === playerColor) {
            targetMove = this.canMove(playerColor, square.piece, from ,to);
            if(targetMove) {
                this.board[to] = { color: playerColor, piece: square.piece };
                this.board[from] = { color: '', piece: '' };
                this.nextPlayer = this.nextPlayer === BLACK ? WHITE : BLACK;
            }
        }
        return targetMove;
    }

    printBoard() {
        let rows = '87654321';
        let cols = 'abcdefgh';
        let res = [];
        for (let r of rows) {
            let rowValue = '';
            for (let c of cols) {
                let pos = c + r;
                let square = this.board[pos];
                let piece = square.piece ? square.piece : ' ';
                let color = square.color ? square.color : ' ';
                let val = `${piece}-${color} `;
                rowValue += val;
            }
            res.push(rowValue);
            console.log(rowValue);
        }

        return res;
    }
}

module.exports = {
    Chess
}