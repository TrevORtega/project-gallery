import styled from 'styled-components';
import { Row, Stack } from 'react-bootstrap';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import { useEffect, useState } from 'react';
import { SavedProjectSmall } from '../../components/project/Project';

const StyledSearchResultsContainer = styled(Stack)`
    text-align: center;
    display: flex;
`;

const StyledProjectCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

const StyledRow = styled(Row)`
    background-color: white;
    color: black;
    width: 20vw;
`;

const StyledP = styled.h1`
    color: black;
    height: 10vh;
`;


export const SearchResultsProfileProjects = (username) => {
    const url = 'http://localhost:1111/api/search-projects-profile'
    const [results, setResults] = useState(null);
    SearchFiles(username, setResults, url); 

    return (
        <StyledProjectCardContainer>
            {results?.projects ? ( 
                results.projects.map(k => {
                    return (
                        <StyledRow>
                            <SavedProjectSmall id={k} />
                        </StyledRow>
                    );
                })
            ) : 'Searching...'
            } 
        </StyledProjectCardContainer>
    )
}


const SearchFiles = (query, setResults, url='http://localhost:1111/api/search-projects') => {
    useEffect(() => {
        loadFromApi();
    }, [])

    const loadFromApi = () => {
        const body = JSON.stringify({'query': query});
        const request = new Request(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': String(body) 
        })

        fetch(request)
            .then(response => response.json())
            .then(data => {
                setResults({...data});
            })
            .catch(err => {
                console.log('ERR: ', err);
                setResults({'ERR': err});
            });
    }

    return 0; 
}

export const SearchResults = ({ query }) => {
    const [results, setResults] = useState(null);
    SearchFiles(query, setResults); 
    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            <ContentContainer>
                <StyledSearchResultsContainer>
                    <StyledP>
                        {`Search Results for: ${query}`}
                    </StyledP>
                    <StyledProjectCardContainer>
                        {results?.projects ? ( 
                            Object.keys(results.projects).map(k => {
                                return (
                                    <StyledRow>
                                        <SavedProjectSmall id={k} />
                                    </StyledRow>
                                );
                            })
                        ) : 'Searching...'
                        } 
                    </StyledProjectCardContainer>

                </StyledSearchResultsContainer>
            </ContentContainer>
        </MainContainer>
            
    );
}
