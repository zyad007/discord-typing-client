import { useEffect, useState } from "react"
import InputModal from "./components/InputModal"
import { url } from "inspector"


type User = {
  id: number,
  username: string,
  nickname: string,
  server: string,
  channel: string,
  status: boolean,
  channelLink: string
}

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([])

  const fetchData = () => {
    fetch('http://localhost:3000/current')
      .then(res => res.json())
      .then(result => {
        if (result) {
          setData(result);
          console.log(result);
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <InputModal isOpen={isOpen} setIsOpen={setIsOpen} fetchData={fetchData} />
      <div className='flex justify-center items-center w-screen h-screen'>
        <button onClick={() => { setIsOpen(true) }} className="fixed top-5 right-10 w-20 bg-slate-200 h-10 rounded-md">
          Add
        </button>

        <div className="bg-opacity-20 bg-black w-11/12 rounded-lg mt-10 p-4 overflow-auto">

          <div className="h-10 w-full flex justify-between items-center border-b border-black mb-4 px-3 font-bold">

            <div className="w-[5%]">
              <span>Id</span>
            </div>

            <div className="w-[10%]">
              <span>Username</span>
            </div>

            <div className="w-[10%]">
              <span>Nickname</span>
            </div>

            <div className="w-[10%]">
              <span>Server</span>
            </div>

            <div className="w-[20%]">
              <span>Channel</span>
            </div>

            <div className="w-[5%]">
              <span>Status</span>
            </div>

            <div className="w-[10%]">
              <span>Actions</span>
            </div>

          </div>

          <div className="w-full bg-opacity-30 max-h-[600px] bg-white overflow-y-scroll">
            {
              data.map((x: any) => {
                return <>
                  <Card
                    id={x.id}
                    username={x.target_username}
                    nickname={x.target_nickname}
                    channel={x.target_channel_name}
                    server={x.target_server_name}
                    status={x.active}
                    channelLink={x.target_url}
                    fetchData={fetchData}
                  />
                </>
              })
            }
          </div>

        </div>

      </div>
    </>
  )
}


const Card = ({
  id,
  username,
  nickname,
  channel,
  server,
  status,
  channelLink,
  fetchData
}: {
  id: number,
  username: string,
  nickname: string,
  server: string,
  channel: string,
  status: boolean,
  channelLink: string,
  fetchData: Function
}) => {

  const toggileStatus = (e) => {
    e.preventDefault();

    if (!status) {
      fetch('http://localhost:3000/activate/' + id, { method: 'POST' })
        .then(res => {
          fetchData();
        })
      return;
    } else {
      fetch('http://localhost:3000/deactivate/' + id, { method: 'POST' })
        .then(res => {
          fetchData();
        })
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/rm/' + id, { method: 'DELETE' })
      .then(res => {
        fetchData();
      })
  }

  return (
    <div className="h-10 w-full flex justify-between items-center px-3">
      <div className="w-[5%]">
        <span>{id}</span>
      </div>

      <div className="w-[10%]">
        <span>{username}</span>
      </div>

      <div className="w-[10%]">
        <span>{nickname}</span>
      </div>

      <div className="w-[10%]">
        <span>{server}</span>
      </div>

      <div className="w-[20%]">
        <span>{channel}</span>
      </div>

      <div className="w-[5%]">
        <span onClick={toggileStatus} className="hover:underline cursor-pointer select-none" >{status ? 'Active' : 'Disabled'}</span>
      </div>

      <div className="w-[10%]">
        <span className="hover:underline cursor-pointer text-red-800 select-none mr-3" onClick={handleDelete}>Delete</span>
        <a href={channelLink} target="_blank" rel="noreferrer" className="hover:underline cursor-pointer select-none" >
          Open
        </a>
      </div>
    </div>
  );
}


export default App
