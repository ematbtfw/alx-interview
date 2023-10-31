def place_queen(n, row, solutions, cols, upright, downright):
    for col in range(n):
        if col not in cols and row-col not in upright and row+col not in downright:
            solutions.append([[row, col]] + sol for sol in solutions)
            place_queen(n, row+1, solutions, cols | {col}, upright | {row-col}, downright | {row+col})
            solutions = []
            cols = cols - {col}
            upright = upright - {row-col}
            downright = downright - {row+col}
            break

def solve_n_queens(n):
    if len(sys.argv) != 2 or not sys.argv[1].isdigit() or int(sys.argv[1]) < 4:
        print("Usage: nqueens N")
        sys.exit(1)

    solutions = []
    place_queen(n, 0, solutions, set(), set(), set())
    return solutions

for solution in solve_n_queens(int(sys.argv[1])):
    print(solution)