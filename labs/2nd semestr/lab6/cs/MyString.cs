using System;
using System.Linq;

namespace TextLib
{
    public class MyString : IDigitAnalyzer
    {
        private readonly string content;

        public MyString(string content)
        {
            this.content = content;
        }

        public string GetContent() => content;
        public int Length => content.Length;

        public int CountDigits()
        {
            return content.Count(char.IsDigit);
        }

        public double DigitsPercentage()
        {
            if (content.Length == 0) return 0;
            return (double)CountDigits() / content.Length * 100;
        }
    }
}