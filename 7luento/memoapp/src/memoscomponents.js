import React from "react"
import { useState } from "react"

export function MemosComponent({memos}){
   const [content, setContent] = useState("");

   const memosStyle = {
      backgroundColor: "lightred",
    }

   return (
      <div>
      <MemoList memos={memos} setContent={setContent} memosStyle={memosStyle}/>
      <MemoInfo content={content}/>
      </div>
   )
}

function MemoList({memos, setContent, memosStyle}){

   return (
    <div style={memosStyle}>
    <ol>
       {memos.map((memo, k) => <li key={k} onClick={()=>setContent(memo.memoDescription)}>{k}. jäsen {memo.memoName}</li>)}
    </ol>
    </div>
   )
}

function MemoInfo({content}){

  return (<div>{content}</div>)

}



