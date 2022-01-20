import axios from "axios";

export const getAllUser = async() => {

    return axios.get('https://x3a0md117a.execute-api.ap-southeast-1.amazonaws.com/dev/admin/user/dynamo')
    .then((response) => {

        if(response.data.code === 200){
            return response.data.data;
        }else{
            return false;
        }
        // console.log(response);
    });
}

export const addUserOnAPI = async({
    name,
    email,
    mobile,
    password
}) => {

    let params = JSON.stringify({
        full_name: name,
        email: email,
        mobile: mobile,
        password: password
    });

    return axios.post('https://x3a0md117a.execute-api.ap-southeast-1.amazonaws.com/dev/admin/user/dynamo', params)
    .then((response) => {
        if(response.data.code === 201){
            return response.data;
        }else{
            return false;
        }
    })

}

export const deleteUserOnAPI = async(user_id) => {
    return axios.delete("https://x3a0md117a.execute-api.ap-southeast-1.amazonaws.com/dev/admin/user/USER:" + user_id)
    .then((response) => {
        if(response.data.code === 204){
            return response.data;
        }else{
            return false;
        }
    })
}