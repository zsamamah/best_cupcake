$(document).ready(show_cupcakes);

var cup_cakes=[
    {"name":"Chocolate","calories":"high","weight":"200gm"},
    {"name":"Carrot","calories":"medium","weight":"150gm"},
    {"name":"Banana","calories":"high","weight":"200gm"},
    {"name":"Strawberry","calories":"low","weight":"160gm"},
    {"name":"Peanut","calories":"medium","weight":"200gm"}
];


function show_cupcakes(){
    //write code that shows the cupcakes in the table as per the instructions
    let t_table = document.getElementById("my_table");
let t_row_id=["name","calories","weight"];
for(let x in cup_cakes){
    let t_row=document.createElement("tr");
    for(let y in cup_cakes[x]){
        let t_data=document.createElement("td");
        t_data.innerText=cup_cakes[x][y];
        if(y=="calories"){
            t_data.setAttribute("id","calories");
            t_data.style.color="white";
            if(t_data.innerText=="high")
                t_data.style.backgroundColor="red";
            else if(t_data.innerText=="medium")
                t_data.style.backgroundColor="orange";
            else if(t_data.innerText=="low")
                t_data.style.backgroundColor="lightgreen";
            else{
                t_data.style.color="black";
            }
                
        }
        t_row.appendChild(t_data);
    }
    t_table.appendChild(t_row);
}
}

function validate(){
    //write code that validates the form
    let form=document.getElementById("order_form");

    //validate name
    var validName=validate_name(form);
    if(validName){
        localStorage.setItem("name",form.cname.value);
    }

    //validate count
    var validCount=validate_count(form);

    //validate type
    var validType=validate_type(form);
    
    //validate delivery time
    var validTime=validate_time(form);

    //validate allergies
    var validAllergies=validate_allergies(form);

    if(validName&&validTime&&validCount&&validType&&validAllergies){
        return true;
    }
    else{
        return false;
    }
}

function show_storage(){
    //write code that shows the name from local storage
    let name=document.getElementById("welcome");
    if(localStorage.getItem("name")==null || localStorage.getItem("name")==""){
        name.innerText="Welcome user";
    }
    else{
        name.innerText=`Welcome ${localStorage.getItem("name")}!`;
    }

}


//form validators
function validate_name(form){
    let name_msg=document.getElementById("name_error_msg");
    let name_val=form.cname.value;
    let returnedVal=false;
    if(name_val.length<5 || name_val.length>16){
        document.getElementById("cname").className="errorValidate";
        name_msg.innerText="Name must be between 5 and 16 characters long";
        name_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else{
        document.getElementById("cname").className="trueValidate";
        name_msg.innerText="";
        name_msg.innerHTML="<i class=\"fas fa-check fa-x\"></i>"
        name_msg.className="error_msg ok";
        returnedVal=true;
    }
    return returnedVal;
}
function validate_count(form){
    let count_msg=document.getElementById("count_error_msg");
    let count_val=form.count.value;
    let returnedVal=false;
    if(count_val>=1 && count_val<=15){
        document.getElementById("count").className="trueValidate";
        count_msg.innerText="";
        count_msg.innerHTML="<i class=\"fas fa-check fa-x\"></i>"
        count_msg.className="error_msg ok";
        returnedVal=true;
    }
    else{
        document.getElementById("count").className="errorValidate";
        count_msg.innerText="The count must be between 1 and 15";
        count_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    return returnedVal;
}
function validate_type(form){
    let type_msg=document.getElementById("type_error_msg");
    let type_val=form.cupcake_type.value;
    let returnedVal=false;
    if(type_val=="none"){
        document.getElementById("cupcake_type").className="errorValidate";
        type_msg.innerText="Please choose Cupcake type";
        type_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else{
        document.getElementById("cupcake_type").className="trueValidate";
        type_msg.innerText="";
        type_msg.innerHTML="<i class=\"fas fa-check fa-x\"></i>"
        type_msg.className="error_msg ok";
        returnedVal=true;
    }
    return returnedVal;
}
function validate_time(form){
    let type_val=form.cupcake_type.value;
    let time_msg=document.getElementById("delivery_error_msg");
    let time_val=form.delivery_time.value;
    let returnedVal=false;
    if(time_val=="none"){
        document.getElementById("delivery_time").className="errorValidate";
        time_msg.innerText="Please choose delivery time";
        time_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else if(time_val=="4pm" && type_val=="chocolate"){
        document.getElementById("delivery_time").className="errorValidate";
        time_msg.innerText="Chocolate cake can`t delivered at 4:00 PM";
        time_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else{
        document.getElementById("delivery_time").className="trueValidate";
        time_msg.innerText="";
        time_msg.innerHTML="<i class=\"fas fa-check fa-x\"></i>"
        time_msg.className="error_msg ok";
        returnedVal=true;
    }
    return returnedVal;
}
function validate_allergies(form){
    let type_val=form.cupcake_type.value;
    let allergies_val=form.allergies.value;
    let allergies_msg=document.getElementById("allergies_error_msg");
    let returnedVal=false;
    if(allergies_val=="dairyFree" && type_val=="chocolate"){
        document.getElementById("allergies").className="errorValidate";
        allergies_msg.innerText="This type of cake isn`t dairy free";
        allergies_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else if(allergies_val=="nutFree" && type_val=="pecan"){
        document.getElementById("allergies").className="errorValidate";
        allergies_msg.innerText="This type of cake isn`t nut free";
        allergies_msg.className="error_msg not_ok";
        returnedVal=false;
    }
    else{
        document.getElementById("allergies").className="trueValidate";
        allergies_msg.innerText="";
        allergies_msg.innerHTML="<i class=\"fas fa-check fa-x\"></i>"
        allergies_msg.className="error_msg ok";
        returnedVal=true;
    }
    return returnedVal;
}

document.forms["order_form"].onsubmit=function(e){
    let valid=validate();
    if(valid){
        localStorage.setItem("Customer Name",cname.value);
        localStorage.setItem("Count",count.value);
        localStorage.setItem("Type",cupcake_type.value);
        localStorage.setItem("Delivery Time",delivery_time.value);
        localStorage.setItem("Allergies",allergies.value);
    }
    else{
        e.preventDefault();
    }
}