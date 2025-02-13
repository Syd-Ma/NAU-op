/**
 * Done by:
 * Student Name: Sydorets Maxym
 * Student Group: 121
 * Prac 1.6
 */

#include <iostream>

 // Перевірка, чи числа рівні за допомогою XOR
bool areEqual(int A, int B) {
    return (A ^ B) == 0;
}

// Перевірка, чи число кратне 8 за допомогою побітового AND
bool isMultipleOf8(int A) {
    return (A & 7) == 0;
}

// Бітові операції між двома числами
void bitwiseOperations(int A, int B) {
    std::cout << "A AND B: " << (A & B) << std::endl;
    std::cout << "A OR B: " << (A | B) << std::endl;
    std::cout << "A XOR B: " << (A ^ B) << std::endl;
}

// Додавання чисел за допомогою бітових операцій та операція NOT
void additionAndNot(int A, int B) {
    int sum = A;

    // Бітове додавання
    while (B != 0) {
        int carry = (A & B) << 1;
        sum = A ^ B;
        A = sum;
        B = carry;
    }
    std::cout << "A + B: " << sum << std::endl;
    std::cout << "NOT A: " << ~A << std::endl;
}

// Додавання чисел за допомогою бітових операцій
int addUsingBitwise(int A, int B) {
    while (B != 0) {
        int carry = (A & B) << 1;
        A = A ^ B;
        B = carry;
    }
    return A;
}

// Операції зсуву вліво та вправо
void shiftOperations(int sequence, int shiftLeft, int shiftRight) {
    std::cout << "Shift left (" << shiftLeft << "): " << (sequence << shiftLeft) << std::endl;
    std::cout << "Shift right (" << shiftRight << "): " << (sequence >> shiftRight) << std::endl;
}

int main() {
    int A = 5, B = 5;
    std::cout << "Are A and B equal? " << (areEqual(A, B) ? "Yes" : "No") << std::endl;

    A = 16;
    std::cout << "Is A multiple of 8? " << (isMultipleOf8(A) ? "Yes" : "No") << std::endl;

    A = 6; B = 3;
    std::cout << "Bitwise operations between A and B:" << std::endl;
    bitwiseOperations(A, B);

    A = 5; B = 3;
    std::cout << "Addition and NOT operations between A and B:" << std::endl;
    additionAndNot(A, B);

    A = 15; B = 12;
    std::cout << "Sum of A and B using bitwise operations: " << addUsingBitwise(A, B) << std::endl;

    int sequence = 13;
    std::cout << "Shift operations on the sequence:" << std::endl;
    shiftOperations(sequence, 2, 1);

    return 0;
}
