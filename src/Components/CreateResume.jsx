import React, { useState } from "react";
import { saveAs } from 'file-saver';
import { Packer } from "docx";
import { DocumentCreatorTest } from "../server/resume.js";
import { trackUserData } from "../server/index.js";

function CreateResume() {

    // state to manage if click has happened so onval only triggered once
    const [onVal, setOnVal] = useState(false);

    // ensure onValue is only triggered once
    function handleClick() {
      if (!onVal) {
        trackUserData();
      }
      setOnVal(true);
    }
    
    function generate() {
        const documentCreator = new DocumentCreatorTest();
        const doc = documentCreator.create([
          {firstName: 'Jake', lastName: 'Ottiger'}
        ]);
    
        Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, "test.docx");
          console.log("Document created successfully");
        });
      }

      return (
        <button onClick={handleClick}>Generate Resume</button>
      )
}

export default CreateResume;