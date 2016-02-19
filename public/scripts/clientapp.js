$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#employeeForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/payroll',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/payroll',
        success: function(data) {
            console.log(data);
        }
    });
}

//$('#employeeForm').on('submit', function(event) {
//    event.preventDefault();
//
//    var values = {};
//
//    $.each($('#employeeForm').serializeArray(), function(i, field) {
//        values[field.name] = field.value;
//    });
//
//    empMonthlySalary = parseInt(values.empSalary).toFixed(2)/12;
//    totalMonthlySalary += empMonthlySalary;
//
//    empArray.push(values);
//    console.log(empArray);
//
//    $('#employeeForm').find('input[type=text], input[type=number]').val('');
//
//    appendDom(values);
//});
