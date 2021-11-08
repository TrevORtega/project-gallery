import { useState } from 'react';
import { Col, Container, Dropdown, Row, Form, Button } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import styled from 'styled-components';

const StyledInputCol = styled(Col)`
    overflow-y: scroll;
`;

const LanguageDropdown = ({snippetValues, setSnippetValues}) => {
    const { language } = snippetValues;

    const onChange = (eventkey, e) => {
        e.preventDefault();
        setSnippetValues({...snippetValues, language: e.target.name});
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

const CodeForm = ({snippetValues, setSnippetValues}) => {

    const onChange = (e) => {
        e.preventDefault();
        setSnippetValues({...snippetValues, code: e.target.value});
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

export const Snippets = ({pages, modalValues, setModalValues}) => {
    const [snippetValues, setSnippetValues] = useState({
        code: '',
        language: 'Choose Language'
    })

    const [isSubmitted, setIsSubmitted] = useState(false);
    const Page = pages[modalValues.state];

    const defaultLangauge = 'text';
    const { code, language } = snippetValues;

    const submitFunc = (e) => {
        e.preventDefault();
        setModalValues({...snippetValues, state: modalValues.state+1});
        setIsSubmitted(true);
    }
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
                <Row>
                    <StyledInputCol>
                        <LanguageDropdown 
                            snippetValues={snippetValues}
                            setSnippetValues={setSnippetValues}
                        />
                        <CodeForm 
                            snippetValues={snippetValues}
                            setSnippetValues={setSnippetValues}
                        />
                    </StyledInputCol>
                    <Col>
                        <CopyBlock
                            text={code}
                            language={language == 'Choose Language' ? defaultLangauge : language}
                            showLineNumbers={true}
                            startingLineNumber={true}
                            theme={dracula}
                            wrapLines
                        />
                    </Col>
                </Row>
                <Button size="md" onClick={submitFunc}>
                    Next
                </Button> 
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