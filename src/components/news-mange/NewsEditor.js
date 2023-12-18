/**
 * 富文本编辑器
 * @Author zs
 * @Date 2023-12-18
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期一
 */
import React, {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from "draft-js";

const NewsEditor = (props) => {
  const [editorState, setEditorState] = useState("");

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        onBlur={() => props.getRichText(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
      />
    </div>
  )
}

export default NewsEditor;
