/**
* Done by:
* Student Name: Maxym Sydorets
* Student Group: 121
* Prac 1.4
*/

#include <iostream>
#include <cmath>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

int sumFromOneToFive() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    return sum;
}

int factorial(int N) {
    int fact = 1;
    for (int i = 2; i <= N; i++) {
        fact *= i;
    }
    return fact;
}

int sumOfEvenNumbers(int N) {
    int sum = 0;
    for (int i = 0; i <= N; i += 2) {
        sum += i;
    }
    return sum;
}

int productOfArithmeticProgression(int a1, int d, int n) {
    int product = 1;
    for (int i = 0; i < n; i++) {
        product *= (a1 + i * d);
    }
    return product;
}

void tabulateCosineFunction(double h) {
    for (double x = 0; x <= M_PI; x += h) {
        std::cout << "f(" << x << ") = " << cos(x) << std::endl;
    }
}

int main() {
    std::cout << "Sum from 1 to 5: " << sumFromOneToFive() << std::endl;

    int N;
    std::cout << "Enter a number for factorial: ";
    std::cin >> N;
    std::cout << "Factorial of " << N << ": " << factorial(N) << std::endl;

    std::cout << "Enter a number N to find the sum of even numbers: ";
    std::cin >> N;
    std::cout << "Sum of even numbers from 0 to " << N << ": " << sumOfEvenNumbers(N) << std::endl;

    int a1, d, n;
    std::cout << "Enter first term (a1), common difference (d), and number of terms (n): ";
    std::cin >> a1 >> d >> n;
    std::cout << "Product of the first " << n << " elements of the arithmetic progression: "
        << productOfArithmeticProgression(a1, d, n) << std::endl;

    std::cout << "Tabulation of f(x) = cos(x) from 0 to π with step 0.01:" << std::endl;
    tabulateCosineFunction(0.01);

    return 0;
}
