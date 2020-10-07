import 'whatwg-fetch';
import Axios from 'axios';
class HttpService {
    getCars = (Email) => {
        const jemail = { email: Email};
        
    }
    
    
    /*getCars = (email) => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3001/getcars?id='+id).then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }*/

    login = (userName, passWord) => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: passWord,
                })
            }).then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }
}

export default HttpService;