cd "$(dirname "$0")"
marp --html --allow-local-files --title 'Brainfunc' brainfunc.md -o ./brainfunc.html
marp --html --allow-local-files --title 'Brainfunc' brainfunc-dark.md -o ./brainfunc-dark.html
CHROME_PATH=/usr/bin/google-chrome
marp --pdf --allow-local-files --title 'Brainfunc' brainfunc.md -o ./brainfunc.pdf
marp --pdf --allow-local-files --title 'Brainfunc' brainfunc-dark.md -o ./brainfunc-dark.pdf

marp --images png --allow-local-files --title 'Brainfunc' brainfunc.md -o ./image/
marp --images png --allow-local-files --title 'Brainfunc' brainfunc-dark.md -o ./image/