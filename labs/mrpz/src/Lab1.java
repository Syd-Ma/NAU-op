import java.util.Random;

public class Lab1 {
    public static void main(String[] args) {

        int rows = 4;
        int cols = 5;

        int[][] A = new int[rows][cols];
        int[] B = new int[rows];

        Random rand = new Random();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                A[i][j] = rand.nextInt(100);
            }
        }

        System.out.println("\nМатриця A:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(A[i][j] + "\t");
            }
            System.out.println();
        }

        for (int i = 0; i < rows; i++) {
            int max = A[i][0];
            for (int j = 1; j < cols; j++) {
                if (A[i][j] > max) {
                    max = A[i][j];
                }
            }
            B[i] = max;
        }

        System.out.println("\nМасив B (найбільші елементи кожного рядка):");
        for (int i = 0; i < rows; i++) {
            System.out.print(B[i] + " ");
        }
    }
}