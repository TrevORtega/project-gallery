import { useEffect, useState } from "react";

export const FileListToUrlList = (fileList) => {
    return Array.from(fileList)?.map(
            x => x && FileToUrl(x));
};

export const FileToUrl = (file) => {
    return URL.createObjectURL(file);
};

export const SaveProject = ({ modalValues }) => {
    const [responseStatus, setResponseStatus] = useState(1);
   
    useEffect(() => {
        if (typeof(modalValues.imageUrls) === 'object'){
            modalValues.imageUrls = FileListToUrlList(modalValues.imageUrls);
            modalValues.videoUrl = modalValues.videoUrl && FileToUrl(modalValues.videoUrl);

        }
        sendToApi();
    }, [])

    const sendToApi = () => {
        const body = JSON.stringify(modalValues);
        console.log('body -> ', body)
        const request = new Request('http://localhost:1111/api/save-project', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': String(body) 
        })
        fetch(request)
            .then(response => response.json())
            .then(() => setResponseStatus(0)) 
            .catch(err => {
                console.log('ERR: ', err);
                setResponseStatus(-1);
            });
    }

    return responseStatus 
}

export const LoadProject = ({ id }) => {
    const [projectData, setProjectData] = useState(null);
   
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
                setProjectData({...data})
            })
            .catch(err => {
                console.log('ERR: ', err);
                setProjectData({'ERR': err});
            });
    }

    return projectData 
}