using System;

namespace RhombusLibrary
{
    public class Rhombus
    {
        private double x1, y1, x2, y2, x3, y3, x4, y4;

        public Rhombus()
        {
            x1 = y1 = 0;
            x2 = 1; y2 = 0;
            x3 = 0; y3 = 1;
            x4 = -1; y4 = 0;
        }

        public Rhombus(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4)
        {
            this.x1 = x1; this.y1 = y1;
            this.x2 = x2; this.y2 = y2;
            this.x3 = x3; this.y3 = y3;
            this.x4 = x4; this.y4 = y4;
        }

        public Rhombus(Rhombus other)
        {
            x1 = other.x1; y1 = other.y1;
            x2 = other.x2; y2 = other.y2;
            x3 = other.x3; y3 = other.y3;
            x4 = other.x4; y4 = other.y4;
        }

        ~Rhombus()
        {
            Console.WriteLine("Rhombus object is destroyed.");
        }

        public double GetArea()
        {
            double d1 = Math.Sqrt(Math.Pow(x3 - x1, 2) + Math.Pow(y3 - y1, 2));
            double d2 = Math.Sqrt(Math.Pow(x4 - x2, 2) + Math.Pow(y4 - y2, 2));
            return (d1 * d2) / 2;
        }

        public double GetPerimeter()
        {
            double side = Math.Sqrt(Math.Pow(x2 - x1, 2) + Math.Pow(y2 - y1, 2));
            return 4 * side;
        }

        public override string ToString()
        {
            return $"Rhombus: ({x1}, {y1}), ({x2}, {y2}), ({x3}, {y3}), ({x4}, {y4})";
        }
    }
}
