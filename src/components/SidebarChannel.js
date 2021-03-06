import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../features/appSlice'
import './SidebarChannel.css'

function SidebarChannel({id, channelName}) {

          const dispatch = useDispatch()
          return (
                    <div className='sidebarChannel' onClick={()=> dispatch(setChannelInfo({
                              channelId : id,
                              channelName : channelName,
                    }))}>
                              <p>#</p>
                              <span>{channelName}</span>
                    </div>
          )
}

export default SidebarChannel
