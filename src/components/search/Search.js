import { Redirect } from "react-router-dom";

export const Search = ({ searchStr }) => {
    console.log(typeof(searchStr), searchStr); 
    searchStr = searchStr.replace('+', '');
    const url = "?terms=" + searchStr.split(' ').join('+');

    console.log(searchStr, ' -> ', url, typeof(url));
    return (
        <Redirect to={{
                pathname: "/search",
                search: url 
            }}
        >
        </Redirect>
            
    );
}
