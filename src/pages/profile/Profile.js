import styled from 'styled-components';
import { Row } from 'react-bootstrap';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer, TestContainer } from '../../components/theme/mainTheme';
import stock from '../../images/default_photo.jpg'

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center; 
    img.rounded-corners {
    	border-radius: 30px;
    }
    h1 {
    color: #fff;
    }

    h3 {
    padding-left: 40px;
    text-align: left;
    color: #fff;
    }

    .container {
    margin: 20px 0px 0px 20px;
    overflow: auto;
    }

    .thumb {
    float: right;
    }

    .thumb img {
    display: block;
    }

    .content {
    float: left;
    margin-top: 60px;
    }
`;

const DefaultProfile = () => {
    return (
        <>
            <div class="container">
                <div class = "content">
                    <h1>Hi! I'm DefaultUser</h1>
                </div>
                <div class="thumb">
                    <img src = {stock} height = "200" width = "200" class = "rounded-corners" alt="default photo" />
                </div>
            </div>
            <h3>About</h3>
            <p></p>
            <h3>Experience</h3>
            <p></p>
            <h3>Education</h3>
            <p></p>
            <h3>Projects</h3>
            <p></p>
        </>
    );
}

export const Profile = ({ cookies }) => {
    return (
        <MainContainer>
            <Row>
                <DefaultNav cookies={cookies} />
            </Row>
            <ContentContainer>
                <StyledProfile>
                    <DefaultProfile />    
                </StyledProfile>
            </ContentContainer>
        </MainContainer>
    );
}
