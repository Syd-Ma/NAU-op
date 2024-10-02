/**
* Done by:
 * Student Name: Maxym Sydorets 
 * Student Group: 121
 * Prac 1.5
 */

#include <iostream>
#include <vector>
#include <limits>

int findMinValue(const std::vector<int>& A) { 
    int minValue = A[0];
    for (int i = 1; i < A.size(); i++) {
        if (A[i] < minValue) {
            minValue = A[i];
        }
    }
    return minValue;
}

int findIndexOfMaxPositive(const std::vector<int>& A) {
    int maxIndex = -1;
    int maxValue = std::numeric_limits<int>::min();
    for (int i = 0; i < A.size(); i++) {
        if (A[i] > 0 && A[i] > maxValue) {
            maxValue = A[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

int findMinGreaterThanP(const std::vector<int>& A, int P) {
    int minValue = std::numeric_limits<int>::max();
    for (int i = 0; i < A.size(); i++) {
        if (A[i] > P && A[i] < minValue) {
            minValue = A[i];
        }
    }
    return minValue == std::numeric_limits<int>::max() ? -1 : minValue;
}

int findLastIndexOfP(const std::vector<int>& A, int P) {
    int lastIndex = -1;
    for (int i = 0; i < A.size(); i++) {
        if (A[i] == P) {
            lastIndex = i;
        }
    }
    return lastIndex;
}

int countOccurrencesOfP(const std::vector<int>& A, int P) {
    int count = 0;
    for (int i = 0; i < A.size(); i++) {
        if (A[i] == P) {
            count++;
        }
    }
    return count;
}

int findFirstIndexOfP(const std::vector<int>& A, int P) {
    for (int i = 0; i < A.size(); i++) {
        if (A[i] == P) {
            return i;
        }
    }
    return -1;
}

int findMinPositiveValue(const std::vector<int>& A) {
    int minValue = std::numeric_limits<int>::max();
    for (int i = 0; i < A.size(); i++) {
        if (A[i] > 0 && A[i] < minValue) {
            minValue = A[i];
        }
    }
    return minValue == std::numeric_limits<int>::max() ? -1 : minValue;
}

int main() {
    std::vector<int> A = { 3, -1, 4, -5, 6, 2, 9, -7 };
    int P = 4;

    std::cout << "Min value in sequence: " << findMinValue(A) << std::endl;
    std::cout << "Index of max positive value: " << findIndexOfMaxPositive(A) << std::endl;
    std::cout << "Min value greater than P: " << findMinGreaterThanP(A, P) << std::endl;
    std::cout << "Last index of P: " << findLastIndexOfP(A, P) << std::endl;
    std::cout << "Occurrences of P: " << countOccurrencesOfP(A, P) << std::endl;
    std::cout << "First index of P: " << findFirstIndexOfP(A, P) << std::endl;
    std::cout << "Min positive value in sequence: " << findMinPositiveValue(A) << std::endl;

    return 0;
}