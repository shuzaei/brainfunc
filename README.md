# Brainfunc

# Language specification

| code            | C implementation                 |
| :-------------- | :------------------------------- |
| `0{}`           | `int main(void){return 0;}`      |
| `[1-9A-Za-z]{}` | `void [1-9A-Za-z](void){}`         |
| `>` `<`         | `ptr++` `ptr--`                  |
| `+` `-`         | `*ptr++` `*ptr--`                |
| `,` `.`         | `*ptr=getchar()` `putchar(*ptr)` |
| `()`            | `if(*ptr){}`                     |
| `[1-9A-Za-z]`   | `[1-9A-Za-z]()`                    |

# Sample code
```brainfuck
h{++++++++++++++++}
H{hhhh++++++++}
e{hhhhhh+++++}
l{hhhhhh++++++++++++}
o{hhhhhh+++++++++++++++}
c{hh++++++++++++}
s{hh}
W{hhhhh+++++++}
r{hhhhhhh++}
d{hhhhhh++++}
E{hh+}
n{++++++++++}
0{H.>e.>l.>l.>o.>c.>s.>W.>o.>r.>l.>d.>E.>n.}
```
