import java.util.Scanner;

class Book {
    int id;
    String title;
    String author;
    String publisher;
    int year;
    int pages;
    double price;

    public Book(int id, String title, String author, String publisher,
                int year, int pages, double price) {

        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.pages = pages;
        this.price = price;
    }

    public void print() {
        System.out.printf(
                "%-5d %-20s %-15s %-15s %-6d %-8d %.2f\n",
                id, title, author, publisher, year, pages, price
        );
    }
}

public class Lab3 {

    public static void printHeader() {
        System.out.printf(
                "%-5s %-20s %-15s %-15s %-6s %-8s %s\n",
                "ID", "Назва", "Автор", "Видавн.", "Рік", "Стор.", "Ціна"
        );
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Book[] books = {
                new Book(1, "Java Core", "Ivanov", "BHV", 2020, 450, 500),
                new Book(2, "Algorithms", "Petrov", "Piter", 2018, 300, 350),
                new Book(3, "Clean Code", "Martin", "Pearson", 2022, 500, 700),
                new Book(4, "Java OOP", "Ivanov", "BHV", 2021, 280, 450),
                new Book(5, "Database", "Sidorov", "Pearson", 2019, 390, 600)
        };

        System.out.println("Всі книги:");
        printHeader();

        for (Book b : books) {
            b.print();
        }

        System.out.print("\nВведіть автора: ");
        String author = sc.nextLine();

        System.out.println("\nКниги автора " + author + ":");
        printHeader();

        boolean found = false;

        for (Book b : books) {
            if (b.author.equalsIgnoreCase(author)) {
                b.print();
                found = true;
            }
        }

        if (!found) {
            System.out.println("Нічого не знайдено");
        }

        System.out.print("\nВведіть видавництво: ");
        String publisher = sc.nextLine();

        System.out.println("\nКниги видавництва " + publisher + ":");
        printHeader();

        found = false;

        for (Book b : books) {
            if (b.publisher.equalsIgnoreCase(publisher)) {
                b.print();
                found = true;
            }
        }

        if (!found) {
            System.out.println("Нічого не знайдено");
        }

        int year = 0;

        while (true) {
            try {
                System.out.print("\nВведіть рік: ");
                year = Integer.parseInt(sc.nextLine());

                if (year < 0) {
                    throw new Exception("Рік не може бути від’ємним");
                }

                break;

            } catch (NumberFormatException e) {
                System.out.println("Помилка: введіть число");
            } catch (Exception e) {
                System.out.println("Помилка: " + e.getMessage());
            }
        }

        System.out.println("\nКниги після " + year + " року:");
        printHeader();

        found = false;

        for (Book b : books) {
            if (b.year > year) {
                b.print();
                found = true;
            }
        }

        if (!found) {
            System.out.println("Нічого не знайдено");
        }

        sc.close();
    }
}