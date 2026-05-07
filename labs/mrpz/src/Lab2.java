public class Lab2 {
    public static void main(String[] args) {
        task1();
        System.out.println();
        task2();
    }

    public static void task1() {
        int number = 64583;
        String str = String.valueOf(number);
        String result = "";

        for (int i = 0; i < str.length(); i++) {
            int position = i + 1;

            if (position % 2 == 0) {
                result += str.charAt(i);
            }
        }

        System.out.println("Завдання 1");
        System.out.println("Початкове число: " + number);
        System.out.println("Результат після видалення цифр з непарних розрядів: " + result);
    }

    public static void task2() {
        String text = """
                Java 1234 !!! test 98765
                Hello ---- 55555 world
                Programming @@@@ 7777777 text
                """;

        String[] parts = text.split("[A-Za-zА-Яа-яІіЇїЄєҐґ]+");

        String maxSet = "";

        for (String part : parts) {
            if (part.length() > maxSet.length()) {
                maxSet = part;
            }
        }

        System.out.println("Завдання 2");
        System.out.println("Текст до обробки:");
        System.out.println(text);

        System.out.println("Перший набір символів максимальної довжини, який не містить букв:");
        System.out.println(maxSet);
    }
}