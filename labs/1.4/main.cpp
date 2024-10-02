/**
 * Done by:
 * Student Name: Sydorets Maxym
 * Student Group: 121
 * Lab 1.4
 */

#include <iostream>

using namespace std;

#include <iostream>
using namespace std;

int main() {
    // 1. ���� ������� ����������������� �����
    unsigned short nA;
    int nB;
    float nC;
    double nD;

    // 2. ���� ��������� ������� ����������� �����
    unsigned short* pnA;
    int* pnB;
    float* pnC;
    double* pnD;

    // 3. ���� ������������� ��������� �������
    void* pV;

    // 4. ����������� ��������� ������� �������� �������, �� ������� � �.1 ������ ��������
    pnA = &nA;
    pnB = &nB;
    pnC = &nC;
    pnD = &nD;

    // 5. ����������� �������, �� ������� � �.1 ������ ��������, ���������� � ��������, �������������� �������� ������������� ��������� �������
    *pnA = 27;
    *pnB = -4852;
    *pnC = 135.7907f;
    *pnD = 7.4e66;

    // 6. ���������� ������� ���� ������� ��������
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
