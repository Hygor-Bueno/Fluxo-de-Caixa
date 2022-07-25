var inputFormPurchase = [
    {
        position: "0",
        labelIput: "Descrição:",
        idInput: "descFormItem",
        classInput: "",
        classLabel: "col-auto my-1",
        typeInput: "text",
        titleInput: "Insira a descrição do item.",
        placeholderInput: "Descrição.",
        valueInput:"",
        disabledInput:false
    },
    {
        position: "1",
        labelIput: "Quantidade:",
        idInput: "valueFormItem",
        classLabel: "col-auto my-1",
        typeInput: "number",
        titleInput: "Insira a quantidade do Item",
        placeholderInput: "Quantidade",
        valueInput:"",
        disabledInput:false
    },
    {
        position: "2",
        labelIput: "Valor:",
        idInput: "valueFormItem",
        classLabel: "col-auto my-1",
        typeInput: "number",
        titleInput: "Insira o valor do Item",
        placeholderInput: "valor",
        valueInput:"",
        disabledInput:false
    }
]
export var inputFooterPurchase= [

    {
        position: "0",
        labelIput: "Valor Máx.:",
        idInput: "valueFooterInit",
        classLabel: "col-auto my-1",
        typeInput: "number",
        titleInput: "Insira o valor do Item",
        placeholderInput: "R$ 0,00",
        valueInput:"",
        disabledInput:false
    }
]

export var optionSelectFormPurchase=[
    {
        hiddenOption: true,
        defaultOption:true,
        valueOption:"default",
        textOption:"Selecione um Setor"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Doce",
        textOption:"Doce"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Salgada",
        textOption:"Salgada"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Padaria",
        textOption:"Padaria"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Frios e Laticínios",
        textOption:"Frios e Laticínios"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Liquida",
        textOption:"Liquida"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Higiene e Limpeza",
        textOption:"Higiene e Limpeza"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Hortifruti",
        textOption:"Hortifruti"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Bazar",
        textOption:"Bazar"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Açougue",
        textOption:"Açougue"
    },
    {
        hiddenOption: false,
        defaultOption:false,
        valueOption:"Outros",
        textOption:"Outros"
    }
]

export default inputFormPurchase;