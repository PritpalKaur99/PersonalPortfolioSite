//alert msg when data is added successfully

$('.contact-btn').click(function (event) {
    if ($(this).attr("value") === "submit") {

        $("#add_contact").submit(function (event) {
            const unindexed_array = $(this).serializeArray();
            const data = {};
            $.map(unindexed_array, function (n, i) {
                data[n['name']] = n['value']
            })
            if (data.name !== '' && data.email !== '' && data.phoneno !== '')
                alert("Data Inserted Successfully!");

        });
    }
});

//updating data
$("#update_contact button").click(function (event) {
    if ($(this).attr("value") === "update") {
        $('#update_contact').submit(function (event) {
            event.preventDefault();
            const unindexed_array = $(this).serializeArray();
            const data = {};
            $.map(unindexed_array, function (n, i) {
                data[n['name']] = n['value']
            })
            const request = {
                "url": `http://${window.location.host}/api/contact/${data.id}`,
                "method": "PUT",
                "data": data
            };

            $.ajax(request).done(function (response) {
                alert("Data Updated Successfully!");
            });
        });
    }
    if ($(this).attr("value") === "delete") {
        $('#update_contact').submit(function (event) {
            event.preventDefault();
            const unindexed_array = $(this).serializeArray();
            const data = {};
            $.map(unindexed_array, function (n, i) {
                data[n['name']] = n['value']
            })
            const request = {
                "url": `http://${window.location.host}/api/contact/${data.id}`,
                "method": "DELETE"
            };

            $.ajax(request).done(function (response) {
                window.location.replace(`http://${window.location.host}/businessContact`);
                alert("Data Deleted Successfully!");
            });
        });
    }


});
// Deleting of data without refreshing page
if (window.location.pathname === "/businessContact") {

    $ondelete = $(".deletecontact");
    $ondelete.click(function () {
        const id = $(this).attr("data-id");

        const request = {
            "url": `http://${window.location.host}/api/contact/${id}`,
            "method": "DELETE"
        };

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    });
}
