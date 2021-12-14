import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
//local
import Context from './Context';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';


export default function FormChannel({

}) {
  const { oauth,
    
  } = useContext(Context)
 
  
  return (
            <div>
                <tr>
                    <td>
                        name :
                    </td>
                    <td>
                        {oauth.name}
                    </td>
                    
                </tr>
                <tr>
                    <td>
                        email :
                    </td>
                    <td>
                        {oauth.email}
                    </td>
                </tr>
                <tr>
                    <td>
                        nationalitie(s) :
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>
                        language spoken :
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>
                        avatar :
                    </td>
                    <td>

                    </td>
                </tr>
            </div>
  )
}