import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import AddMemoComponent from './editmemocomponent'  //Huomaa, että eitmemocomponent -modulin 
                                                  //oletus export otetaan mukaan projektiin                                                //ilman aaltosulkeita.
import { MemosComponent }  from './memoscomponents'  //MemosComponent on yksi memoscomponent -koodimodulin 
                                                   //exporteista (aaltosulkeet ympärillä imporssa)

function MemoApp() {
  const [memos, setMemos] = useState([])

  const appStyle = {
    backgroundColor: "green",
  }

  function addNewMemo(memo){
    //Ei lisätä suoraan tilamuuttujaan uutta jäsentä
    //tehdään syväkopio ensi nykyisistä memoista
    const memosNow=JSON.parse(JSON.stringify(memos));
    memosNow.push(memo);
    //Kutsutaan tilan asettavaa set-funktiota.
    setMemos(memosNow);
  }

  return (
    <div className="MemoApp" style={appStyle}>
    <AddMemoComponent addNewMemo={addNewMemo}/>
    <MemosComponent memos={memos}/>
    </div>
  );
}

export default MemoApp;
