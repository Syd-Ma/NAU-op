using System;
using System.Text.RegularExpressions;

namespace LineLibrary
{
    public class TextLine
    {
        protected string _value;

        public TextLine()
        {
            _value = string.Empty;
        }

        public TextLine(string value)
        {
            _value = value;
        }

        public string Value
        {
            get { return _value; }
        }

        public int Length()
        {
            return _value.Length;
        }
    }

    public class DigitLine : TextLine
    {
        public DigitLine() : base() { }

        public DigitLine(string value) : base(value) { }

        public void RemoveSymbol(char symbol)
        {
            _value = Regex.Replace(_value, symbol.ToString(), "");
        }

        public string CleanedValue
        {
            get { return _value; }
        }
    }
}
