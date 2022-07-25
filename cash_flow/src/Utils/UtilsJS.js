export function toDay() {
    let data = new Date();
    let day = String(data.getDate()).padStart(2, '0');
    let month = String(data.getMonth() + 1).padStart(2, '0');
    let year = data.getFullYear();
    return  year + '-' + month + '-' + day;
}

export function convertDateToBrazil(date){
    let newDate = date.split('-');
    return newDate[2] + '/' + newDate[1] + '/' + newDate[0];
}

export function calculateList(list) {
    const values = filterList(list);
    let calc = [];
    let total = 0;
    let object = {}
    Object.keys(values).forEach(item => { calc.push(calculate(values[item], item)) })
    calc.forEach(item => {
        if (Object.keys(item)[0] === 'exit') {
            total -= item.exit
            object.exit = item.exit;
        } else if (Object.keys(item)[0] === 'prohibited') {
            total += item.prohibited
            object.prohibited = item.prohibited;
        } else {
            total += item.cashier
            object.cashier = item.cashier;
        }
    })
    object.cashier = total;
    return object;
}
function calculate(items, key) {
    let calc = 0;
    let object = {};
    console.log(items, key)
    items.forEach(item => {
        calc += parseFloat(item[key]);
    })
    object[key] = calc;
    return object;
}

function filterList(list) {
    let prohibited, exit, cashier;
    prohibited = list.filter(item => item.prohibited !== "");
    exit = list.filter(item => item.exit !== "");
    cashier = list.filter(item => item.cashier !== "");
    return { prohibited, exit, cashier }
}