import React from "react";
import ReactQuill from "react-quill"; // Make sure to install the 'react-quill' package
import "react-quill/dist/quill.snow.css"; // Import the desired quill theme
import PropTypes from "prop-types";

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  // const [editorHtml, setEditorHtml] = useState<string>('');

  // const handleChange = (html: string) => {
  //   setEditorHtml(html);
  //   console.log("text: ", html);
  // };

  // const handleThemeChange = (newTheme: string) => {
  //   if (newTheme === "core") newTheme = 'snow';
  //   setTheme(newTheme);
  // };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value || ""}
        modules={modules}
        formats={formats}
        bounds={".app"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
