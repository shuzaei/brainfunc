#include <stdio.h>
#include <stdlib.h>
#define BUFSIZE 1000000

char header[] =
    "#include <stdio.h>\n"
    "#define BUFSIZE %d\n"
    "int buf[BUFSIZE];int* ptr = buf;"
    "void f_0(void);void f_1(void);void f_2(void);void f_3(void);void f_4(void);"
    "void f_5(void);void f_6(void);void f_7(void);void f_8(void);void f_9(void);"
    "void f_A(void);void f_B(void);void f_C(void);void f_D(void);void f_E(void);"
    "void f_F(void);void f_G(void);void f_H(void);void f_I(void);void f_J(void);"
    "void f_K(void);void f_L(void);void f_M(void);void f_N(void);void f_O(void);"
    "void f_P(void);void f_Q(void);void f_R(void);void f_S(void);void f_T(void);"
    "void f_U(void);void f_V(void);void f_W(void);void f_X(void);void f_Y(void);void f_Z(void);"
    "void f_a(void);void f_b(void);void f_c(void);void f_d(void);void f_e(void);"
    "void f_f(void);void f_g(void);void f_h(void);void f_i(void);void f_j(void);"
    "void f_k(void);void f_l(void);void f_m(void);void f_n(void);void f_o(void);"
    "void f_p(void);void f_q(void);void f_r(void);void f_s(void);void f_t(void);"
    "void f_u(void);void f_v(void);void f_w(void);void f_x(void);void f_y(void);void f_z(void);";

char footer[] = "int main(void){f_0();return 0;}\n";
char *filename;

#define IN_FUNC 1
#define FUNC_NAME_DEFINED 2

#define where(name) fprintf(stderr, "\e[31mError\e[0m: %s:%d:%d: ", name, line, ptr - BOL)

int interpret(char *src, char *name) {
    char *ptr, name = '0', BOL = src;
    int stat = 0, depth = 0, line = 0;

    for (ptr = src; *ptr; ptr++) {
        if ('0' <= *ptr && *ptr <= '9') {
            if (!(stat & IN_FUNC)) {
                if (stat & FUNC_NAME_DEFINED) {
                    where(name);
                    fprintf(stderr, "Invalid function redeclaration\n");
                    return 1;
                }
                name = *ptr;
                stat |= FUNC_NAME_DEFINED;
            } else {
                printf("%c();", *ptr);
            }
        } else if ('A' <= *ptr && *ptr <= 'Z') {
            if (!(stat & IN_FUNC)) {
                if (stat & FUNC_NAME_DEFINED) {
                    where(name);
                    fprintf(stderr, "Invalid function redeclaration\n");
                    return 1;
                }
                name = *ptr;
                stat |= FUNC_NAME_DEFINED;
            } else {
                printf("%c();", *ptr);
            }
        } else if ('a' <= *ptr && *ptr <= 'z') {
            if (!(stat & IN_FUNC)) {
                if (stat & FUNC_NAME_DEFINED) {
                    where(name);
                    fprintf(stderr, "Invalid function redeclaration\n");
                    return 1;
                }
                name = *ptr;
                stat |= FUNC_NAME_DEFINED;
            } else {
                printf("%c();", *ptr);
            }
        }

        else if (*ptr == '{') {
            if (stat & IN_FUNC) {
                where(name);
                fprintf(stderr, "Invalid function declaration inside of a function\n");
                return 1;
            }
            printf("void f_%c(void){", name);
        } else if (*ptr == '}') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Unbalanced brace }\n");
                return 1;
            }
            printf("}");
        }

        else if (*ptr == '>') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("ptr++;");
        } else if (*ptr == '<') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("ptr--;");
        }

        else if (*ptr == '+') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("*ptr==255?0:*ptr++;");
        } else if (*ptr == '-') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("*ptr==0?255:*ptr--;");
        }

        else if (*ptr == ',') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("*ptr=getchar();");
        } else if (*ptr == '.') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("putchar(*ptr==255?);");
        }

        else if (*ptr == '(') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            printf("if(*ptr){");
        } else if (*ptr == ')') {
            if (!(stat & IN_FUNC)) {
                where(name);
                fprintf(stderr, "Invalid expression outside of a function\n");
                return 1;
            }
            if (--depth < 0) {
                where(name);
                fprintf(stderr, "Unbalanced parenthesis )\n");
                return 1;
            }
            printf("}");
        }

        else if (!strchr(" \r\n\t\f", *ptr)) {
            fprintf(stderr, "Invalid charactor %s in source code\n", *ptr);
            return 1;
        }

        if (*ptr == '\n') {
            BOL = ptr + 1;
            line++;
        }
    }
}

int main(int argc, char **argv) {
    FILE *fsrc;
    char *src;

    printf(header, BUFSIZE);
    interpret(src);
    printf(footer);
}