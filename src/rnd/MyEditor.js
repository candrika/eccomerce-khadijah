import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CKEditorComponent({ data, onDataChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={(event, editor) => {
        const newData = editor.getData();
        onDataChange(newData);
      }}
    />
  );
}

export default CKEditorComponent;
