import React, { useState, useRef } from 'react';

function TextFormat() {
    const [content, setContent] = useState('');
    const textAreaRef = useRef(null);

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault(); // Prevent default behavior of adding a new line
            // Handle new line
            // You can convert the text content to HTML here and store it in a state or perform any other action
            console.log('HTML Content:', convertToHTML(content));
        }
    };

    const handleFormatClick = (format) => {
        // Handle formatting (e.g., bold, italic, underline)
        const currentTextArea = textAreaRef.current;
        const selectionStart = currentTextArea.selectionStart;
        const selectionEnd = currentTextArea.selectionEnd;

        const formattedText = applyFormat(content, selectionStart, selectionEnd, format);
        setContent(formattedText);
    };

    const applyFormat = (text, start, end, format) => {
        const beforeSelection = text.substring(0, start);
        const selectedText = text.substring(start, end);
        const afterSelection = text.substring(end);

        let formattedText = '';

        switch (format) {
            case 'bold':
                formattedText = `${beforeSelection}**${selectedText}**${afterSelection}`;
                break;
            case 'italic':
                formattedText = `${beforeSelection}*${selectedText}*${afterSelection}`;
                break;
            case 'underline':
                formattedText = `${beforeSelection}<u>${selectedText}</u>${afterSelection}`;
                break;
            default:
                formattedText = text;
        }

        return formattedText;
    };

    const convertToHTML = (text) => {
        // Implement your logic to convert markdown to HTML here
        // You can use a library like marked.js for a simple implementation
        // Note: This is markdown conversion for bold and italic
        // const htmlText = marked(text);
        // return htmlText;
    };
    return (
        <div>
            <div className="format-buttons">
                <button onClick={() => handleFormatClick('bold')}>Bold</button>
                <button onClick={() => handleFormatClick('italic')}>Italic</button>
                <button onClick={() => handleFormatClick('underline')}>Underline</button>
            </div>
            <textarea
                ref={textAreaRef}
                value={content}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type here..."
            />
        </div>
    )
}

export default TextFormat