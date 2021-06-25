# Brainfunc
A functional programming language like brainf\*ck.

# Language specification

| code            | C implementation                 |
| :-------------- | :------------------------------- |
| `0{}`           | `int main(void){return 0;}`      |
| `[1-9A-Za-z]{}` | `void [1-9A-Za-z](void){}`       |
| `>` `<`         | `ptr++` `ptr--`                  |
| `+` `-`         | `(*ptr)++` `(*ptr)--`            |
| `,` `.`         | `*ptr=getchar()` `putchar(*ptr)` |
| `()`            | `if(*ptr){}`                     |
| `[1-9A-Za-z]`   | `[1-9A-Za-z]()`                  |

# Sample code
```brainfuck
h{++++++++++++++++}
H{hhhh++++++++}
e{hhhhhh+++++}
l{hhhhhh++++++++++++}
o{hhhhhh+++++++++++++++}
C{hh++++++++++++}
S{hh}
W{hhhhh+++++++}
r{hhhhhhh++}
d{hhhhhh++++}
E{hh+}
N{++++++++++}
0{H.>e.>l.>l.>o.>C.>S.>W.>o.>r.>l.>d.>E.>N.}
```
