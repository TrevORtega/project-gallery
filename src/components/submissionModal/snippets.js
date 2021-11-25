import { useState } from 'react';
import { Col, Container, Dropdown, Row, Form, Button } from 'react-bootstrap';
import { CopyBlock, codepen } from 'react-code-blocks';
import styled from 'styled-components';

const StyledInputCol = styled(Col)`
    overflow-y: scroll;
`;

const StyledCodeCol = styled(Col)`
    text-align: left;
`;

const StyledDropdown = styled(Dropdown)`
    .dropdown-menu.show {
        height: 20vh;
        overflow-y: scroll;
    }
`;

// Left side dropdown 
const LanguageDropdown = ({snippetValues, setSnippetValues, i}) => {
    const language = snippetValues.language[i];

    const onChange = (eventkey, e) => {
        e.preventDefault();
        snippetValues.language[i] = e.target.name;
        setSnippetValues({...snippetValues});
    }

    const Items = languages.map(lang => {
        return <Dropdown.Item name={lang} key={lang}>{lang}</Dropdown.Item>;
    });

    return (
        <StyledDropdown onSelect={onChange}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {language} 
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {Items}
            </Dropdown.Menu>
        </StyledDropdown>
    );
}

// Left side form 
const CodeForm = ({snippetValues, setSnippetValues, i}) => {

    const onChange = (e) => {
        e.preventDefault();
        snippetValues.code[i] = `${e.target.value}`;
        setSnippetValues({...snippetValues});
    }


    return (
        <Form.Group className="mb-3" >
            <Form.Control 
                name="code" 
                as="textarea" 
                rows={5} 
                onChange={onChange}
            />
        </Form.Group>
    );
}

// Right Side Code Block
export const CodeBlock = ({code, language}) => {
    return (
        <StyledCodeCol>
            <CopyBlock
                text={code}
                language={language === 'Choose Language' ? 'text' : language}
                showLineNumbers={true}
                theme={codepen}
                codeBlock={true}
                wrapLines={true}
            />
        </StyledCodeCol>
    );
}

// Both sides together. Can be multiple
const SnippetRow = ({i, snippetValues, setSnippetValues}) => {
    const code = snippetValues.code[i];
    const language = snippetValues.language[i];

    return (
        <Row>
            <StyledInputCol>
                <LanguageDropdown 
                    snippetValues={snippetValues}
                    setSnippetValues={setSnippetValues}
                    i={i}
                />
                <CodeForm 
                    snippetValues={snippetValues}
                    setSnippetValues={setSnippetValues}
                    i={i}
                />
            </StyledInputCol>
            <CodeBlock 
                code={code}
                language={language}
            /> 
        </Row>
    );
}

export const Snippets = ({pages, modalValues, setModalValues}) => {
    const snippetDefaults = {code: '', language: 'Choose Language'}
    const [snippetValues, setSnippetValues] = useState({
        code: [snippetDefaults.code],
        language: [snippetDefaults.language]
    })

    const [isSubmitted, setIsSubmitted] = useState(false);
    const Page = pages[modalValues.state];

    const submitFunc = (e) => {
        e.preventDefault();
        setModalValues({
            ...modalValues,
            ...snippetValues,
            state: modalValues.state+1
        });
        setIsSubmitted(true);
    };

    const backFunc = () => {
        setModalValues({
            ...modalValues,
            ...snippetValues,
            state: modalValues.state-1
        });
        setIsSubmitted(true);
    };

    const addNewSnippet = () => {
        setModalValues({
            ...modalValues,
            code: snippetValues.code.push(''),
            language: snippetValues.language.push('Choose Language')
        });
        console.log(snippetValues.code, snippetValues.language);
    };

    const Snippets = snippetValues.code.map((_, i) => (
        <>
            <br/>
            <SnippetRow
                key={i}
                i={i}
                snippetValues={snippetValues}
                setSnippetValues={setSnippetValues}
            />
        </>
    )); 

    const isValid = snippetValues.language
        .filter(x => x === "Choose Language").length === 0;

    return (
        <>
            {isSubmitted ? 
                <Page 
                    pages={pages}
                    modalValues={modalValues}
                    setModalValues={setModalValues}
                />
            : (
            <Container fluid>
                <Row>
                    <Col>
                        <h3>
                            Enter a Code Snippet!
                        </h3>
                    </Col>
                </Row>
                {Snippets}
                <Row>
                    <Col>
                        <Button size="md" onClick={addNewSnippet}>
                            Add Another Snippet
                        </Button> 
                    </Col>
                    <Col>
                        <Button size="md" onClick={backFunc}>
                            Back
                        </Button>
                        <Button 
                            size="md" 
                            onClick={submitFunc}
                            disabled={!isValid}
                        >
                            Next
                        </Button> 
                    </Col>
                </Row>
            </Container>
        )}
    </>
    );
}

const languages = [
    'abap',
    'actionscript',
    'ada',
    'arduino',
    'autoit',
    'c',
    'clojure',
    'cs',
    'cpp',
    'coffeescript',
    'csharp',
    'css',
    'cuda',
    'd',
    'dart',
    'delphi',
    'elixir',
    'elm',
    'erlang',
    'fortran',
    'foxpro',
    'fsharp',
    'go',
    'graphql',
    'gql',
    'groovy',
    'haskell',
    'haxe',
    'html',
    'java',
    'javascript',
    'json',
    'julia',
    'jsx',
    'js',
    'kotlin',
    'latex',
    'lisp',
    'livescript',
    'lua',
    'mathematica',
    'makefile',
    'matlab',
    'objectivec',
    'objective',
    'objectpascal',
    'ocaml',
    'octave',
    'perl',
    'php',
    'powershell',
    'prolog',
    'puppet',
    'python',
    'qml',
    'r',
    'racket',
    'restructuredtext',
    'rest',
    'ruby',
    'rust',
    'sass',
    'less',
    'scala',
    'scheme',
    'shell',
    'smalltalk',
    'sql',
    'standardml',
    'sml',
    'swift',
    'tcl',
    'tex',
    'text',
    'tsx',
    'ts',
    'typescript',
    'vala',
    'vbnet',
    'verilog',
    'vhdl',
    'xml',
    'xquery',
    'yaml'
]