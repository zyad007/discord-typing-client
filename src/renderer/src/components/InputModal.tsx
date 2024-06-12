import React, { useState } from 'react';
import ReactModal from 'react-modal';


const InputModal = ({
    isOpen,
    setIsOpen,
    fetchData
}: {
    isOpen: boolean,
    setIsOpen: Function,
    fetchData: Function
}) => {

    const [message, setMessage] = useState('')

    const [disabled, setDisabled] = useState(false);

    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [url, setUrl] = useState('');
    const [botToken, setBotToken] = useState('');
    const [chatId, setChatId] = useState('');

    const closeModal = () => {
        setIsOpen(false);
        setMessage('')
        setUserName('')
        setNickName('')
        setUrl('')
    }

    const handleSumbition = (e) => {
        e.preventDefault();
        console.log(userName, nickName, url);
        setDisabled(true)
        fetch('http://localhost:3000/add', {
            method: 'POST',
            body: JSON.stringify({
                target_username: userName,
                target_nickname: nickName,
                target_url: url,
                bot_token: botToken,
                chat_id: chatId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(result => {
                console.log(result.message);
                setMessage(result.message);
                setDisabled(false);
                fetchData();
            })
            .catch(e => {
                console.log(e);
                setMessage(e);
                setDisabled(false);
            })

    }


    return (
        <ReactModal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldFocusAfterRender={false}
            closeTimeoutMS={200}
            className={'shadow-xl w-1/2 bg-white shadow-slate-300 py-10 px-14 h-fit left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-center items-center border rounded-md text-black'}
        >
            <form className='flex flex-col justify-center items-center w-full h-full space-y-8' onSubmit={handleSumbition} >

                <div>
                    {message}
                </div>

                <div className='w-full h-full flex-col flex justify-center items-center space-x-4'>
                    <label className='w-full pl-4'>Username</label>
                    <input type="text" className=' w-full border bg-slate-100 px-2 py-1' value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div className='w-full h-full flex-col flex justify-center items-center space-x-4'>
                    <label className='w-full pl-4'>Nickname</label>
                    <input type="text" className=' w-full border bg-slate-100 px-2 py-1' value={nickName} onChange={(e) => setNickName(e.target.value)} />
                </div>

                <div className='w-full h-full flex-col flex justify-center items-center space-x-4'>
                    <label className='w-full pl-4'>Channel URL</label>
                    <input type="text" className=' w-full border bg-slate-100 px-2 py-1' value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>

                <div className='w-full h-full flex-col flex justify-center items-center space-x-4'>
                    <label className='w-full pl-4'>Bot Token</label>
                    <input type="text" className=' w-full border bg-slate-100 px-2 py-1' value={botToken} onChange={(e) => setBotToken(e.target.value)} />
                </div>

                <div className='w-full h-full flex-col flex justify-center items-center space-x-4'>
                    <label className='w-full pl-4'>Chat ID</label>
                    <input type="text" className=' w-full border bg-slate-100 px-2 py-1' value={chatId} onChange={(e) => setChatId(e.target.value)} />
                </div>

                <button className='w-20 border rounded-md border-gray-500 bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500' disabled={disabled} >Add</button>
            </form>
        </ReactModal>
    );
}

export default InputModal;
