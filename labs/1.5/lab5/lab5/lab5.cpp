
/**
 * Completed by:
 * Student: Sydorets Maxym Vitaliyovych
 * Group: 121
 * Lab work 1.5
 */
#include <iostream>  
    int main() {
    // Task 1
    float x1 = 5.8, y1 = 39.1, z1 = 70, w1 = 42; // Initialization of variables for the first expression
    bool ResultA = (!(x1 == y1) ^ !(z1 < w1)); // Calculating the first logical expression
    float x2 = 85, y2 = 85, z2 = 6.4, w2 = 9.3; // Initialization of variables for the second expression
    bool ResultB = (!(x2 == y2) ^ !(z2 < w2)); // Calculating the second logical expression
    std::cout << "Result of expression 1: " << ResultA << '\n' << "Result of expression 2: " << ResultB << '\n'; // Output the results

    // Task 2
    const long constValue = 49; // Initialization of constant
    long varB = -65, varE = 2; // Declaration of variables
    long varC; // Declaration of the variable varC
    long* ptrC = &varC; // Initialization of pointer to varC
    *ptrC = 23; // Assign value through the pointer
    bool ResultC = ((constValue ^ (-varB)) - *ptrC) >= (13 + (varE << sizeof(long))); // Calculating the third logical expression
    std::cout << "Result of expression 3: " << ResultC << '\n'; // Output the result
}
