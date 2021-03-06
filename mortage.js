'use strict';
(function(){

    var years_range = document.getElementById("years_mortage_range");
    var years_mortage = document.getElementById("years_mortage");
    var interest_range = document.getElementById("interest_rate_range");
    var interest_rate = document.getElementById("interest_rate");
    var loan_amount = document.getElementById("loan_amount");
    var annual_tax = document.getElementById("annual_tax");
    var annual_insurance = document.getElementById("annual_insurance");
    var mortageBtn = document.getElementById("calcMortageBtn");

    if (checkMobile()){
        var panel = document.getElementById('resultsPanel');
            panel.classList.add('collapsed');
    }
    
    function checkMobile() {        
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) ? true : false;        
    }    

    function showInterest(){
        showValue(interest_range, interest_rate)
    }

    function showYears(){
        showValue(years_range, years_mortage)
    }

    function showValue(range, field) {
      field.value = range.value;
    }

    function calculateTaxes(){
        return annual_tax.value / 12;
    }

    function calculateInsurance(){
        return annual_insurance.value / 12;
    }

    function principleAndInterest(){
        return ((interest_rate.value / 100) / 12) * loan_amount.value / (1 - Math.pow((1 + ((interest_rate.value / 100) / 12)), - years_mortage.value * 12));
    }

    function validFields() {
        return true;
    }

    function showResults(elementId, value, isMobile){

        var field = document.getElementById(elementId);
        var panel = document.getElementById("resultsPanel");        

        if (isMobile) {
            field.className = "results_value_display_mobile";
            if (elementId == "mortage_value_mobile"){ 
                field.style.fontSize = "18px"
                field.style.marginTop = "19px"
            }
            if (panel.classList.contains('collapsed')){
                setTimeout(function(){ window.scrollTo(0, 300) },200);
                panel.classList.remove('collapsed');
            }
        }else{
            field.className = "results_value_display";
            if (elementId == "mortage_value")
                field.style.fontSize = "22px"            
        }
        field.innerHTML = "$ " + value.toFixed(2);
    }

    function validateFields(){

        var fields = ["loan_amount", "annual_tax", "annual_insurance"];        
        var errors = ["Loan Amount is mandatory", "Annual Tax is mandatory", "Annual Insurance is mandatory"];
        var error_labels = ["loan_amount_err_label", "annual_tax_err_label", "annual_insurance_err_label"];
        var valid = true;

        for (var i = 0; i < fields.length; i++) {
            var field = document.getElementById(fields[i])
            if (field.value == "") {
                field.style.border = "solid 1px #da3535";
                document.getElementById(error_labels[i]).innerHTML = (checkMobile()) ? 'Mandatory filed' : errors[i];
                valid = false;
            }
        }

        var ranges = ["years_mortage", "interest_rate"];
        var ranges_errors_msg = ["Invalid Years of Mortage", "Invalid Rate of Interest"];
        var err_label = document.getElementById("monthly_err_label");

        for (var i = 0; i < ranges.length; i++) {

            var rangeField = document.getElementById(ranges[i]);

            if (rangeField.value == "" || rangeField.value == "0") {
                err_label.innerHTML = ranges_errors_msg[i];
                err_label.style.display = "block";
                err_label.style.marginTop = "15px";            
                valid = false;
            }else{
                err_label.innerHTML = "";
                err_label.style.display = "none";
                err_label.style.marginTop = "0px";
                valid = true;
            }
        }
            
        return valid;
    }

    function calculateMortage(){

        if (!validateFields()){
             return;
        }else{

            var principle_and_interests = principleAndInterest();
            var tax = calculateTaxes();
            var insurance = calculateInsurance();
            var mortage = principle_and_interests + tax + insurance;
            var isMobile = checkMobile();

            if (isMobile) {
                
                showResults("interest_value_mobile", principle_and_interests, isMobile);
                showResults("tax_value_mobile", tax, isMobile);
                showResults("insurance_value_mobile", insurance, isMobile);
                showResults("mortage_value_mobile", mortage, isMobile);

            }else{

                showResults("interest_value", principle_and_interests, isMobile);
                showResults("tax_value", tax, isMobile);
                showResults("insurance_value", insurance, isMobile);
                showResults("mortage_value", mortage, isMobile);

            }
        }

    }
    years_range.addEventListener("change", showYears);
    interest_range.addEventListener("change", showInterest);
    mortageBtn.addEventListener("click", calculateMortage);

})()

function checkMobile() {
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) ? true : false;
}    

function validateFields(id) {
    var error_label;
    var error;
    var field = document.getElementById(id);
    var calcMortageBtn = document.getElementById("calcMortageBtn");

    switch (id) {
        case 'loan_amount':
            error_label = 'loan_amount_err_label';
            error = 'Loan Amount is mandatory'
            break;
        case 'annual_tax':
            error_label = 'annual_tax_err_label';
            error = 'Annual Tax is mandatory'
            break;
        case 'annual_insurance':
            error_label = 'annual_insurance_err_label';
            error = 'Annual Insurance is mandatory'
            break;
    }

    var label = document.getElementById(error_label);

    if (field.value == "") {
        field.style.border = "solid 1px #da3535";
        label.innerHTML = (checkMobile()) ? 'Mandatory filed' : error;
        calcMortageBtn.disabled = true;
    } else {
        field.style.border = "solid 1px #a6a6a6";
        label.innerHTML = "";
        calcMortageBtn.disabled = false;
    }
}