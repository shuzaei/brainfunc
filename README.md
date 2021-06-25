# Brainfunc
A functional programming language like brainf\*ck.

# BCC
A compiler of Brainfunc.

# Installing BCC
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the command below on the cloned directory.

```sh
./install.sh
```

3. (Optional) Delete the cloned files.

# Uninstalling BCC
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the command below on the cloned directory.

```sh
./uninstall.sh
```

3. (Optional) Delete the cloned files.

# Using BCC
```sh
bcc <filename> [execname]
```

# Language specification

- Recommended extension: `.b`, `.bc`, `.bf`
- Environment implementation: `static char buf[1000000],*ptr=buf;int main(void){f_0();return 0;}`
- Code implementation:

| code            | C implementation                   |
| :-------------- | :--------------------------------- |
| `[0-9A-Za-z]{}` | `void f_[1-9A-Za-z](void){}`         |
| `>` `<`         | `ptr++;` `ptr--;`                  |
| `+` `-`         | `(*ptr)++;` `(*ptr)--;`            |
| `,` `.`         | `*ptr=getchar();` `putchar(*ptr);` |
| `()`            | `if(*ptr){}`                       |
| `[0-9A-Za-z]`   | `f_[1-9A-Za-z]();`                   |

- Notice: input `EOF` is `-1`.

# Sample code
- Hello World

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

- Echo

```brainfuck
e{,+(-.e)}
0{e}
```
