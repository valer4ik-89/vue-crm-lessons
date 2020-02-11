export default function currencyFilter(value, currency = "UAH") {
    return new Intl.NumberFormat('ru', 
        { 
            style: 'currency',
            currency 
        }
    ).format(value)
}