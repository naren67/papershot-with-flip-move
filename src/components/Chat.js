import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import InsertChartOutlinedSharpIcon from '@material-ui/icons/InsertChartOutlinedSharp';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import db from '../firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';

function Chat() {

          const user = useSelector(selectUser)
          const channelId = useSelector(selectChannelId)
          const channelName = useSelector(selectChannelName)

          const [input, setInput] = useState('')
          const [messages, setMessages] = useState([])

          useEffect(()=>{
              if(channelId){
                    db.collection('channels').doc(channelId).collection('messages')
                    .orderBy('timestamp','asc').onSnapshot(snapshot=>{
                         setMessages(snapshot.docs.map(doc=> doc.data()))
                    })
              }
          },[channelId])

          const sendMessage = (e) =>{
                    e.preventDefault()

                    db.collection('channels').doc(channelId).collection('messages')
                    .add({
                              message : input,
                              user : user,
                              timestamp : firebase.firestore.FieldValue.serverTimestamp()
                    })

                    setInput('')
          }

          const sendMessageTweetBtn = (e) =>{
                    e.preventDefault()

                    db.collection('channels').doc(channelId).collection('messages')
                    .add({
                              message : input,
                              user : user,
                              timestamp : firebase.firestore.FieldValue.serverTimestamp()
                    })

                    setInput('')
          }

       
          
          return (
                    <div className='chat'>
                              <ChatHeader/>

                              <div className="chat__message">
                                        {/* <Message
                                        avatarSrc = {user.photo}
                                        timestamp
                                        user = {user.displayName}
                                        message = 'The attackers posted a ransom note claiming  they had stolen more than 250 GB of data'
                                        imageUrl = 'https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/1_660_071120102238.jpg'
                                        /> */}

                                        <FlipMove>
                                        {messages.map(message=>(
                                              <Message
                                              avatarSrc = {message.user.photo}
                                              timestamp={message.timestamp}
                                              user={message.user.displayName}
                                              message={message.message}
                                              />    
                                        ))}
                                        </FlipMove>
                              </div>

                              <div className="chat__input">
                                      <div className="chat__inputTop">
                                      <Avatar src='https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'/>
                                        <form>
                                                  <input onChange={e=>setInput(e.target.value)} value={input} disabled={!channelId} type="text" placeholder={`Send message   #${channelName}`}/>
                                                  <button onClick={sendMessage} disabled={!channelId} className='chat__keyboardButton'>Tweet</button>
                                        </form>
                                      </div>

                                      <div className="chat__inputBottom">
                                                <div className="chat__optionButtons">
                                                            <ImageOutlinedIcon style={{ fontSize: 25 }} className='chat__inputIcons'/>   
                                                            <SentimentSatisfiedOutlinedIcon style={{ fontSize: 25 }} className='chat__inputIcons'/>
                                                            <InsertChartOutlinedSharpIcon style={{ fontSize: 25 }} className='chat__inputIcons'/>
                                                            <ExtensionOutlinedIcon style={{ fontSize: 25 }} className='chat__inputIcons'/>
                                                </div>
                                         <Button className='chat__input__tweetButton' onClick={sendMessageTweetBtn}>Tweet</Button>
                                      </div>
                              </div>
                    </div>
          )
}

export default Chat
