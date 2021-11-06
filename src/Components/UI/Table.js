import React, { useState } from 'react'
import data from '../Data/Data'
import Search from './Search';
import classes from './Table.module.css'
import Sort from '../Data/Sort';
function Table() {
    //state
    const [filterText, setfilterText] = useState('')
    //checkbox
    const [archive, setarchive] = useState(false)
    const [userdata, setuserdata] = useState(data)
    //archive toggle
    const [archiveuserr, setarchiveuserr] = useState()
    // replied  time 
    const Time = (props) => {
        const date = new Date(props.time).getDate();
        const currentdate = new Date('10/04/2018').getDate();
        console.log(date);
        console.log(currentdate);
        const time = (new Date((new Date(props.time).getTime()) + 4 * 60 * 60 * 1000).toLocaleTimeString().toLowerCase())
        let replied = null;
        if (date === currentdate) {
            replied = time
        }
        else if (date + 1 === currentdate) {

            replied = 'yesterday';
        }
        else {
            replied = new Date(props.time).toLocaleDateString();
        }
        return replied;
    }



    // map user data
    const tabledata = userdata.map(user => {
        const canditateToLower = user.candidate.toLowerCase();
        const filterTextToLower = filterText.toLowerCase();
        if (canditateToLower.indexOf(filterTextToLower) >= 0) {
            if (archive ? true : user.archived === false) {

                return (
                    <tbody key={user.candidate}>
                        <tr>
                            <td className={classes.image}>
                                <img alt='userpicture' src={user.image} />
                                <label className={classes.candidate}> {user.candidate} </label>
                            </td>
                            <td>{user.role} </td>
                            {/* status */}
                            {user.last_comms.unread ?
                                <td className={classes.lastcolms}>
                                    <label className={classes.greendot}> </label>
                                    {user.last_comms.description}
                                    <label className={classes.date_time}>
                                        <Time time={user.last_comms.date_time} />
                                    </label>
                                </td>
                                : <td>
                                    {user.last_comms.description}
                                    <label className={classes.date_time}>
                                        <Time time={user.last_comms.date_time} />
                                    </label>
                                </td>
                            }
                            <td>{user.salary} </td>
                            <td>{user.sent_by} </td>
                            <td className={classes.archive} >

                                {<p 
                                    className={classes.archive} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    {user.archived ? 'UnArchive' : 'Archive'}
                                </p>}
                            </td>
                        </tr>
                    </tbody>

                )

            }
        }
        else {
            return null
        }
        return null
    })
    //togglearchive
    const Toggle = (user) => {
        setarchiveuserr(!user)
    }
    // search handler
    const inputChangeHandler = (value) => {
        setfilterText(value)
    }
    // checkbox archive handler
    const archiveHandler = () => {
        setarchive(!archive)
        console.log('clicked');
    }
    //  sort  toggle
    const SortData = () => {
        setuserdata(Sort())
    }
    return (
        <div>
            <Search change={inputChangeHandler} clicked={archiveHandler} />
            <div className={classes.request}>
                <label >6 interview request </label>
            </div>
            <div className={classes.table}>
                <table id='mytable' cellSpacing='20' >
                    <thead>
                        <tr>
                            <th> Candidate  </th>
                            <th>  Role </th>
                            <th style={{ cursor: 'pointer' }}> Last communication
                                <span className={classes.symbol} >
                                    <label style={{ cursor: 'pointer' }} onClick={SortData} > &#9660;</label>
                                    <label style={{ cursor: 'pointer' }} onClick={SortData}>&#9650; </label>
                                </span>
                            </th>
                            <th> Salary  </th>
                            <th> Sent By  </th>
                        </tr>
                    </thead>
                    {tabledata}
                </table>
            </div>
        </div>


    )
}

export default Table
