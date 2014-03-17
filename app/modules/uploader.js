define(["promise"], function(Promise){

    var
    //Public Method
   
    uploadFile = function uploadFile(fileObject,id,type) {

        return new Promise(function (resolve, reject) {

            var fileName = fileObject.name;
            var fileSize = fileObject.size;
            var fileType = fileObject.type;

            // TO DO Verification

            // Open formData Object that contains all form data
            var formData = new FormData();

            // Append the fileObject to the formData
            formData.append('uploadedImage', fileObject);

            // Create XMLHttpRequest Object
            var xhr = new XMLHttpRequest();

            // Open connection using the POST method
            xhr.open("POST", 'http://climbtouch.com/upload.php?id=' + id + "&type=" + type);
           
            xhr.onload = resolve;
            xhr.onerror = reject;

            // Send the file
            xhr.send(formData);
        });
    };

    return {
        uploadFile : uploadFile,
    };
});



