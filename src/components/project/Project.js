import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export const Project = ({ pages, modalValues, setModalValues }) => {
    const [projectJson, setProjectJson] = useState(null);
   
    useEffect(() => {
        modalValues.imageUrls = Array.from(modalValues.imageUrls)?.map(
            x => x && URL.createObjectURL(x)
        );
        modalValues.videoUrl = modalValues.videoUrl && URL.createObjectURL(modalValues.videoUrl);
        fetchFromApi();
    }, [])

    const fetchFromApi = () => {
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
            .then(data => {
                setProjectJson({...data})
                console.log('data -> ', data);
            }
            )
            .catch(err => {
                console.log('ERR: ', err);
                setProjectJson('ERR');
            });
    }

    return (
        <> 
            <p>
                {projectJson ? JSON.stringify(projectJson, null, 4) : 'Loading...'}
            </p>
            <Button href="/profile">
                Finish
            </Button>
        </>
    );
}