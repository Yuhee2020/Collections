import React, {useState} from 'react';
import {AddCollectionModal} from "../../components/modals/AddCollectionModal";
import ReactMarkdown from "react-markdown";
import MDEditor from '@uiw/react-md-editor';

export const BiggestCollections = () => {
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
    return (
        <div>
            <ReactMarkdown>##### Heading 5</ReactMarkdown>
            <MDEditor
                value={value}
                onChange={(e)=>setValue(e)}
            />
            <MDEditor.Markdown source={value} />
        </div>
    );
};

