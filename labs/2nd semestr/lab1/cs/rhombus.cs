using System;

namespace RhombusApp
{
    public class Rhombus
    {
        private double x1, y1;
        private double x2, y2;
        private double x3, y3;
        private double x4, y4;


        public Rhombus(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4)
        {
            this.x1 = x1; 
            this.y1 = y1;
            this.x2 = x2; 
            this.y2 = y2;
            this.x3 = x3; 
            this.y3 = y3;
            this.x4 = x4; 
            this.y4 = y4;
        }


        private double GetSideLength()
        {
            return Math.Sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }


        private double GetDiagonal1()
        {
            return Math.Sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1));
        }


        private double GetDiagonal2()
        {
            return Math.Sqrt((x4 - x2) * (x4 - x2) + (y4 - y2) * (y4 - y2));
        }


        public double GetPerimeter()
        {
            return 4 * GetSideLength();
        }


        public double GetArea()
        {
            return (GetDiagonal1() * GetDiagonal2()) / 2;
        }


        public void PrintCoordinates()
        {
            Console.WriteLine($"Вершини ромба: ");
            Console.WriteLine($"  A({x1}, {y1})");
            Console.WriteLine($"  B({x2}, {y2})");
            Console.WriteLine($"  C({x3}, {y3})");
            Console.WriteLine($"  D({x4}, {y4})");
            Console.WriteLine($"Довжина сторони: {GetSideLength():F2}");
            Console.WriteLine($"Перша діагональ: {GetDiagonal1():F2}");
            Console.WriteLine($"Друга діагональ: {GetDiagonal2():F2}");
            Console.WriteLine($"Периметр: {GetPerimeter():F2}");
            Console.WriteLine($"Площа: {GetArea():F2}");
        }
    }
}
