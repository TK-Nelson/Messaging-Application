module.exports= (function formData(formID){
    var form_data = {};
    var submitted_form = "";
    var form_string= "/?"; 
    submitted_form = document.getElementById(formID);

     if (submitted_form != null)
        {

            for (i = 0; i < submitted_form.elements.length-1; i++)
            {
                //find out if it's a checkbox           
                if (submitted_form.elements[i].type != "checkbox") {

                    form_data[submitted_form.elements[i].id] = submitted_form.elements[i].value;
                    if (i==0){
                    form_string += submitted_form.elements[i].id+"="+submitted_form.elements[i].value;
                    }
                    else{
                    form_string += '&'+ submitted_form.elements[i].id+"="+submitted_form.elements[i].value;
                   };
                    //alert(submitted_form.elements[i].value);
                    //if it's checked
                }//if it's a checkbox   
                else if (submitted_form.elements[i].checked) {
                    form_data[submitted_form.elements[i].id] = submitted_form.elements[i].value;
                } else if (!submitted_form.elements[i].checked) {
                    form_data[submitted_form.elements[i].id] = '';
                }
            }//END FOR I < DOCUMENT.(FORMNAME).ELEMENTS.LENGTH

        }//END IF FORM_ID != UNDEFINED
        return form_data  
})