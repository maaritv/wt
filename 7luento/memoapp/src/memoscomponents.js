import React from "react"
import { useState } from "react"

export function MemosComponent({memos}){
   const [content, setContent] = useState("");

   return (
      <div>
      <MemoList memos={memos} setContent={setContent}/>
      <MemoInfo content={content}/>
      </div>
   )
}

function MemoList({memos, setContent}){

   return (
    <div>
    <ol>
       {memos.map(memo => <li onClick={()=>setContent(memo.memoDescription)}>{memo.memoName}</li>)}
    </ol>
    </div>
   )
}

function MemoInfo({content}){

  return (<div>{content}</div>)

}



