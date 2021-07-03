//
//  Copyright 2021 shuzaei
//
//  Email: shuzaei@gmail.com
//  URL: https://github.com/shuzaei/brainfunc/
//

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFSIZE 1000000
#define INNER_BUFSIZE 1000000

#define IN_FUNC 1
#define FUNC_NAME_DEFINED 2

#define where(filename) fprintf(stderr, "\e[91mError:\e[0m %s:%d:%d: ", filename, line, col)

void interpret(char *src, char *filename) {
    char *ptr, name = '0';
    int stat = 0, depth = 0, line = 1, col = 1, flags[128] = {};

    for (ptr = src; *ptr; ptr++) {
        if (('0' <= *ptr && *ptr <= '9') || ('A' <= *ptr && *ptr <= 'Z') ||
            ('a' <= *ptr && *ptr <= 'z') || *ptr == '_') {
            if (!(stat & IN_FUNC)) {
                if (stat & FUNC_NAME_DEFINED) {
                    where(filename);
                    fprintf(stderr, "Invalid function name\n");
                    exit(1);
                }
                if (flags[*ptr]) {
                    where(filename);
                    fprintf(stderr, "Invalid redeclaration of function \'%c\'\n", *ptr);
                    exit(1);
                }
                flags[*ptr] = 1;
                name = *ptr;
                stat |= FUNC_NAME_DEFINED;
            } else {
                printf("f_%c();", *ptr);
            }
        }

        else if (*ptr == '{') {
            if (stat & IN_FUNC) {
                where(filename);
                fprintf(stderr, "Invalid function declaration inside of a function\n");
                exit(1);
            }
            if (!(stat & FUNC_NAME_DEFINED)) {
                where(filename);
                fprintf(stderr, "Missing function name\n");
                exit(1);
            }
            stat |= IN_FUNC;
            printf("void f_%c(void){", name);
        } else if (*ptr == '}') {
            if (!(stat & IN_FUNC)) {
                where(filename);
                fprintf(stderr, "Unbalanced brace }\n");
                exit(1);
            }
            if (depth != 0) {
                where(filename);
                fprintf(stderr, "Unbalanced parentheses (\n");
                exit(1);
            }
            depth = 0;
            stat = 0;
            printf("}");
        }

        else if (strchr("><+-,.()", *ptr) && !(stat & IN_FUNC)) {
            where(filename);
            fprintf(stderr, "Invalid expression outside of a function\n");
            exit(1);
        }

        else if (*ptr == '>') {
            printf("ptr++;");
        } else if (*ptr == '<') {
            printf("ptr--;");
        } else if (*ptr == '+') {
            printf("(*ptr)++;");
        } else if (*ptr == '-') {
            printf("(*ptr)--;");
        } else if (*ptr == ',') {
            printf("*ptr=getchar();");
        } else if (*ptr == '.') {
            printf("putchar(*ptr);");
        }

        else if (*ptr == '(') {
            ++depth;
            printf("if(*ptr){");
        } else if (*ptr == ')') {
            if (--depth < 0) {
                where(filename);
                fprintf(stderr, "Unbalanced parenthesis )\n");
                exit(1);
            }
            printf("}");
        }

        else if (*ptr == '#') {
            while (*ptr && *ptr != '\n') {
                col++;
                ptr++;
            }

            if (!*ptr) break;
        }

        else if (!strchr(" \r\n\t\f", *ptr)) {
            where(filename);
            fprintf(stderr, "Invalid charactor 0x%2x\n", *ptr);
            exit(1);
        }

        if (*ptr == '\n') {
            col = 0;
            line++;
        } else {
            col++;
        }
    }

    if (!flags['_']) {
        where(filename);
        fprintf(stderr, "Missing function _\n");
        exit(1);
    }
    if (stat) {
        where(filename);
        fprintf(stderr, "Extra expression\n");
        exit(1);
    }
}

int main(int argc, char **argv) {
    FILE *fsrc;
    int n;
    char src[INNER_BUFSIZE], buf[INNER_BUFSIZE], *ptr, *end;

    if (argc == 1) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        exit(1);
    }

    if (argc > 2) {
        fprintf(stderr, "\e[91mError:\e[0m Too many arguments\n");
        exit(1);
    }

    fsrc = fopen(argv[1], "r");

    if (!fsrc) {
        fprintf(stderr, "\e[91mError:\e[0m Cannot open file %s\n", argv[1]);
        exit(1);
    }

    for (ptr = src, end = src + INNER_BUFSIZE; fgets(buf, INNER_BUFSIZE, fsrc); ptr += n) {
        n = snprintf(ptr, end - ptr, "%s", buf);
        if (n < 0) {
            fprintf(stderr, "\e[91mError:\e[0m Error while loading input file %s\n", argv[1]);
            exit(1);
        } else if (n > end - ptr) {
            fprintf(stderr, "\e[91mError:\e[0m Too large input file %s\n", argv[1]);
            exit(1);
        }
    }

    printf("#include <stdio.h>\n#define BUFSIZE %d\nchar buf[BUFSIZE],*ptr=buf;"
           "void f_0(void);void f_1(void);void f_2(void);void f_3(void);void f_4(void);"
           "void f_5(void);void f_6(void);void f_7(void);void f_8(void);void f_9(void);"
           "void f_A(void);void f_B(void);void f_C(void);void f_D(void);void f_E(void);"
           "void f_F(void);void f_G(void);void f_H(void);void f_I(void);void f_J(void);"
           "void f_K(void);void f_L(void);void f_M(void);void f_N(void);void f_O(void);"
           "void f_P(void);void f_Q(void);void f_R(void);void f_S(void);void f_T(void);"
           "void f_U(void);void f_V(void);void f_W(void);void f_X(void);void f_Y(void);"
           "void f_Z(void);"
           "void f_a(void);void f_b(void);void f_c(void);void f_d(void);void f_e(void);"
           "void f_f(void);void f_g(void);void f_h(void);void f_i(void);void f_j(void);"
           "void f_k(void);void f_l(void);void f_m(void);void f_n(void);void f_o(void);"
           "void f_p(void);void f_q(void);void f_r(void);void f_s(void);void f_t(void);"
           "void f_u(void);void f_v(void);void f_w(void);void f_x(void);void f_y(void);"
           "void f_z(void);"
           "void f__(void);",
           BUFSIZE);

    interpret(src, argv[1]);
    printf("int main(void){f__();return 0;}\n");
}
