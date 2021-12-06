import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";


export const SaveProfile = ({ profileData }) => {
    useEffect(() => {
        sendToApi();
    }, [])

    const [cookies, setCookies] = useCookies();
    const sendToApi = () => {

        profileData.email = cookies.email;
        const body = JSON.stringify(profileData);
        const request = new Request('http://localhost:1111/api/save-profile', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': String(body) 
        })
        fetch(request)
            .then(response => response.json())
            .catch(err => {
                console.log('ERR: ', err);
            });
    }

    return <Redirect to={`/profile/${cookies.username}`} />
}

export const LoadProfile = ({ username, setData }) => {
    useEffect(() => {
        loadFromApi();
    }, [])

    const loadFromApi = () => {
        const body = JSON.stringify({'username': username});
        const request = new Request('http://localhost:1111/api/load-profile', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': String(body) 
        })

        fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData({...data})
            })
            .catch(err => {
                console.log('ERR: ', err);
                setData({'ERR': err});
            });
    }

    return 0; 
}