//A helper library of front-end number formatters

export const InputSafeDecimalFormatter = Intl.NumberFormat(undefined, { //Designed for currency inside number input fields
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false //Can't use grouping separators in HTML number inputs
});

export const CurrencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    style: "currency"
});

export const IntegerFormatter = new Intl.NumberFormat(undefined, {
    style: "decimal",
    maximumFractionDigits: 0
});

const ByteFormatter = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: "byte"
});

const KiloByteFormatter = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: "kilobyte",
    maximumFractionDigits: 2
});

const MegaByteFormatter = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: "megabyte",
    maximumFractionDigits: 2
});

const GigaByteFormatter = new Intl.NumberFormat(undefined, {
    notation: "engineering",
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 2
});

export const FileSizeFormatter = {
    format: function(value) {
        if (typeof value !== "number") {
            throw Error("Invalid type passed to FileSizeFormatter");
        }
        if (value < 0) {
            throw Error("Negative number passed to FileSizeFormatter");
        }
        if (value === 0) {
            return ByteFormatter.format(value);
        }
        let magnitude = Math.log10(value);
        if (magnitude < 3) {
            return ByteFormatter.format(value);
        }
        else if (magnitude < 6) {
            return KiloByteFormatter.format(value / 10 ** 3);
        }
        else if (magnitude < 9) {
            return MegaByteFormatter.format(value / 10 ** 6);
        }
        else {
            return GigaByteFormatter.format(value / 10 ** 9);
        }
    }
};