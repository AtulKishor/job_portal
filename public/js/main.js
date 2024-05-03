
function deleteJob(id){
    if(confirm("Are you sure to delete this job posting?")){
        fetch(`/job/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if(response.ok){
                window.location.replace("/jobs")
            } else  {
                return response.json().then(error => {
                    alert(error.error);
                });
            }
        })
    }
}

