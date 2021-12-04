import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect, useHistory } from "react-router";

export const FileListToUrlList = (fileList) => {
    return Array.from(fileList)?.map(
            x => x && FileToUrl(x));
};

export const FileToUrl = (file) => {
    return URL.createObjectURL(file);
};

export const SaveProject = ({ modalValues }) => {
    const [cookies, setCookies] = useCookies();
    useEffect(() => {
        if (!Array.isArray(modalValues.imageUrls)){
            modalValues.imageUrls = FileListToUrlList(modalValues.imageUrls);
            modalValues.videoUrl = modalValues.videoUrl && FileToUrl(modalValues.videoUrl);

        }
        sendToApi();
    }, [])

    const sendToApi = () => {
        modalValues.username = cookies.username; 
        const body = JSON.stringify(modalValues);
        const request = new Request('http://localhost:1111/api/save-project', {
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

    const hist = useHistory();
    hist.go(0);
    return <h1>Saved!</h1>; 
}

export const LoadProject = ({ id, setData }) => {
    useEffect(() => {
        loadFromApi();
    }, [])

    const loadFromApi = () => {
        const body = JSON.stringify({'id': id});
        const request = new Request('http://localhost:1111/api/load-project', {
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