import { useState, useEffect } from "react";


const fileListToJson = (fileList) => {

}


export const Project = ({ pages, modalValues, setModalValues }) => {

    const [projectJson, setProjectJson] = useState(null);

    useEffect(() => {
        fetchFromApi();
    }, [])

    const fetchFromApi = () => {
        const body = JSON.stringify(modalValues);
        var options = {
            'method': 'POST',
            'url': 'localhost:1111/api/save-profile',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': body 
        };
        fetch(options)
            .then(response => response.json())
            .then(data => setProjectJson({...data}))
            .catch(err => {
                console.log(err)
                setProjectJson('ERR')
            });
    }

    return ( 
        <p>
            {projectJson ? JSON.stringify(modalValues, null, 4) : 'Loading...'}
        </p>
    );
}