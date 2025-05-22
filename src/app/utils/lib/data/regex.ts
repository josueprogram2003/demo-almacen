export class Regex {
    public static onlyNumbers = /^[0-9]+$/
    public static onlyNumbersDashes = /^[0-9-]*$/
    public static onlyLettersNumbers = /^[a-zA-Z0-9]*$/
    public static onlyLettersSpaces = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/
    public static onlyLettersNumbersSpaces = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ()0-9 ]*$/
    public static onlyLettersNumbersSpacesBasicSymbols = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ()0-9,.¡!¿?/\- ]*$/
    public static email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    public static number5digitsDecimal = /^[0-9]{0,5}(\.[0-9]{1,2})?$/ //* 99999.99
    public static noNewLineSpace = /^[^\n ]*$/
    public static validateruc = /^[1|2][0][0-9]{9}$/
    // public static onlyDate = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/ // yyyy-mm-dd
    public static onlyDate = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/ // dd-mm-yyyy
}