import React,{useState,useEffect} from 'react'
import axios from '../../axios/'
import './TextEditor.css'
import {Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import BlockStyleToolbar, { getBlockStyle } from "./blockStyles/BlockStyleToolbar.jsx";
import {stateToHTML} from 'draft-js-export-html';
import Interweave from 'interweave'

export const TextEditor = (props) => {
    const [editorState,setEditorState] = useState(EditorState.createEmpty())
    const [html,setHtml] = useState(false)
    const [categories,setCategories] = useState(false)
    const [selectedCategory,setSelectedCategory] = useState(false)
    const [error,setError] = useState(false)
    useEffect(() => {
        getCategory()
    },[])

    const saveContent = () => {
      if(!html){
          return setError('Escreva sobre algo')
      }

      if(!selectedCategory){
          return setError('Selecione a categoria do artigo')
      }

      axios('/adm/createArticle',{
          method:'POST',
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`},
          data:{
              content:html
          }
      })

    }

    const handleSelect = (e) => {
        setSelectedCategory(e.target.value)
    }

    const getCategory = () => {
        axios('/category/getAll')
        .then(response => {
            setCategories(response.data.categories)
        })
        .catch(e => {
            console.log(e)
        }) 
    }

    const toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setHtml(stateToHTML(contentState))
        setEditorState(editorState)
    }



   const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    const onUnderlineClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      }
    
    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
      }
    
    const onItalicClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }

    return(
        <div className="m-text-editor">
            <div className="controls">
                <BlockStyleToolbar
                    editorState={editorState}
                    onToggle={toggleBlockType}
                    />
                <button className="RichEditor-styleButton" onClick = {() => {onItalicClick()}}>I</button> 
                <button className="RichEditor-styleButton" onClick = {() => {onBoldClick()}}>B</button> 
                <button className="RichEditor-styleButton" onClick = {() => {onUnderlineClick()}}>U</button> 
            </div>

           <Editor
               blockStyleFn={getBlockStyle}
               editorState = {editorState}
               handleKeyCommand={handleKeyCommand}
               onChange = {onChange}
          >
          </Editor>

          <div>
              <select onChange ={(e) => {handleSelect(e)}}>
                  <option selected value={false}>Selecione</option>
                      {categories ? categories.map(category => {
                          return <option value={category.id}>{category.name}</option>
                      }):''}
               </select>
                <button onClick = {() => {saveContent()}}>Criar artigo</button>
                <p className="error color-text-danger">{error ? error : ''}</p>
          </div>

        <div className="preview">
            <Interweave
                content = {html}
            />
        </div>
        </div>
    )
}