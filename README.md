# Brainfunc
A functional programming language like brainf\*ck.

# BCC
A compiler of Brainfunc.

# Installing BCC to /usr/local/bin/
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the commands below.

```sh
chmod +x install.sh && ./install.sh
```

3. (Optional) Delete the cloned files.

# Uninstalling BCC from /usr/bin/
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the commands below.

```sh
chmod +x uninstall.sh && ./uninstall.sh
```

3. (Optional) Delete the cloned files.

# Using BCC
```sh
bcc <filename> [execname]
```

# Language specification

- Extention: `.b`, `.bc`, `.bf`
- Environment: `int buf[1000000], *ptr=buf;`
- Implementation:

| code            | C implementation                   |
| :-------------- | :--------------------------------- |
| `0{}`           | `int main(void){return 0;}`        |
| `[1-9A-Za-z]{}` | `void [1-9A-Za-z](void){}`         |
| `>` `<`         | `ptr++;` `ptr--;`                  |
| `+` `-`         | `(*ptr)++;` `(*ptr)--;`            |
| `,` `.`         | `*ptr=getchar();` `putchar(*ptr);` |
| `()`            | `if(*ptr){}`                       |
| `[1-9A-Za-z]`   | `[1-9A-Za-z]();`                   |

- Notice: `255+1=0`, `0-1=255`

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
