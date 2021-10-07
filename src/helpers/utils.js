//Function to convert params to post request body like .../login?email=a@example.com&password=1234
export function getFormBody(params) {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user_name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); //neelesh 123 => neelesh%20123

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');  //user%20name=N@example.com&password=1234
}