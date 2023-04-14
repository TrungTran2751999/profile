let pathVi = "assets/i18n/vi.json";
$(document).ready(()=>{
    function translate(path){
        $.ajax({
            url: path,
            type: "GET",
            async: false
        })
        .done((result)=>{
            renderJson(result)
            $("#portpolio").css("display","block")
        })
    }
    function renderJson(json){
        let valueTotal = Object.values(json);
        valueTotal.map(value=>{
            let valueChildrenArr = Object.values(value);
            let keyChildrenArr = Object.keys(value);
            if(!keyChildrenArr.includes("prop")){
                $(valueChildrenArr[0]).html(valueChildrenArr[1]);
            }else{
                $(valueChildrenArr[0]).attr(valueChildrenArr[2], valueChildrenArr[1]);
            }
        })
    }
    translate(pathVi);
})