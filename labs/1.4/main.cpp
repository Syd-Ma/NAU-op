/**
 * Done by:
 * Student Name: Sydorets Maxym
 * Student Group: 121
 * Lab 1.4
 */

#include <iostream>

using namespace std;

int main() {
    // 1. Опис змінних напередвизначених типів
    unsigned short nA;
    int nB;
    float nC;
    double nD;

    // 2. Опис вказівних змінних відповідних типів
    unsigned short* pnA;
    int* pnB;
    float* pnC;
    double* pnD;

    // 3. Опис нетипізованої вказівної змінної
    void* pV;

    // 4. Ініціювання вказівних змінних адресами змінних, що описані в п.1 даного завдання
    pnA = &nA;
    pnB = &nB;
    pnC = &nC;
    pnD = &nD;

    // 5. Ініціювання змінних, що описані в п.1 даного завдання, значеннями з варіанта, використовуючи операцію розіменування вказівних змінних
    *pnA = 9040;
    *pnB = -267;
    *pnC = 0.007642;
    *pnD = -1.11e99;

    // 6. Визначення розміру всіх змінних програми
    int sizenA = sizeof(nA);
    int sizenB = sizeof(nB);
    int sizenC = sizeof(nC);
    int sizenD = sizeof(nD);

    int sizepnA = sizeof(pnA);
    int sizepnB = sizeof(pnB);
    int sizepnC = sizeof(pnC);
    int sizepnD = sizeof(pnD);
    int sizepV = sizeof(pV);

    // 7. Ініціювання нетипізованої вказівної змінної адресами типізованих вказівних змінних
    pV = &pnA;

    return 0;
}
