using System;
using LineLibrary;

class Program
{
    static void Main()
    {
        DigitLine line = new DigitLine("1020304050");

        Console.WriteLine(line.Value);

        line.RemoveSymbol('0');

        Console.WriteLine(line.CleanedValue);
        Console.WriteLine(line.Length());
    }
}
