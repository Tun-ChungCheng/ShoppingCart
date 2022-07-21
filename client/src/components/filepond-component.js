import React from "react";
import { FilePond } from "react-filepond";

const filepondComponent = (files, setFiles) => {
  return (
    <FilePond
      files={files}
      allowReorder={true}
      allowMultiple={false}
      onupdatefiles={setFiles}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
};

export default filepondComponent;
