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

// Left side with input containers
const LanguageDropdown = ({snippetValues, setSnippetValues, i}) => {
    const { language } = snippetValues;

    const onChange = (eventkey, e) => {
        e.preventDefault();
        snippetValues.language[i] = e.target.name;
        setSnippetValues({...snippetValues});
    }

    const Items = languages.map(lang => {
        return <Dropdown.Item name={lang} key={lang}>{lang}</Dropdown.Item>;
    });

    return (
        <Dropdown onSelect={onChange}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {language} 
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {Items}
            </Dropdown.Menu>
        </Dropdown>
    );
}

// Right side with presented code
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

const SnippetRow = ({i, snippetValues, setSnippetValues, defaultLanguage}) => {
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
            <StyledCodeCol>
                <CopyBlock
                    text={code}
                    language={language === 'Choose Language' ? defaultLanguage : language}
                    showLineNumbers={true}
                    theme={codepen}
                    codeBlock={true}
                    wrapLines={true}
                />
            </StyledCodeCol>
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

    const defaultLangauge = 'text';

    const submitFunc = (e) => {
        e.preventDefault();
        setModalValues({
            ...modalValues,
            ...snippetValues,
            state: modalValues.state+1
        });
        setIsSubmitted(true);
    }

    const Snippets = snippetValues.code.map((_, i) => (
        <SnippetRow
            key={i}
            i={i}
            snippetValues={snippetValues}
            setSnippetValues={setSnippetValues}
            defaultLanguage={defaultLangauge}
        />
    )) 

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
                        <Button size="md" onClick={() => {console.log('adding...')}}>
                            Add Another Snippet
                        </Button> 
                    </Col>
                    <Col>
                        <Button size="md" onClick={submitFunc}>
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