/**
 * 富文本编辑器
 * @Author zs
 * @Date 2023-12-18
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期一
 */
import React, {useEffect, useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import ContentState from "draft-js/lib/ContentState";
import EditorState from "draft-js/lib/EditorState";

const NewsEditor = (props) => {
  const [editorState, setEditorState] = useState("");

  // 回显富文本
  useEffect(() => {
    if(!props.content) return;
    const contentBlock = htmlToDraft(props.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [props.content]);

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
