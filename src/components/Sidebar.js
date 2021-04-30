import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';

function Sidebar() {

          const user = useSelector(selectUser)

          const [channels, setChannels] = useState([])

          useEffect(()=>{
                 db.collection('channels').onSnapshot(snapshot=>{
                    setChannels(snapshot.docs.map(doc=>({
                              id : doc.id,
                              channel : doc.data()
                    }))) 
                 })  
          },[])

          //addChannel
           const addChannel= ()=>{
                     const channelName = prompt('add a channel name')

                     if(channelName){
                               db.collection('channels').add({
                                         channelName : channelName,
                               })
                     }
           }

          return (
                    <div className='sidebar'>
                              <div className="sidebar__logo">
                                        <img src="https://paper-logo.s3.us-east-2.amazonaws.com/paper.png" alt=""/>
                              </div>
                              <div className="sidebar__channels">
                                        <div className="sidebar__channelsHeader">
                                                  <div className="sidebar__header">
                                                            <p>#</p>
                                                            <span>Channel</span>
                                                  </div>
                                                  <AddIcon onClick={addChannel} className='sidebar__headerIcon'/>
                                        </div>
                                        <div className="sidebar__channelLists">
                                                  
                                                  {/* map the channel */}
                                                  {channels.map(({ id, channel})=>(
                                                            <SidebarChannel key={id}  id={id}   channelName = {channel.channelName} />
                                                  ))}
                                        
                                        {/* <SidebarChannel  id   channel = 'Homework-group' />
                                        <SidebarChannel  id   channel = 'Homework-group' />
                                        <SidebarChannel  id   channel = 'Homework-group' /> */}
          
                              </div>
                              </div>

                              <div className="sidebar__footer">
                                        <div className="sidebar__footerLeft">
                                        <Avatar src={user.photo} className='sidebar__footerAvatar'/>
                                        <p>{user.displayName}</p>
                                        </div>
                                        
                                         <ExitToAppIcon onClick={()=>auth.signOut()} className='sidebar__footerIcon'/>

                              </div>
                   
                    </div>
          )
}

export default Sidebar
