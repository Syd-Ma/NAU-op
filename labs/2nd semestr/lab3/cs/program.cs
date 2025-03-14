using System;

class Program
{
    static void Main()
    {
        CustomString CS1, CS2 = new CustomString("Hello"), CS3 = new CustomString("0World0");

        CS3 = CS3 - '0';
        CS1 = CS2 + CS3;

        Console.WriteLine("CS1: " + CS1);
        Console.WriteLine("CS2: " + CS2);
        Console.WriteLine("CS3: " + CS3);
    }
}
